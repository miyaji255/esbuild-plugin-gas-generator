import { readFile, writeFile } from "fs/promises";
import type { Plugin } from "esbuild";
import { generate } from "./generate";

export interface GasGeneratorPluginOptions {
  targets?: string[];
}

export default function GasGeneratorPlugin(
  options?: GasGeneratorPluginOptions
) {
  return {
    name: "esbuild-plugin-gas-generator",
    setup(build) {
      build.onEnd(async () => {
        if (
          build.initialOptions.outfile === undefined &&
          options?.targets === undefined
        )
          throw new Error("");

        const targets = options?.targets ?? [build.initialOptions.outfile!];

        await Promise.all(
          targets.map(async (t) => {
            const content = await readFile(t, { encoding: "utf-8" });
            await writeFile(t, generate(content), { encoding: "utf-8" });
          })
        );
      });
    },
  } as const satisfies Plugin;
}
