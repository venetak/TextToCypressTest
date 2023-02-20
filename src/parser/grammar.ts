/// <reference path="grammar.d.ts" />
const selectors: Selector[] = ['cy-[a-z]*'];
const nouns: Noun[] = ['button', 'input', 'element', 'class', 'value', 'id', 'attr'];
const verbs: Verb[] = ['click', 'type', 'select', 'focus', 'submit', 'is', 'has', 'have', 'should', 'include'];
// const determiners: Determiner[] = ['a', 'an', 'the'];
const conjunctions: Conjunction[] = ['not', 'and'];
const prepositions: Preposition[] = ['be', 'on', 'in', 'to'];

const selectorsLength = selectors.length;
const nounsLength = nouns.length;
const verbsLength = verbs.length;
// const determinersLength = determiners.length;
const conjunctionsLength = conjunctions.length;
const prepositionsLength = prepositions.length;

function randomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

type Variant = {
    [key: number]: Function
}

class Rule {
    static variants:Variant;

    static generateRandom() {
        const variantsLength = Object.keys(this.variants).length;
        return this.variants[randomInt(variantsLength)]();
    }
}

class NounPhraseRule extends Rule {
    private schema: NounPhrase;
    private noun: Noun;
    private selector: string;

    static variants = {
        0: () => this.getRandomNoun(),
        1: () => `cy-${this.getRandomNoun()}`,
        2: () => `${this.getRandomNoun()} cy-${this.getRandomNoun()}`,
        3: () => `cy-${this.getRandomNoun()} ${this.getRandomNoun()}`,
    }

    static getRandomNoun(): string {
        return nouns[randomInt(nounsLength)];
    }
}

class PrepositionPhraseRule {
    private schema: PrepositionPhrase;
    private preposition: Preposition;
    private noun: NounPhraseRule;

    static getRandomPreposition() {
        return prepositions[randomInt(prepositionsLength)];
    }

    static  generateRandom() {
        return `${this.getRandomPreposition()} ${NounPhraseRule.generateRandom()}`;
    }
}

class SubjectRule extends Rule {
    private schema: Subject;
    private nounPhrase: NounPhraseRule;
    private determiner: Determiner;

    static variants = {
        0: () => NounPhraseRule.generateRandom(),
        // 1: () => `${this.getRandomDeterminer()} ${NounPhraseRule.generateRandom()}`,
    };

    // static getRandomDeterminer() {
    //     return determiners[randomInt(determinersLength)];
    // }
}

class VerbPhraseRule extends Rule {
    private schema: VerbPhrase;
    private verb: Verb;
    private prepositionPhrase: PrepositionPhraseRule;
    private nounPhrase: NounPhraseRule;

    static variants = {
        0: () => this.getRandomVerb(),
        1: () => `${this.getRandomVerb()} ${NounPhraseRule.generateRandom()}`,
        2: () => `${this.getRandomVerb()} ${NounPhraseRule.generateRandom()} ${PrepositionPhraseRule.generateRandom()}`,
    }

    static getRandomVerb() {
        return verbs[randomInt(verbsLength)];
    }
}

class SentenceRule extends Rule {
    private verbPhrase: VerbPhraseRule;
    private subject: SubjectRule;

    static variants = {
        0: () => `${VerbPhraseRule.generateRandom()} ${SubjectRule.generateRandom()}`,
        1: () => `${SubjectRule.generateRandom()} ${VerbPhraseRule.generateRandom()}`,
    }
}

let result = '';

for (let i=0; i < 60; i++) {
    result += SentenceRule.generateRandom() + '\n';
}

console.log('----------------------------------------------------');
console.log(result);
console.log('----------------------------------------------------');