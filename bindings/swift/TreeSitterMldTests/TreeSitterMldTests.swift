import XCTest
import SwiftTreeSitter
import TreeSitterMld

final class TreeSitterMldTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_mld())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Mld grammar")
    }
}
