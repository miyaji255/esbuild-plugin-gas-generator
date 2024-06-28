import isNumber from "is-number"

export function hello(name: string, id: number): string {
  if (!isNumber(id)) {
    throw new Error("id must be a number")
  }
  return `Hello, ${id} ${name}!`
} 
