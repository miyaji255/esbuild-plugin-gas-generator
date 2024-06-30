# esbuild-plugin-gas-generator

This plugin allows you to execute functions exported within Google Apps Script (GAS) environment.

## Installation

```bash
npm install --save-dev esbuild-plugin-gas-generator
```

## Usage

How to use the plugin in your build script:

**build.js**
```javascript
const esbuild = require('esbuild');
const GasPlugin = require('esbuild-plugin-gas-generator');

esbuild.build({
    entryPoints: ['src/index.js'],
    // Must be set to true
    bundle: true,
    // Must be set to 'esm'
    format: 'esm',
    
    // Must be followed
    outfile: 'dist/bundle.js',
    plugins: [GasPlugin()],
    // Or 
    plugins: [GasPlugin({
        // Specify the output file names
        targets: ['dist/bundle.js']
    })],
}).catch((e) => {
    console.error(e);
    process.exit(1);
});
```

**src/index.js**
```javascript
export function hello() {
    console.log('Hello, World!');
}
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
