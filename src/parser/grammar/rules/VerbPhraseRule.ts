import Rule from './Rule'
import NounPhraseRule from './NounPhraseRule'
import PrepositionPhraseRule from './PrepositionPhraseRule'
import tokenize from '../../tokenizer'

import { verbs } from '../dictionary'
const verbsLength = verbs.length

class VerbPhraseRule extends Rule {
    private schema: VerbPhrase
    private verb: Verb
    private prepositionPhrase: PrepositionPhraseRule
    private nounPhrase: NounPhraseRule

    static variants = {
        0: () => this.getRandomVerb(),
        1: () => `${this.getRandomVerb()} ${NounPhraseRule.generateRandom()}`,
        2: () => `${this.getRandomVerb()} ${NounPhraseRule.generateRandom()} ${PrepositionPhraseRule.generateRandom()}`,
    }

    static getRandomVerb () {
        return verbs[this.randomInt(verbsLength)]
    }

    static isVerb (token: string) {
        return verbs.indexOf(<Verb>token) > -1
    }

    static isVerbPhrase (phrase: string): boolean {
        const tokens = tokenize(phrase)
        const tokensLen = tokens.length

        if (tokensLen <= 0 || tokensLen > 3) return false
        const [tokenA, tokenB, tokenC] = tokens

        if (tokensLen === 1) return this.isVerb(tokenA)
        if (tokensLen === 2) return (this.isVerb(tokenA) && NounPhraseRule.isNoun(<Noun>tokenB))
        return (this.isVerb(tokenA) && NounPhraseRule.isNoun(<Noun>tokenB) && PrepositionPhraseRule.isPrepositionPhrase(tokenC))
    }
}

export default VerbPhraseRule
