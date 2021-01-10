export type Type = "NPM" | "ARGUMENT" | "COMMAND"

export type Command =  "INSTALL" | "I" | "ADD" | "ACCESS"

export type Arg = "GRANT" | "REVOKE"

export type Unknown = "UNKNOWN"

export type Tokens = {[key: string]: Type | Unknown}

export const tokens : Tokens = {
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

export default interface Token {
    readonly type: Type | Unknown,
    readonly value: Command | Arg | string
}

