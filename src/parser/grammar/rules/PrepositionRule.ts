import NounPhraseRule from './NounPhraseRule'
import { prepositions } from '../dictionary'
import Rule from './Rule'
import { Token } from '../types'

const prepositionsLength = prepositions.length

class Preposition extends Rule {
    preposition: Token

    constructor (token: Token) {
        super()
        // TODO: include noun phrase?
        this.preposition = <PrepositionValue>token
    }

    static isPreposition (token: Token): boolean {
        return prepositions.indexOf(<PrepositionValue>token) > -1
    }

    static isPrepositionInstance (token: Token): boolean {
        return token instanceof Preposition
    }
}

export default Preposition
