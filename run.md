```
yarn remove eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-config-airbnb eslint-config-airbnb-typescript
```
```
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier eslint-config-airbnb eslint-config-airbnb-typescript
```
```
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  "eslint-config-airbnb",
  "eslint-config-airbnb-typescript",
  "airbnb/hooks",
  "eslint-config-prettier",
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["babel.config.js", "node_modules", "dist", "build"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: ["./tsconfig.json"], // ✅ Only use `nui-components` tsconfig.json
        tsconfigRootDir: process.cwd(),
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "react/jsx-props-no-spreading": "off",
      "import/prefer-default-export": "off",
      "max-len": ["error", { code: 150, ignoreComments: true }],
      "no-restricted-syntax": [
        "error",
        { selector: "ForInStatement", message: "Avoid using for-in loops." },
        { selector: "LabeledStatement", message: "Labeled statements are not allowed." },
        { selector: "WithStatement", message: "With statements are not allowed." },
      ],
      "operator-linebreak": ["error", "after", {
        overrides: { "?": "ignore", ":": "ignore" }
      }],
      "object-curly-newline": "off",
      "implicit-arrow-linebreak": "off",
      "react/function-component-definition": "off",
      "function-paren-newline": "off",
      "jsx-a11y/anchor-is-valid": "off",
    },
  }
];
```
