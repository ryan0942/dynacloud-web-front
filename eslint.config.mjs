import { FlatCompat } from "@eslint/eslintrc";
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { dirname } from "path";
import { fileURLToPath } from "url";
// TODO: 等套件更新 https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/325
// 雖然官方有提供 prettier-plugin-tailwindcss，但為了維持一致都用 eslint 排版，目前先不考慮
import tailwind from "eslint-plugin-tailwindcss";
import unusedImportsPlugin from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...tailwind.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "react-compiler": reactCompiler,
      import: importPlugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      "react-compiler/react-compiler": "error",
      // React rules
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/prop-types": "off", // We use TypeScript instead
      "react/no-unescaped-entities": "off",
      "react/jsx-sort-props": [
        "error",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
      // import rules
      ...importPlugin.configs.recommended.rules,
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "unknown",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-unresolved": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/named": "off",
      // unused-imports rules
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // typescript rules
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
];

export default eslintConfig;
