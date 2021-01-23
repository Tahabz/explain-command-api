import fs from "fs"
import { Tokens } from "../tokens"

type Type = "COMMANDTYPE" | "ARGUMENT" | "COMMAND"
type Command =  "INSTALL" | "I" | "ADD" | "ACCESS"

export type npmVal = Command | string
export type npmType = Type

export const npmTypes: {readonly [key: string]: Type} = {
  npm: "COMMANDTYPE",
  arg: "ARGUMENT",
  command: "COMMAND"
}


const tokens = fs.readFileSync("./tokens.json").toString()

export const npmTokens : Tokens<Type> = JSON.parse(tokens)

