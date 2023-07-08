module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    semi: ["error", "always"], //alwaysデフォルト
    quotes: ["error", "double"], //doubleデフォルト
    "no-undef": "error",
    "no-var": "error",
  },
};
