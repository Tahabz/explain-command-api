export default interface IToken<A, B> {
	readonly type: A,
	readonly value: B
	// readonly type: Type | Unknown,
    // readonly value: Command | Arg | string
}

export type Tokens<B> = {[key: string]: B}
