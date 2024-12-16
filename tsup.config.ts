import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/AppsScript.d.ts"],
  // splitting: true,
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
});
