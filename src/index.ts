import { readFile, writeFile } from "fs/promises";
import type { Plugin } from "esbuild";
import { generate } from "./generate";

/**
 * Options for the GasGeneratorPlugin.
 */
export interface GasGeneratorPluginOptions {
  /**
   * The target files to generate Google Apps Script code.
   */
  targets?: string[];
}

/**
 * Generate Google Apps Script code from ESBuild output.
 */
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
          }),
        );
      });
    },
  } as const satisfies Plugin;
}
