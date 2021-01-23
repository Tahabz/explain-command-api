import express from 'express'
import tokenize, {Type} from '../Lexers/tokenize'
import {npmTokens} from '../Lexers/npm/npmtoken'
import commandTypeService from '../services/commandTypeService'
import commandService from '../services/commandService'
import argumentService from '../services/argumentService'
import { ICommandType, IMinCommandType } from '../models/CommandType'
import Command, { IMinCommandPopulated } from '../models/Command'
import  mongoose  from 'mongoose'
import { IArgument } from '../models/Argument'
import IToken from '../Lexers/tokens'
import { token } from 'morgan'


interface LooseObject {
  [key: string]: any
}
interface output {
  commandType?: string,
  command?: string,
  arguments?: LooseObject
}

const check_errors = (tokens: IToken<Type, string>[]): boolean => {
  return tokens.every((token, i) => {
    if (i === 0) {
      return token.type === 'COMMANDTYPE'
    } else if (i === 1) {
      return token.type === 'COMMAND'
    }
    return token.type === 'ARGUMENT'
  })
}

export const explainCommand = async (req:express.Request, res: express.Response) => {
  const {commandType, commandString} = req.body

  if (commandString && commandType) {

    let outputRes: output = {arguments: {}}
    const outputTokens = tokenize(commandString, npmTokens)
    console.log(outputTokens);
    if (check_errors(outputTokens)) {
      
      for(const token of outputTokens) {
        try {
          if (token.type === 'COMMANDTYPE') {
            const commandtype = await commandTypeService.getOne({name: token.value})
            outputRes.commandType = commandtype.description
          }
          else if (token.type === 'COMMAND') {
            const command = await commandService.getOneAndPopulate({name: token.value}, 'CommandType')
            if (command.CommandType.name !== commandType) {
              throw new Error(command.name + 'does not exist in npm, but rather in '+ command.CommandType.name)
            }
            outputRes.command = command.description
          }
          else {
            const arg = await argumentService.getOne({name: token.value})
            if (!arg) {
              if (outputRes.arguments)
                outputRes.arguments[token.value] = "arg does not exist"
            } else {
              await Command.exists({name: outputTokens[1].value, Arguments: arg._id})
              if (outputRes.arguments)
                outputRes.arguments[token.value] = arg.description
            }
          }
          console.log(outputRes);
        } catch(e) {
          return res.status(200).json({success: true, message: outputRes})
        }
      }

      return res.status(200).json({success: true, message: outputRes})
    } else {
      return res.status(422).json({success: false, message: 'command should be in the following format npm <command> [args]'})
    }

  } else {
    return res.status(422).send({success: false, message: 'command should be in the following format npm <command> [args]'})
  }
}

export default explainCommand