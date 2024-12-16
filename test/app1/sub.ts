import { User } from ".";

export function hello(user: User): string {
  return `Hello, ${user.name}!`;
}
