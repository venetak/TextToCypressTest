import NounPhraseRule from './NounPhraseRule'
import { prepositions } from '../dictionary'
import Rule from './Rule'
import { Token } from '../types'

const prepositionsLength = prepositions.length

class PrepositionPhraseRule extends Rule {
    preposition: Token
    noun: NounPhraseRule

    constructor (tokens: Token[]) {
        super()
        // TODO: include noun phrase?
        this.preposition = <Preposition>tokens[0]
    }

    static getRandomPreposition () {
        return prepositions[this.randomInt(prepositionsLength)]
    }

    static generateRandom () {
        return `${this.getRandomPreposition()} ${NounPhraseRule.generateRandom()}`
    }

    static isPreposition (token: Token): boolean {
        return prepositions.indexOf(<Preposition>token) > -1
    }

    static isPrepositionRule (tokens: Token[]): boolean {
        // TODO: implement noun phrase?
        if (tokens.length > 1) return false

        const token = tokens[0]
        return prepositions.indexOf(<Preposition>token) > -1 || token instanceof PrepositionPhraseRule
    }
}

export default PrepositionPhraseRule
