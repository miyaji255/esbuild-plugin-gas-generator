// @ts-check
import { writeFile } from "fs/promises";
import { compile } from "json-schema-to-typescript";

const now = new Date().toISOString();
const res = await fetch(
  "https://raw.githubusercontent.com/SchemaStore/schemastore/refs/heads/master/src/schemas/json/appsscript.json"
);
const schema = await res.json();

const dts = await compile(schema, "AppsScript");
const header = `// Type definitions for Google Apps Script ${now}
// Generated from: https://raw.githubusercontent.com/SchemaStore/schemastore/refs/heads/master/src/schemas/json/appsscript.json

`;

await writeFile("src/AppsScript.d.ts", header + dts);
