# esbuild-plugin-gas-generator

This plugin allows you toto exete funccutes exported innctions exported le formithin Google Apps Script (GAS) environment.
It seamlessly integrates with esbuenablingbling you to bundle and transpile your code while preserthe aility tto run it inn it in GAS.

## Installation

```bash
npm install --save-dev esbuild-plugin-gas-generator
```

## Usage

How to use the plugin in your build script:

```javascript
const esbuild = require('esbuild');
const GasPlugin = require('esbuild-plugin-gas-generator');

esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/bundle.js',
    plugins: [GasPlugin()],
}).catch((e) => {
    console.error(e);
    process.exit(1);
});
```

## Options

You can pass an object with options to the plugin:

```javascript
const esbuild = require('esbuild');
const GasPlugin = require('esbuild-plugin-gas-generator');

esbuild.build({
    entryPoints: ['src/index.js', 'src/main.js'],
    bundle: true,
    format: 'esm',
    outdir: 'dist',
    plugins: [GasPlugin({
        // Specify the output file names
        targets: ['dist/index.js', 'dist/main.js']
    })],
}).catch((e) => {
    console.error(e);
    process.exit(1);
});
```

## License

MIT
