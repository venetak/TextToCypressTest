import Rule from './Rule'
import NounPhraseRule from './NounPhraseRule'
import PrepositionPhraseRule from './Preposition'
import tokenize from '../../tokenizer'

import { verbs } from '../dictionary'
import { Token } from '../types'
import SubjectRule from './SubjectRule'
const verbsLength = verbs.length

class VerbPhraseRule extends Rule {
    verb: string
    prepositionPhrase: PrepositionPhraseRule
    nounPhrase: Token

    constructor (tokens: Token[]) {
        super()

        for (const token of tokens) {
            if (VerbPhraseRule.isVerbOrVerbPhrase(token)) this.verbPhrase = token
            if (NounPhraseRule.isNoun(token) || NounPhraseRule.isNounPhrase([token]) || NounPhraseRule.isNounInstance(token)) this.nounPhrase = token
            if (PrepositionPhraseRule.isPrepositionRule([token])) this.prepositionPhrase = token
        }
    }

    static isVerbPhrase (tokens: Token[]): boolean {
        const tokensLen = tokens.length

        if (tokensLen <= 0 || tokensLen > 3) return false
        const [tokenA, tokenB, tokenC] = tokens

        if (tokensLen === 1) return this.isVerb(tokenA)
        if (tokensLen === 2) {
            return (this.isVerbOrVerbPhrase(tokenA)) && NounPhraseRule.isNounPhrase([tokenB]) ||
                   (this.isVerbOrVerbPhrase(tokenA)) && PrepositionPhraseRule.isPrepositionRule([tokenB])
        }

        return (this.isVerbOrVerbPhrase(tokenA) && NounPhraseRule.isNounPhrase([tokenB]) && PrepositionPhraseRule.isPrepositionRule([tokenC]))
    }
}

export default VerbPhraseRule
