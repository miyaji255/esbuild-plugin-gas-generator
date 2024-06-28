import { build } from "esbuild";
import GasGeneratorPlugin from "esbuild-plugin-gas-generator";

build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  outfile: "dist/index.js",
  format: "esm",
  plugins: [GasGeneratorPlugin()]
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
