import { Tokens } from "../tokens"

type Type = "NPM" | "ARGUMENT" | "COMMAND"
type Command =  "INSTALL" | "I" | "ADD" | "ACCESS"

export type npmVal = Command | string
export type npmType = Type

export const npmTypes: {readonly [key: string]: Type} = {
  npm: "NPM",
  arg: "ARGUMENT",
  command: "COMMAND"
}
export const npmTokens : Tokens<Type> = {
  install: "COMMAND",
  i      : "COMMAND",
  add    : "COMMAND",
  access : "COMMAND",
  npm    : "NPM",
  arg    : "ARGUMENT",
}