import Rule from './Rule'
import NounPhraseRule from './NounPhraseRule'
import tokenize from '../../tokenizer'
import { Token } from '../types'

class SubjectRule extends Rule {
    nounPhrase: Token
    determiner: Determiner

    constructor (token: Token) {
        super()
        this.nounPhrase = token
    }

    // TODO: include determiner?
    static variants = {
        0: () => NounPhraseRule.generateRandom(),
        // 1: () => `${this.getRandomDeterminer()} ${NounPhraseRule.generateRandom()}`,
    }

    static isSubject (tokens: Token[]) {
        if (tokens.length > 1) return false

        const token = tokens
        return NounPhraseRule.isNounPhrase(tokens) || token instanceof NounPhraseRule || token instanceof SubjectRule
    }

    // static getRandomDeterminer() {
    //     return determiners[randomInt(determinersLength)]
    // }
}

export default SubjectRule
