import tokenize from '../../tokenizer'
import { Token } from '../types'
import NounPhraseRule from './NounPhraseRule'
import Rule from './Rule'
import SubjectRule from './SubjectRule'
import VerbPhraseRule from './VerbPhraseRule'

class SentenceRule extends Rule {
    verbPhrase: Token
    subject: Token

    constructor (tokens: Token[]) {
        super()

        for (const token of tokens) {
            const isVerbOrVerbPhrase = VerbPhraseRule.isVerbInstance(token) || VerbPhraseRule.isVerb(token)
            if (NounPhraseRule.isNounPhrase([token])) this.subject = token
            if (isVerbOrVerbPhrase) this.verbPhrase = token
        }
    }

    static variants = {
        // 0: () => `${VerbPhraseRule.generateRandom()} ${SubjectRule.generateRandom()}`,
        0: () => `${SubjectRule.generateRandom()} ${VerbPhraseRule.generateRandom()}`,
    }

    static isSentence (tokens: Token[]) {
        if (tokens.length <= 0 && tokens.length > 2) return false

        const [tokenA, tokenB] = tokens
        const isVerbOrVerbPhrase = VerbPhraseRule.isVerbInstance(tokenA) || VerbPhraseRule.isVerb(tokenA)

        if (tokens.length === 1) return (isVerbOrVerbPhrase || NounPhraseRule.isNounPhrase([tokenA]))
        return (VerbPhraseRule.isVerbPhrase([tokenB]) && NounPhraseRule.isNounPhrase([tokenA]))
    }
}

export default SentenceRule
