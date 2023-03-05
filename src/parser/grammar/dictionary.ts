/// <reference path="dictionary.d.ts" />

const selectors: Selector[] = ['cy-[a-z]*']
const nouns: Noun[] = ['button', 'input', 'element', 'class', 'value', 'id', 'attr']
const verbs: Verb[] = ['click', 'type', 'select', 'focus', 'submit', 'is', 'has', 'have', 'should', 'include']
// const determiners: Determiner[] = ['a', 'an', 'the']
const conjunctions: Conjunction[] = ['not', 'and']
const prepositions: Preposition[] = ['be', 'on', 'in', 'to']

export {
    selectors,
    nouns,
    verbs,
    conjunctions,
    prepositions,
}
