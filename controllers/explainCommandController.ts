import express from 'express'
import tokenize from '../Lexers/tokenize'
import {npmTokens} from '../Lexers/npm/npmtoken'


export const explainNpm = async (req:express.Request, res: express.Response) => {
  const commandString = req.body.commandString

  if (commandString) {
    const outputTokens = tokenize(commandString, npmTokens)
    if (outputTokens[0].type != 'NPM') {
      outputTokens.forEach((token, i) => {
        if (i == 1 && token.type !== 'COMMAND') {
          return res.status(422).json({success: false, message: "Malformated command"})
        }

      })
    } else {
      return res.json({success: false, message: "Malformated command"})
    }
  }
}

export default explainNpm