import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "public/**",
    "docs/design/**",
    "test-results/**",
    "playwright-report/**",
    "coverage/**",
    "next-env.d.ts"
  ])
];

export default eslintConfig;
