/// <reference path="grammar.d.ts" />

const { tokenize } = require('./tokenizer')

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
        return verbs[randomInt(verbsLength)]
    }
}

class SentenceRule extends Rule {
    private verbPhrase: VerbPhraseRule
    private subject: SubjectRule

    static variants = {
        // 0: () => `${VerbPhraseRule.generateRandom()} ${SubjectRule.generateRandom()}`,
        0: () => `${SubjectRule.generateRandom()} ${VerbPhraseRule.generateRandom()}`,
    }
}

// let result = ``

// for (let i=0; i < 60; i++) {
//     result += SentenceRule.generateRandom() + '\n'
// }

console.log('----------------------------------------------------')
console.log(NounPhraseRule.isNounPhrase('button cy-class'))
console.log(NounPhraseRule.isNounPhrase('cy-class button'))
console.log(NounPhraseRule.isNounPhrase('button'))
console.log(NounPhraseRule.isNounPhrase('cy-buttllon'))
console.log(NounPhraseRule.isNounPhrase('butdsdston'))
console.log(NounPhraseRule.isNounPhrase('butdsdston sds sads'))
console.log('----------------------------------------------------')
