const PUNCTUATION_CHARACTERS_REGEX = "";
// const PUNCTUATION_CHARACTERS_REGEX = "!-/:-@\\[-`\\{-~";

module.exports = grammar({
  name: "textile",

  rules: {
    // todo: add the actual grammar rules
    // document: ($) => seq($.heading, $.text),

    //////////////////////////
    // h1.
    //////////////////////////
    section: ($) =>
      choice(
        $._section1,
        $._section2,
        $._section3,
        $._section4,
        $._section5,
        $._section6,
      ),

    _section1: ($) =>
      prec.right(
        seq(
          alias($._atx_heading1, $.atx_heading),
          repeat(
            choice(
              alias(
                choice(
                  $._section6,
                  $._section5,
                  $._section4,
                  $._section3,
                  $._section2,
                ),
                $.section,
              ),
              $.subsection,
              $._block_not_section,
            ),
          ),
        ),
      ),
    _section2: ($) =>
      prec.right(
        seq(
          alias($._atx_heading2, $.atx_heading),
          repeat(
            choice(
              alias(
                choice($._section6, $._section5, $._section4, $._section3),
                $.section,
              ),
              $.subsection,
              $._block_not_section,
            ),
          ),
        ),
      ),
    _section3: ($) =>
      prec.right(
        seq(
          alias($._atx_heading3, $.atx_heading),
          repeat(
            choice(
              alias(choice($._section6, $._section5, $._section4), $.section),
              $._block_not_section,
            ),
          ),
        ),
      ),
    _section4: ($) =>
      prec.right(
        seq(
          alias($._atx_heading4, $.atx_heading),
          repeat(
            choice(
              alias(choice($._section6, $._section5), $.section),
              $._block_not_section,
            ),
          ),
        ),
      ),
    _section5: ($) =>
      prec.right(
        seq(
          alias($._atx_heading5, $.atx_heading),
          repeat(choice(alias($._section6, $.section), $._block_not_section)),
        ),
      ),
    _section6: ($) =>
      prec.right(
        seq(
          alias($._atx_heading6, $.atx_heading),
          repeat($._block_not_section),
        ),
      ),

    _atx_heading1: ($) =>
      prec(
        1,
        seq($.atx_h1_marker, optional($._atx_heading_content), $._newline),
      ),
    _atx_heading2: ($) =>
      prec(
        1,
        seq($.atx_h2_marker, optional($._atx_heading_content), $._newline),
      ),
    _atx_heading3: ($) =>
      prec(
        1,
        seq($.atx_h3_marker, optional($._atx_heading_content), $._newline),
      ),
    _atx_heading4: ($) =>
      prec(
        1,
        seq($.atx_h4_marker, optional($._atx_heading_content), $._newline),
      ),
    _atx_heading5: ($) =>
      prec(
        1,
        seq($.atx_h5_marker, optional($._atx_heading_content), $._newline),
      ),
    _atx_heading6: ($) =>
      prec(
        1,
        seq($.atx_h6_marker, optional($._atx_heading_content), $._newline),
      ),

    atx_h1_marker: ($) => "h1. ",
    atx_h2_marker: ($) => "h2. ",
    atx_h3_marker: ($) => "h3. ",
    atx_h4_marker: ($) => "h4. ",
    atx_h5_marker: ($) => "h5. ",
    atx_h6_marker: ($) => "h6. ",

    _atx_heading_content: ($) =>
      prec(
        1,
        seq(
          optional($._whitespace),
          field("heading_content", alias($._line, $.inline)),
        ),
      ),

    //////////////////////////
    // p).
    //////////////////////////
    subsection: ($) =>
      prec.right(
        seq(
          alias("p(. ", $.atx_subheading),
          alias($._line, $.inline),
          $._newline,
          repeat($._block_not_section),
        ),
      ),

    //////////////////////////
    // contents
    //////////////////////////
    _block_not_section: ($) => choice($.paragraph, $.list, $.code_block),

    code_block: ($) => seq("<pre>", /.+/, "</pre>", choice($._newline)),

    paragraph: ($) =>
      seq(alias(repeat1(choice($._line)), $.inline), choice($._newline)),

    list: ($) =>
      choice($._list1, $._list2, $._list3, $._list4, $._list5, $._list6),

    _list1: ($) =>
      prec.right(
        seq(
          alias("* ", $.list_marker),
          repeat(
            choice(
              alias(
                choice($._list6, $._list5, $._list4, $._list3, $._list2),
                $.list,
              ),
              $.paragraph,
            ),
          ),
        ),
      ),
    _list2: ($) =>
      prec.right(
        seq(
          alias("** ", $.list_marker),
          repeat(
            choice(
              alias(choice($._list6, $._list5, $._list4, $._list3), $.list),
              $.paragraph,
            ),
          ),
        ),
      ),
    _list3: ($) =>
      prec.right(
        seq(
          alias("*** ", $.list_marker),
          repeat(
            choice(
              alias(choice($._list6, $._list5, $._list4), $.list),
              $.paragraph,
            ),
          ),
        ),
      ),
    _list4: ($) =>
      prec.right(
        seq(
          alias("**** ", $.list_marker),
          repeat(
            choice(alias(choice($._list6, $._list5), $.list), $.paragraph),
          ),
        ),
      ),
    _list5: ($) =>
      prec.right(
        seq(
          alias("***** ", $.list_marker),
          repeat(choice(alias(choice($._list6), $.list), $.paragraph)),
        ),
      ),
    _list6: ($) =>
      prec.right(
        seq(alias("****** ", $.list_marker), repeat(choice($.paragraph))),
      ),

    _line: ($) => prec.right(repeat1(choice($._word, $._whitespace))),

    _word: ($) =>
      choice(new RegExp("[^" + PUNCTUATION_CHARACTERS_REGEX + " \\t\\n\\r]+")),
    // The external scanner emits some characters that should just be ignored.
    _whitespace: ($) => /[ \t]+/,

    _newline: ($) => /[\n\r]+/,
  },
});
