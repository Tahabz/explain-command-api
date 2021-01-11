import IToken, { Tokens } from '../tokens';
import {npmType, npmVal} from './npmtoken'

type Type = npmType
type Value = npmVal

export const newToken = (type: Type, value: Value): IToken<Type, Value> => {
	return {
		type: type,
		value: value
	}
}

const tokenize = (input: string, tokens: Tokens<Type>): IToken<Type, Value>[] => {
  const splitInput = input.split(' ');
  return splitInput.map((el): IToken<Type, Value> => {
    if (el in tokens) {
		return newToken(tokens[el], el)
	}
	return {
		type: tokens.unknown,
		value: el
	}
  })
}

export default tokenize