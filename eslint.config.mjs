import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintPluginPrettier from "eslint-plugin-prettier";

// eslint-config-next 16 ships native flat configs, so these are imported
// directly. The previous FlatCompat("next/core-web-vitals", ...) bridge threw
// "Converting circular structure to JSON" on every run — lint was silently
// broken, which is also why `next lint` (removed in Next 16) went unnoticed.
const eslintConfig = [
  {
    name: "ignores",
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    name: "prettier",
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["warn", { endOfLine: "auto" }],
    },
  },
];

export default eslintConfig;
