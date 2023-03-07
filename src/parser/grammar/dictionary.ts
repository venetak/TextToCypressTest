/// <reference path="dictionary.d.ts" />

const selectors: SelectorValue[] = ['cy-[a-z]*']
const nouns: NounValue[] = ['button', 'input', 'element', 'class', 'value', 'id', 'attr']
const verbs: VerbValue[] = ['click', 'type', 'select', 'focus', 'submit', 'is', 'has', 'have', 'should', 'include']
// const determiners: Determiner[] = ['a', 'an', 'the']
const conjunctions: ConjunctionValue[] = ['not', 'and']
const prepositions: PrepositionValue[] = ['be', 'on', 'in', 'to']

export {
    selectors,
    nouns,
    verbs,
    conjunctions,
    prepositions,
}
