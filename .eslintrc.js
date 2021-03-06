module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        semi: false,
        singleQuote: false,
        trailingComma: "none",
        arrowParens: "avoid"
      }
    ]
  },
  plugins: ["prettier"]
}
