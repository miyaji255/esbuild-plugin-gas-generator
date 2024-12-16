import { readFile, writeFile } from "fs/promises";
import { type BuildContext, type Metafile, type Plugin } from "esbuild";
import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import { rmSync } from "node:fs";
import path from "node:path";

/**
 * Options for the GasGeneratorPlugin.
 */
export interface GasGeneratorPluginOptions {
  /**
   * This plugin performs the build process twice. If other plugins also perform the build process twice, the build will not complete, so please exclude them.
   */
  excludePlugins?: string[];
}

/**
 * Generate Google Apps Script code from ESBuild output.
 */
export default function GasGeneratorPlugin(
  options?: GasGeneratorPluginOptions
) {
  return {
    name: "esbuild-plugin-gas-generator",
    async setup(build) {
      const initialOptions = build.initialOptions;
      if (initialOptions.format !== "iife")
        throw new Error("The format option must be iife");

      if (initialOptions.sourcemap)
        console.warn(
          `Google Apps Script does not support source maps, and esbuild-plugin-gas-generator may breaks the sourcemap`
        );

      initialOptions.metafile = true;

      const globalName = (initialOptions.globalName ??= "_exports");
      if (globalName === "globalThis")
        throw new Error("The globalName option cannot be globalThis");

      const footer = "Object.assign(globalThis,_exports);";
      if (initialOptions.footer)
        initialOptions.footer.js = footer + (initialOptions.footer.js ?? "");
      else initialOptions.footer = { js: footer };

      const tempDir = await mkdtemp(
        path.resolve(os.tmpdir(), "esbuild-plugin-gas-generator-")
      );
      let metadataContext: BuildContext<{ metafile: true }> | undefined =
        undefined;
      let metadata: Promise<
        | { type: "success"; value: Metafile["outputs"] }
        | { type: "error"; value: unknown }
      > = Promise.resolve({ type: "error", value: new Error() });

      build.onStart(async () => {
        metadataContext ??= await build.esbuild.context({
          ...initialOptions,
          globalName: undefined,
          metafile: true,
          format: "esm",
          bundle: false,
          minify: false,
          sourcemap: false,
          outdir: tempDir,
          outfile: undefined,
          plugins: initialOptions.plugins?.filter(
            (p) =>
              p.name !== "esbuild-plugin-gas-generator" &&
              !options?.excludePlugins?.includes(p.name)
          ),
        });

        metadata = metadataContext
          .rebuild()
          .then(
            (m) => ({ type: "success", value: m.metafile.outputs }) as const
          )
          .catch((e: unknown) => ({ type: "error", value: e }) as const);
      });

      build.onEnd(async (result) => {
        const { type, value } = await metadata;
        if (type === "error") {
          console.error(
            "[esbuild-plugin-gas-generator] Failed to generate metadata, so this plugin will not work"
          );
          return;
        }
        if (!result.metafile)
          throw new Error("The metafile option is required");

        const outputs = Object.values(value);

        await Promise.all(
          Object.entries(result.metafile!.outputs).map(
            async ([outfile, meta]) => {
              const code = await readFile(outfile, { encoding: "utf-8" });

              const exports = outputs.find(
                (o) => o.entryPoint === meta.entryPoint
              )?.exports;
              if (!exports) return;

              const entries = exports
                .map(
                  (n) => `function ${n}(){throw new Error("Not implemented")}`
                )
                .join();
              await writeFile(outfile, `${entries}\n${code}`);
            }
          )
        );
      });

      build.onDispose(() => {
        metadataContext?.dispose();
        rmSync(tempDir, { recursive: true, force: true });
      });
    },
  } as const satisfies Plugin;
}
