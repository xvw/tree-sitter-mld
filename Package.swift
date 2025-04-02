// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterMld",
    products: [
        .library(name: "TreeSitterMld", targets: ["TreeSitterMld"]),
    ],
    dependencies: [
        .package(url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.8.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterMld",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterMldTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterMld",
            ],
            path: "bindings/swift/TreeSitterMldTests"
        )
    ],
    cLanguageStandard: .c11
)
