/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "mld",

  rules: {
    source_file: ($) => repeat($._item),
    _item: ($) =>
      choice(
        $.header,
        $.table,
        $.tr,
        $.th,
        $.td,
        $.table_light,
        $.text,
        $.code,
        $.link,
        $.html,
        $.bold,
        $.italic,
        $.emphasized,
        $.subscript,
        $.superscript,
        $.ul,
        $.li,
        $.ol,
        $.verbatim,
        $.math_inline,
        $.math_display,
        $.inline_code,
        $.comment,
      ),
    _doc: ($) => repeat1($._item),
    header: ($) => seq("{", choice("0", "1", "2", "3", "4", "5"), /[^}]+/, "}"),
    text: ($) => /[^{}\[]+/,
    table: ($) => seq("{table", $._doc, "}"),
    tr: ($) => seq("{tr", $._doc, "}"),
    th: ($) => seq("{th", $._doc, "}"),
    td: ($) => seq("{td", $._doc, "}"),
    code: ($) =>
      choice(
        seq(
          "{",
          optional(field("language", seq("@", $.language_name))),
          "[",
          $.code_contents,
          "]}",
        ),
        seq("{foo@text[", $._foo_string, "]foo}"),
      ),
    code_contents: ($) => repeat1(choice(/[^\]]/, /][^}]/)),
    // hardcode for "foo" delimiter - see tree-sitter-ocaml for how to implement
    _foo_string: ($) => repeat1(choice(/[^]]+/, /\][^f]/)),
    language_name: ($) => /\w+/,
    link: ($) => choice($.link_target, seq("{", $.link_target, $._doc, "}")),
    link_target: ($) => seq(choice("{!", "{:"), /[^}]+/, "}"),
    html: ($) => seq("{%html:", /[^%]+/, "%}"),
    bold: ($) => seq("{b", $._doc, "}"),
    italic: ($) => seq("{i", $._doc, "}"),
    emphasized: ($) => seq("{e", $._doc, "}"),
    verbatim: ($) => seq("{v", $._doc, "}"),
    subscript: ($) => seq("{_", $._doc, "}"),
    superscript: ($) => seq("{^", $._doc, "}"),
    ul: ($) => seq("{ul", $._doc, "}"),
    ol: ($) => seq("{ol", $._doc, "}"),
    li: ($) => seq(choice("{li", "{-"), $._doc, "}"),
    math_inline: ($) => seq("{m ", $._doc, "}"),
    math_display: ($) => seq("{math ", $._doc, "}"),
    table_light: ($) => seq("{t", $._doc, "}"),
    inline_code: ($) => seq("[", /[^]]+/, "]"),
    // not really an odoc comment but used in the highlight test suite
    comment: ($) => seq("{%%", /[^%]+/, "%}"),
  },
});
