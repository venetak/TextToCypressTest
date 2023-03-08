import Rule from './Rule'
import { verbs } from '../dictionary'
import { Token } from '../types'

class Verb extends Rule {
    value: string

    constructor (value: string) {
        super()
        this.value = value
    }

    static isVerb (token: Token) {
        return verbs.indexOf(<VerbValue>token) > -1
    }

    static isVerbInstance (token: Token) {
        return token instanceof Verb
    }
}

export default Verb
