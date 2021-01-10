import Token, {tokens, Type, Command, Arg, Unknown} from './token'
import * as M from 'pattern-matching-ts/lib/match'
import { pipe } from 'fp-ts/lib/function'


const tokenize = (input: string): Token[] => {
  const splitInput = input.split(' ');
  const outputTokens = splitInput.map((el: string): Token => {
    if (el in tokens) {
		return {
			type: tokens[el],
			value: el as Command | Arg
		}
	}
	return {
		type: tokens.unknown,
		value: el as string
	}
  })

  return outputTokens
}