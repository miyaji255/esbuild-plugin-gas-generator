import path from "path";
import { describe, expect, test } from "vitest";
import GasGeneratorPlugin from ".";
import { readFile } from "fs/promises";
import { ZodError } from "zod";

describe("app1", () => {
  test.each([
    "esbuild-17",
    "esbuild-18",
    "esbuild-19",
    "esbuild-20",
    "esbuild-21",
    "esbuild-22",
    "esbuild-23",
  ] as const)(`%s`, async (packageName) => {
    const esbuild = await import(packageName);
    const outfile = path.resolve(
      __dirname,
      `../test/app1/dist/${packageName}/index.js`,
    );

    await esbuild.build({
      entryPoints: [path.resolve(__dirname, "../test/app1/index.ts")],
      bundle: true,
      outfile,
      format: "esm",
      plugins: [GasGeneratorPlugin()],
    });

    const output = await readFile(outfile, { encoding: "utf-8" });
    expect(output).toMatchSnapshot();
    expect(output).toMatch(/^function validateUser\(\){}\n\(\(\)=>{\n/);
    eval(output);
    const validateUser = (globalThis as any).validateUser;

    const date = new Date("1990-01-01");
    expect(
      validateUser({
        id: 1,
        name: "John Doe",
        age: 30,
        birthday: date,
      }),
    ).toStrictEqual({
      name: "John Doe",
      age: 30,
      birthday: date,
    });

    expect(() =>
      validateUser({
        name: "John Doe",
        age: 30,
      }),
    ).toThrowError(
      new ZodError([
        {
          code: "invalid_type",
          expected: "date",
          received: "undefined",
          path: ["birthday"],
          message: "Required",
        },
      ]),
    );
  });
});
