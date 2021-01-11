import {npmTokens, npmType, npmVal} from '../../Lexers/npm/npmtoken'
import IToken, {Tokens} from '../../Lexers/tokens' 
import tokenize, {newToken} from 'build/../../Lexers/npm/tokenize'



it("tests the tokenizer with basic input", () => {
	const tok: IToken<npmType, npmVal>[] = [
		{
			type: npmTokens["npm"],
			value: "npm"
		},
		{
			type: npmTokens["install"],
			value: "install"
		}
	];
	expect(tokenize("npm install", npmTokens)).toEqual(tok)
	expect(tokenize("", npmTokens)).toEqual([{"type": npmTokens.unknown, value: ""}])
	const tok2 = [
		{
			type: npmTokens.unknown,
			value: "someshitty"
		},
		{
			type: npmTokens.unknown,
			value: "command"
		}
	]
	expect(tokenize("someshitty command", npmTokens)).toEqual(tok2)
})

it("tests the tokenizer with different input", () => {
	const tok: IToken<npmType, npmVal>[] = [
		{
			type: npmTokens["npm"],
			value: "npm"
		},
		{
			type: npmTokens["i"],
			value: "i"
		},
		{
			type: npmTokens.unknown,
			value: "jest"
		}
	];
	expect(tokenize("npm i jest", npmTokens)).toEqual(tok)
})