import path from "path";
import { describe, expect, test } from "vitest";
import GasGeneratorPlugin from ".";
import { readFile } from "fs/promises";

describe("app1", () => {
  test.each([
    "esbuild-17",
    "esbuild-18",
    "esbuild-19",
    "esbuild-20",
    "esbuild-21",
    "esbuild-22",
    "esbuild-23",
  ])(`%s`, async (packageName) => {
    const esbuild = await import(packageName);
    const outfile = path.resolve(__dirname, `../test/app1/dist/${packageName}/index.js`)

    await esbuild.build({
      entryPoints: [path.resolve(__dirname, "../test/app1/index.ts")],
      bundle: true,
      outfile,
      plugins: [
        GasGeneratorPlugin(),
      ]
    })

    const output = await readFile(outfile, { encoding: "utf-8" });
    expect(output).toMatchSnapshot();
  });
})