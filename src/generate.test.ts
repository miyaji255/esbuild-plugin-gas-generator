import { generate } from "./generate";
import { expect, test } from "vitest";

test("generate 1", () => {
  const source = `const foo = 1;
function bar() {}
export { foo as baz, bar };
`;
  const result = generate(source);
  expect(result).toBe(`function baz(){}
function bar(){}
(()=>{
const foo = 1;
function bar() {}

globalThis.baz=foo;
globalThis.bar=bar;
})()
`);
});
