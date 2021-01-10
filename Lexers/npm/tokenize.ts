import Token, {Command, Arg, Tokens} from './token'

const tokenize = (input: string, tokens: Tokens): Token[] => {
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

export default tokenize