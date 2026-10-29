import js from "@eslint/js";
import astro from "eslint-plugin-astro";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist/", ".astro/", "node_modules/", "migration/"]),
  js.configs.recommended,
  tseslint.configs.strict,
  astro.configs.recommended,
  { languageOptions: { globals: globals.node } },
  {
    files: ["src/**/*.ts"],
    rules: {
      "@typescript-eslint/no-magic-numbers": [
        "error",
        {
          ignore: [0, 1, -1, 2],
          ignoreEnums: true,
          ignoreReadonlyClassProperties: true,
        },
      ],
    },
  },
]);
