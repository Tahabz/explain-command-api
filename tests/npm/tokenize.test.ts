import {tokens, npmType, npmVal} from '../../Lexers/npm/npmtoken'
import IToken, {Tokens} from '../../Lexers/tokens' 
import tokenize from 'build/../../Lexers/npm/tokenize'

it("tests the tokenizer with basic input", () => {
	const tok: IToken<npmType, npmVal>[] = [
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