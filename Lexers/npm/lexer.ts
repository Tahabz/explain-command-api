import Token, {tokens} from './token'
import * as M from 'pattern-matching-ts/lib/match'
import { pipe } from 'fp-ts/lib/function'

const tokenize = (input: string): Token[] => {
  const splitInput = input.split(' ');
  const tokens = splitInput.map(el => {
    if ()
  })
}