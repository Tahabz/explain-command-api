import {npmTokens, npmType, npmVal} from '../../Lexers/npm/npmtoken'
import IToken, {Tokens} from '../../Lexers/tokens' 
import tokenize from 'build/../../Lexers/npm/tokenize'

it("tests the tokenizer with basic input", () => {
	const tok: IToken<npmType, npmVal>[] = [
		{
			type: npmTokens.npm,
			value: "npm"
		},
		{
			type: npmTokens.command,
			value: "install"
		}
	];
	expect(tokenize("npm install", npmTokens)).toEqual(tok)
	expect(tokenize("", npmTokens)).toEqual([{"type": npmTokens.unknown, value: ""}])
})