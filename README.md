# esbuild-plugin-gas-generator

[![npm version](https://badge.fury.io/js/esbuild-plugin-gas-generator.svg)](https://badge.fury.io/js/esbuild-plugin-gas-generator)

This plugin allows you to execute functions exported within Google Apps Script (GAS) environment.

## Installation

```bash
npm install --save-dev esbuild-plugin-gas-generator
```

## Usage

How to use the plugin in your build script:

**build.js**

```javascript
const esbuild = require("esbuild");
const GasPlugin = require("esbuild-plugin-gas-generator");

esbuild
  .build({
    entryPoints: ["src/index.js"],
    // Must be set to true
    bundle: true,
    // Must be set to 'iife'
    format: "iife",

    // Automatically set true
    metafile: true,

    // Must be followed
    outfile: "dist/bundle.js",
    plugins: [GasPlugin({
      appsscript: "appsscript.json",
      // Or you can specify the options directly
      appsscript: {
        timeZone: "Asia/Tokyo",
        dependencies: {},
        exceptionLogging: "STACKDRIVER",
        runtimeVersion: "V8"
      }
    })],
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
```

**src/index.js**

```javascript
export function hello() {
  console.log("Hello, World!");
}
```

## Options

You can pass an object with options to the plugin:

- `appsscript` (string | object): The path to the `appsscript.json` file or an object with the options directly.
- `excludePlugins` (string[]): This plugin performs the build process twice. If other plugins also perform the build process twice, the build will not complete, so please exclude them.

```javascript
const esbuild = require("esbuild");
const GasPlugin = require("esbuild-plugin-gas-generator");

esbuild
  .build({
    entryPoints: ["src/index.js", "src/main.js"],
    bundle: true,
    format: "esm",
    outdir: "dist",
    plugins: [
      GasPlugin({
        excludePlugins: ["esbuild-plugin-examples"]
        appsscript: "appsscript.json",
      }),
    ],
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
```

## License

MIT
