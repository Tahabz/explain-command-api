import IToken, { Tokens } from '../tokens';
import {npmType, npmVal} from './npmtoken'

type Type = npmType
type Value = npmVal

const tokenize = <A extends Type, B extends Value, X extends Tokens<A>>(input: string, tokens: X): IToken<A, B>[] => {
  const splitInput = input.split(' ');
  return splitInput.map((el: string): IToken<A, B> => {
    if (el in tokens) {
		return {
			type: tokens[el],
			value: el as B
		}
	}
	return {
		type: tokens.unknown,
		value: el as B
	}
  })
}

export default tokenize