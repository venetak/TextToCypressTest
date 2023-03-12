/// <reference path="dictionary.d.ts" />

const selectors: SelectorValue[] = ['cy-[a-z]*']
const nouns: NounValue[] = ['dog', 'man', 'park', 'button', 'input', 'element', 'class', 'value', 'id', 'attr']
const verbs: VerbValue[] = ['saw', 'click', 'type', 'select', 'focus', 'submit', 'is', 'has', 'have', 'should', 'include']
const determiners: DeterminerValue[] = ['a', 'an', 'the']
const conjunctions: ConjunctionValue[] = ['not', 'and']
const prepositions: PrepositionValue[] = ['be', 'on', 'in', 'to']

export {
    selectors,
    nouns,
    verbs,
    conjunctions,
    prepositions,
    determiners,
}
