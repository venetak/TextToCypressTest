import Rule from './Rule'
import NounPhraseRule from './NounPhraseRule'

class SubjectRule extends Rule {
    private schema: Subject
    private nounPhrase: NounPhraseRule
    private determiner: Determiner

    // TODO: include determiner?
    static variants = {
        0: () => NounPhraseRule.generateRandom(),
        // 1: () => `${this.getRandomDeterminer()} ${NounPhraseRule.generateRandom()}`,
    }

    static isSubject (phrase: string) {
        return NounPhraseRule.isNounPhrase(phrase)
    }

    // static getRandomDeterminer() {
    //     return determiners[randomInt(determinersLength)]
    // }
}

export default SubjectRule
