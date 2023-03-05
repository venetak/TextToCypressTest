/// <reference path="./grammar/dictionary.d.ts" />

import NounPhraseRule from './grammar/rules/NounPhraseRule'
import PrepositionPhraseRule from './grammar/rules/PrepositionPhraseRule'
import SentenceRule from './grammar/rules/SentenceRule'
import SubjectRule from './grammar/rules/SubjectRule'
import VerbPhraseRule from './grammar/rules/VerbPhraseRule'

// let result = ``

// for (let i=0; i < 60; i++) {
//     result += SentenceRule.generateRandom() + '\n'
// }

console.log('----------------------------------------------------NounPhraseRule')
console.log(NounPhraseRule.isNounPhrase('button cy-class'))
console.log(NounPhraseRule.isNounPhrase('cy-class button'))
console.log(NounPhraseRule.isNounPhrase('button'))
console.log(NounPhraseRule.isNounPhrase('cy-buttllon'))
console.log(NounPhraseRule.isNounPhrase('butdsdston'))
console.log(NounPhraseRule.isNounPhrase('butdsdston sds sads'))
console.log('----------------------------------------------------')
console.log('----------------------------------------------------PrepositionPhraseRule')
console.log(PrepositionPhraseRule.isPrepositionPhrase('button cy-class'))
console.log(PrepositionPhraseRule.isPrepositionPhrase('cy-class button'))
console.log(PrepositionPhraseRule.isPrepositionPhrase('button'))
console.log(PrepositionPhraseRule.isPrepositionPhrase('cy-buttllon'))
console.log(PrepositionPhraseRule.isPrepositionPhrase('butdsdston'))
console.log(PrepositionPhraseRule.isPrepositionPhrase('be'))
console.log('----------------------------------------------------')
console.log('----------------------------------------------------SubjectRule')
console.log(SubjectRule.isSubject('button cy-class'))
console.log(SubjectRule.isSubject('cy-class button'))
console.log(SubjectRule.isSubject('button'))
console.log(SubjectRule.isSubject('cy-buttllon'))
console.log(SubjectRule.isSubject('butdsdston'))
console.log(SubjectRule.isSubject('be'))
console.log('----------------------------------------------------')
console.log('----------------------------------------------------VerbPhraseRule')
console.log(VerbPhraseRule.isVerbPhrase('click'))
console.log(VerbPhraseRule.isVerbPhrase('select button'))
console.log(VerbPhraseRule.isVerbPhrase('type button in'))
console.log(VerbPhraseRule.isVerbPhrase('focus on cy-buttllon'))
console.log(VerbPhraseRule.isVerbPhrase('butdsdston'))
console.log(VerbPhraseRule.isVerbPhrase('type element in'))
console.log('----------------------------------------------------')
