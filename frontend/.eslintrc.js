module.exports = {
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier",
  ],
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
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    semi: ["error", "always"], //alwaysデフォルト
    quotes: ["error", "double"], //doubleデフォルト
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-undef": "error",
    "react/jsx-props-no-spreading": "off",
    "no-var": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};