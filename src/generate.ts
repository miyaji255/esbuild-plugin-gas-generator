import { parseModule } from "meriyah";

export function generate(source: string): string {
  const parsed = parseModule(source, {
    ranges: true,
  })

  const remove: [number, number][] = []
  let prefixDeclarations = "";
  let suffixDeclarations = "";

  for (const statement of parsed.body) {
    if (statement.type === "ExportNamedDeclaration") {
      const declaration = statement.declaration;
      if (declaration === null) {
        remove.push(statement.range!)
        for (const { local, exported } of statement.specifiers) {
          prefixDeclarations = `${prefixDeclarations}function ${exported.name}(){}\n`
          suffixDeclarations = `${suffixDeclarations}globalThis.${exported.name}=${local.name};\n`
        }
      }
    }
  }

  let result = "";
  let lastEnd = -1;
  for (const [start, end] of remove) {
    result += source.slice(lastEnd + 1, start)
    lastEnd = end;
  }
  result = `${prefixDeclarations}(()=>{\n${result}${source.slice(lastEnd + 1)}\n${suffixDeclarations}})()\n`

  return result
}
