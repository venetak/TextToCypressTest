import NounPhraseRule from './NounPhraseRule'
import { prepositions } from '../dictionary'
import Rule from './Rule'
import { Token } from '../types'

const prepositionsLength = prepositions.length

class Preposition extends Rule {
    preposition: Token
    noun: NounPhraseRule

    constructor (tokens: Token[]) {
        super()
        // TODO: include noun phrase?
        this.preposition = <PrepositionValue>tokens[0]
    }

    static isPreposition (token: Token): boolean {
        return prepositions.indexOf(<PrepositionValue>token) > -1
    }
}

export default Preposition
