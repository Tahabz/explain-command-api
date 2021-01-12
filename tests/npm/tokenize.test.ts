import {npmTokens, npmType, npmVal, npmTypes} from '../../Lexers/npm/npmtoken'
import IToken, {Tokens} from '../../Lexers/tokens' 
import tokenize, {newToken} from '../../Lexers/tokenize'


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
	expect(tokenize("", npmTokens)).toEqual([{"type": npmTokens.arg, value: ""}])
	const tok2: IToken<npmType, npmVal>[] = [
		{
			type: npmTypes.arg,
			value: "someshitty"
		},
		{
			type: npmTokens.arg,
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
			type: npmTokens.arg,
			value: "jest"
		}
	];
	expect(tokenize("npm i jest", npmTokens)).toEqual(tok)
	const tok2: IToken<npmType, npmVal>[] = [
		newToken("NPM", "npm"),
		newToken("COMMAND", "access"),
		newToken("ARGUMENT", "grant")
	]
	expect(tokenize("npm access grant", npmTokens)).toEqual(tok2)
	const tok3 : IToken<npmType, npmVal>[]= [
		newToken("NPM", "npm"),
		newToken("COMMAND", "access"),
		newToken("ARGUMENT", "revoke")
	]
	expect(tokenize("npm access revoke", npmTokens)).toEqual(tok3)
	const tok4 : IToken<npmType, npmVal>[]= [
		newToken("NPM", "npm"),
		newToken("COMMAND", "add"),
		newToken("ARGUMENT", "some"),
		newToken("ARGUMENT", "package")
	]
	expect(tokenize("npm add some package", npmTokens)).toEqual(tok4)
})