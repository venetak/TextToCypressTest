import NounPhraseRule from './NounPhraseRule'
import { prepositions } from '../dictionary'
import Rule from './Rule'

const prepositionsLength = prepositions.length

class PrepositionPhraseRule extends Rule {
    private schema: PrepositionPhrase
    private preposition: Preposition
    private noun: NounPhraseRule

    static getRandomPreposition () {
        return prepositions[this.randomInt(prepositionsLength)]
    }

    static generateRandom () {
        return `${this.getRandomPreposition()} ${NounPhraseRule.generateRandom()}`
    }

    static isPrepositionPhrase (phrase: string): boolean {
        return (prepositions.indexOf(<Preposition>phrase) > -1)
    }
}

export default PrepositionPhraseRule
