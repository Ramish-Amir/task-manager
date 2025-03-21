const js = require("@eslint/js");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts"], // Lint only TypeScript files
    ignores: ["jest.config.js"], // Ignore jest.config.js
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module", // Still needed for TypeScript ES module syntax
      },
      globals: {
        node: true,
        jest: true,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescriptEslint.configs.recommended.rules,
      indent: ["error", 2],
      quotes: ["error", "single"],
      semi: ["error", "always"],
    },
  },
];
