import Rule from './Rule'
import { nouns, selectors } from '../dictionary'
import { Token } from '../types'
import Noun from './Noun'

class NounPhraseRule extends Rule {
    noun: Token

    constructor (tokens: Token[]) {
        super()

        for (const token of tokens) {
            // TODO: implement determiner
            if (NounPhraseRule.isNounPhrase([token])) this.noun = token
        }
    }

    static isNounPhraseInstance (token: Token): boolean {
        return token instanceof NounPhraseRule
    }

    static isNounPhrase (tokens: Token[]): boolean {
        const tokensLen = tokens.length
        if (!this.isCorrectLength(tokensLen, 0, 1)) return

        const [tokenA] = tokens
        if (tokensLen === 1) return Noun.isNounInstance(tokenA)
    }
}

export default NounPhraseRule
