package tree_sitter_mld_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_mld "github.com/emillon/tree-sitter-mld/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_mld.Language())
	if language == nil {
		t.Errorf("Error loading Mld grammar")
	}
}
