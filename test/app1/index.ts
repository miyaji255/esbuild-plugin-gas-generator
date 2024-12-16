import * as z from "zod";
export * from "./sub";

const schema = z.object({
  name: z.string(),
  age: z.number(),
  birthday: z.date(),
});

export type User = z.infer<typeof schema>;

export function validateUser(data: unknown): User {
  return schema.parse(data);
}
