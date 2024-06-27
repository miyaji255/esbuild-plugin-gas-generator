import { parseModule } from 'meriyah'

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
      } else {
        switch (declaration.type) {
          case 'FunctionDeclaration':
            prefixDeclarations = `${prefixDeclarations}function ${declaration.id!.name}(){}\n`
            suffixDeclarations = `${suffixDeclarations}globalThis.${declaration.id!.name}=${declaration.id!.name};\n`
            console.log(source.slice(declaration.start, declaration.id!.start! - 1))
            remove.push([declaration.start!, declaration.id!.start! - 1])
            break;
          case 'VariableDeclaration':
          // for (const d of declaration.declarations) {
          //   if(d.type)
          //   prefixDeclarations = `${prefixDeclarations}function ${d.id!.name}(){}\n`
          //   suffixDeclarations = `${suffixDeclarations}globalThis.${d.id!.name}=${declaration.id!.name};\n`
          //   remove.push([declaration.start!, d.id!.start! - 1])
          // }
          // break;
          case 'ClassDeclaration':
          case 'ClassExpression':
            break;
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
  result = `${prefixDeclarations}(()=>{${result}${source.slice(lastEnd + 1)}\n${suffixDeclarations}})()`


  // console.log(JSON.stringify(parsed, undefined, 2))
  console.log(result)

  return ""
}

generate(`// src/example-module.ts
function hello() {
  return "Hello Apps Scripts!";
}

// src/index.ts
console.log(hello());
global.hello = hello;
export {
  hello as hee, hello as sss, hello
};

export default {};

export function abc() {}

export const abcc  =1;

export function sdkfjlsadfa() {}

export {};
`)
