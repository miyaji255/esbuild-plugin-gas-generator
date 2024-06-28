import { build } from "esbuild";
import GasGeneratorPlugin from ".";

await build({
  entryPoints: ["test/node/src/index.ts"],
  outfile: "test/node/dist/index.js",
  bundle: true,
  format: "esm",
  plugins: [GasGeneratorPlugin()],
});
