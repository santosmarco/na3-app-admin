module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:typescript-sort-keys/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
    project: ["tsconfig.json"],
  },
  plugins: [
    "@typescript-eslint",
    "sort-keys-fix",
    "typescript-sort-keys",
    "simple-import-sort",
  ],
  rules: {
    "@typescript-eslint/consistent-indexed-object-style": "warn",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/dot-notation": "warn",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/method-signature-style": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/sort-type-union-intersection-members": "warn",
    "@typescript-eslint/switch-exhaustiveness-check": "warn",
    "simple-import-sort/exports": "warn",
    "simple-import-sort/imports": "warn",
  },
  overrides: [
    {
      files: ["src/modules/na3-types/**/*"],
      rules: {
        "@typescript-eslint/consistent-type-definitions": "off",
      },
    },
  ],
};
