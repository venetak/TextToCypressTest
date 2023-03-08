import { Token } from '../types'
import NounPhraseRule from './NounPhraseRule'
import Rule from './Rule'
import VerbPhraseRule from './VerbPhraseRule'

class SentenceRule extends Rule {
    verbPhrase: Token
    subject: Token

    constructor (tokens: Token[]) {
        super()

        for (const token of tokens) {
            if (NounPhraseRule.isNounPhraseInstance(token)) this.subject = token
            if (VerbPhraseRule.isVerbPhraseInstance(token)) this.verbPhrase = token
        }
    }

    static isSentence (tokens: Token[]) {
        const tokensLength = tokens.length
        if (!this.isCorrectLength(tokensLength, 2, 2)) return false

        const [tokenA, tokenB] = tokens
        return (VerbPhraseRule.isVerbPhraseInstance(tokenA) && NounPhraseRule.isNounPhraseInstance(tokenB)) ||
               (VerbPhraseRule.isVerbPhraseInstance(tokenB) && NounPhraseRule.isNounPhraseInstance(tokenA))
    }
}

export default SentenceRule
