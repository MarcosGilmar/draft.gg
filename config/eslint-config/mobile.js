import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export const mobileConfig = tseslint.config(
  {
    ignores: [
      "eslint.config.js",
      "metro.config.js",
      "babel.config.js",
      ".expo/**",
      ".turbo/**",
      "dist/**",
      "coverage/**",
      "android/**",
      "ios/**",
    ],
  },

  eslint.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ["**/*.ts", "**/*.tsx"],

    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    languageOptions: {
      globals: {
        __DEV__: "readonly",
      },

      parserOptions: {
        projectService: true,

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      "@typescript-eslint/no-explicit-any": "warn",

      "react/react-in-jsx-scope": "off",
    },
  },

  eslintConfigPrettier,
);
