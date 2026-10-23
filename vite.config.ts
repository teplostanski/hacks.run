import { defineConfig } from "vite-plus";
import vinext from "vinext";
import readableClassnames from "vite-plugin-readable-classnames";

export default defineConfig({
  plugins: [vinext(), readableClassnames()],
  lint: {
    plugins: ["typescript", "react", "jsx-a11y", "unicorn", "oxc"],
    jsPlugins: ["eslint-plugin-slop"],
    categories: {
      correctness: "error",
    },
    ignorePatterns: ["dist/**", "out/**", ".vinext/**", ".next/**"],
    rules: {
      "react/rules-of-hooks": "error",
      "react/exhaustive-deps": "error",
      "slop/max-comment-length": "error",
      "slop/no-chained-type-assertions": "error",
      "slop/no-em-dash": "error",
      "slop/no-jargon": "error",
      "slop/no-static-only-class": "error",
      "slop/no-trivial-functions": "error",
      "slop/no-trivial-type-aliases": "error",
      "slop/prefer-jsdoc": "error",
    },
    overrides: [
      {
        files: ["components/Home.tsx"],
        rules: {
          "react/purity": "off",
        },
      },
    ],
  },
  fmt: {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "all",
    endOfLine: "lf",
    ignorePatterns: ["dist/**", "out/**", ".vinext/**", ".next/**", "pnpm-lock.yaml"],
  },
});
