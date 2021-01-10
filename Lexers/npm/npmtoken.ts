import { Tokens } from "../tokens"

type Type = "NPM" | "ARGUMENT" | "COMMAND"
type Command =  "INSTALL" | "I" | "ADD" | "ACCESS"
type Arg = "GRANT" | "REVOKE"
type Unknown = "UNKNOWN"

export type npmVal = Command | Arg | string
export type npmType = Type | Unknown

export const tokens : Tokens<Type | Unknown> = {
  install: "COMMAND",
  i      : "COMMAND",
  add    : "COMMAND",
  access : "COMMAND",
  grant  : "ARGUMENT",
  revoke : "ARGUMENT",
  npm    : "NPM",
  arg    : "ARGUMENT",
  command: "COMMAND",
  unknown: "UNKNOWN"
}