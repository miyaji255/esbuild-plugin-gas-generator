import { readFile, writeFile } from "fs/promises";
import type { BuildContext, Metafile, Plugin } from "esbuild";
import { mkdtemp } from "node:fs/promises";
import os from "node:os";
import { rmSync } from "node:fs";
import path from "node:path";
import type { JSONSchemaForGoogleAppsScriptManifestFiles } from "./AppsScript";
import { simpleHash } from "./simpleHash";

/**
 * Options for the GasGeneratorPlugin.
 */
export interface GasGeneratorPluginOptions {
  /**
   * This plugin performs the build process twice. If other plugins also perform the build process twice, the build will not complete, so please exclude them.
   */
  excludePlugins?: string[];

  /**
   * The path to the `appsscript.json` file or an object with the options directly.
   */
  appsscript: string | JSONSchemaForGoogleAppsScriptManifestFiles;
}

/**
 * Generate Google Apps Script code from ESBuild output.
 */
export default function GasGeneratorPlugin(options: GasGeneratorPluginOptions) {
  const normalizedOptions = {
    excludePlugins: options.excludePlugins ?? [],
    appsscript: options.appsscript,
  };
  return {
    name: "esbuild-plugin-gas-generator",
    async setup(build) {
      const initialOptions = build.initialOptions;
      if (initialOptions.format !== "iife") throw new Error("The format option must be iife");

      if (initialOptions.sourcemap)
        console.warn(
          `Google Apps Script does not support source maps, and esbuild-plugin-gas-generator may breaks the sourcemap`
        );

      initialOptions.metafile = true;

      const globalName = (initialOptions.globalName ??= "_exports");
      if (globalName === "globalThis") throw new Error("The globalName option cannot be globalThis");

      const footer = "Object.assign(globalThis,_exports);";
      if (initialOptions.footer) initialOptions.footer.js = footer + (initialOptions.footer.js ?? "");
      else initialOptions.footer = { js: footer };

      const tempDir = await mkdtemp(path.resolve(os.tmpdir(), "esbuild-plugin-gas-generator-"));
      let metadataContext: BuildContext<{ metafile: true }> | undefined = undefined;
      let metadata: Promise<{ type: "success"; value: Metafile["outputs"] } | { type: "error"; value: unknown }> =
        Promise.resolve({ type: "error", value: new Error() });

      build.onStart(async () => {
        metadataContext ??= await build.esbuild.context({
          ...initialOptions,
          globalName: undefined,
          metafile: true,
          format: "esm",
          logLevel: "silent",
          bundle: true,
          minify: false,
          sourcemap: false,
          outdir: tempDir,
          outfile: undefined,
          plugins: initialOptions.plugins?.filter(
            (p) => p.name !== "esbuild-plugin-gas-generator" && !normalizedOptions.excludePlugins.includes(p.name)
          ),
        });

        metadata = metadataContext
          .rebuild()
          .then((m) => ({ type: "success", value: m.metafile.outputs }) as const)
          .catch((e: unknown) => ({ type: "error", value: e }) as const);
      });

      const distdir = initialOptions.outdir ?? path.dirname(initialOptions.outfile!);
      let lastHash: number | undefined = undefined;

      build.onEnd(async (result) => {
        const [{ type, value }] = await Promise.all([
          metadata,
          (async () => {
            const content =
              typeof normalizedOptions.appsscript === "string"
                ? await readFile(normalizedOptions.appsscript, { encoding: "utf-8" })
                : JSON.stringify(normalizedOptions.appsscript);
            const hash = simpleHash(content);
            if (lastHash === hash) return;
            lastHash = hash;
            await writeFile(path.resolve(distdir, "appsscript.json"), content);
          })(),
        ]);
        if (type === "error") {
          console.error("[esbuild-plugin-gas-generator] Failed to generate metadata, so this plugin will not work");
          return;
        }
        if (!result.metafile) {
          console.error("[esbuild-plugin-gas-generator] The metafile option is required");
          return;
        }

        const outputs = Object.values(value);

        await Promise.all(
          Object.entries(result.metafile!.outputs).map(async ([outfile, meta]) => {
            const exports = outputs
              .find((o) => o.entryPoint === meta.entryPoint)
              ?.exports.filter((n) => n !== "default");
            if (!exports || exports.length === 0) return;

            const entries = exports.map((n) => `function ${n}(){throw new Error("Not implemented")}`).join("");
            const code = await readFile(outfile, { encoding: "utf-8" });
            await writeFile(outfile, `${entries}\n${code}`);
          })
        );
      });

      build.onDispose(() => {
        metadataContext?.dispose();
        rmSync(tempDir, { recursive: true, force: true });
      });
    },
  } as const satisfies Plugin;
}
