;From nvim-treesitter/nvim-treesitter
; (atx_heading (inline) @markup.heading)

[
  (atx_h1_marker)
  (atx_h2_marker)
  (atx_h3_marker)
  (atx_h4_marker)
  (atx_h5_marker)
  (atx_h6_marker)
] @punctuation.special

[
  (code_block)
] @text.literal

[
  (list_marker)
] @punctuation.special

(atx_heading
  (atx_h1_marker) @markup.heading.1
  (inline) @markup.heading.1)

(atx_heading
  (atx_h2_marker) @markup.heading.2
  (inline) @markup.heading.2)

(atx_heading
  (atx_h3_marker) @markup.heading.3
  (inline) @markup.heading.3)

(atx_heading
  (atx_h4_marker) @markup.heading.4
  (inline) @markup.heading.4)

(atx_heading
  (atx_h5_marker) @markup.heading.5
  (inline) @markup.heading.5)

(atx_heading
  (atx_h6_marker) @markup.heading.6
  (inline) @markup.heading.6)
