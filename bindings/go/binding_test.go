package tree_sitter_textile_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-textile"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_textile.Language())
	if language == nil {
		t.Errorf("Error loading Textile grammar")
	}
}
