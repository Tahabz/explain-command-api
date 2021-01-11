import { Tokens } from "../tokens"

type Type = "NPM" | "ARGUMENT" | "COMMAND"
type Command =  "INSTALL" | "I" | "ADD" | "ACCESS"
type Arg = "GRANT" | "REVOKE"
type Unknown = "UNKNOWN"

export type npmVal = Command | Arg | string
export type npmType = Type | Unknown

export const npmTokens : Tokens<Type | Unknown> = {
  install: "COMMAND",
  i      : "COMMAND",
  add    : "COMMAND",
  access : "COMMAND",
  grant  : "ARGUMENT",
  revoke : "ARGUMENT",
  npm    : "NPM",
  arg    : "ARGUMENT",
  unknown: "UNKNOWN"
}