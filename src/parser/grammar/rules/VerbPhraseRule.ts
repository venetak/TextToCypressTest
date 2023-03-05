import Rule from './Rule'
import NounPhraseRule from './NounPhraseRule'
import PrepositionPhraseRule from './PrepositionPhraseRule'

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

    static isVerb(token: string) {
        return verbs.indexOf(<Verb>token) > -1
    }

    static isVerbPhrase() {

    }
}

export default VerbPhraseRule
