import express from 'express'
import tokenize, {Type} from '../Lexers/tokenize'
import {npmTokens} from '../Lexers/npm/npmtoken'
import commandTypeService from '../services/commandTypeService'
import commandService from '../services/commandService'
import argumentService from '../services/argumentService'
import Command from '../models/Command'
import IToken from '../Lexers/tokens'



interface LooseObject {
  [key: string]: any
}
interface output {
  commandType?: string,
  command?: string,
  arguments?: LooseObject
}

const check_errors = (tokens: IToken<Type, string>[]): [boolean, string] => {
  let arr: [boolean, string] = [true, '']
  tokens.every((token, i) => {
    console.log(token);
    if (i === 0) {
      if (token.type !== 'COMMANDTYPE') {
        arr = [false, 'Command type incorrect']
        return false
      }
    } else if (i === 1) {
      if (token.type !== 'COMMAND') {
        console.log("heyy");
         arr = [false, 'Command incorrect']
        return false
      }
    } else if (token.type !== 'ARGUMENT') {
        arr = [false, 'Argument incorrect']
        return false
      }
    return true
  })
  return arr
}

export const explainCommand = async (req:express.Request, res: express.Response) => {
  const {commandType, commandString} = req.body

  if (commandString && commandType) {

    let outputRes: output = {arguments: {}}
    const outputTokens = tokenize(commandString, npmTokens)
    const [ok, message] = check_errors(outputTokens)
    console.log(ok, message);
    if (ok) {
      
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
        } catch(e) {
          return res.status(200).json({success: true, message: outputRes})
        }
      }

      return res.status(200).json({success: true, message: outputRes})

    } else {
      return res.status(422).json({success: false, message: message})
    }

  } else {
    return res.status(422).send({success: false, message: 'command should be in the following format npm <command> [args]'})
  }
}

export default explainCommand