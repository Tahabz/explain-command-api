import Token, {Command, Arg, Tokens, tokens} from 'build/../../Lexers/npm/token'
import tokenize from 'build/../../Lexers/npm/tokenize'

it("tests the tokenizer with basic input", () => {
	const tok: Token[] = [
		{
			type: "NPM",
			value: "npm"
		},
		{
			type: tokens.command,
			value: "install"
		}
	];
	expect(tokenize("npm install", tokens)).toEqual(tok)
	expect(tokenize("", tokens)).toEqual([{"type": tokens.unknown, value: ""}])
})