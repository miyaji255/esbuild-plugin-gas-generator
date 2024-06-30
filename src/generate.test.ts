import { generate } from "./generate";
import { expect, test } from "vitest";

test("generate 1", () => {
  const source = `const foo = 1;
function bar() {}
export { foo as baz, bar };
`;
  const result = generate(source);
  expect(result).toMatchSnapshot();
});
