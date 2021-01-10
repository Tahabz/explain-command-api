type Type = "NPM" | "ARGUMENT" | "COMMAND"

type Command =  "INSTALL" | "I" | "ADD" | "ACCESS"

type Arg = "GRANT" | "REVOKE"

export enum tokens {
  install = "INSTALL",
  i       = "INSTALL",
  add     = "INSTALL",
  access  = "ACCESS",
  grant   = "GRANT",
  revoke  = "REVOKE",
  npm     = "NPM",
  arg     = "ARGUMENT",
  command = "COMMAND"
}

export default interface Token {
    readonly type: Type,
    readonly value: Command | Arg
}

