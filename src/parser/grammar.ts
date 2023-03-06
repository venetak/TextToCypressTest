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
console.log(NounPhraseRule.isNounPhrase(['button', 'cy-class']))           // true
console.log(NounPhraseRule.isNounPhrase(['cy-class', 'button']))           // true
console.log(NounPhraseRule.isNounPhrase(['button']))                       // true
console.log(NounPhraseRule.isNounPhrase(['cy-buttllon']))                  // true
console.log(NounPhraseRule.isNounPhrase(['butdsdston']))                   // false
console.log(NounPhraseRule.isNounPhrase(['butdsdston', 'sds', 'sads']))    // false
console.log(NounPhraseRule.isNounPhrase([new NounPhraseRule(['button'])]))   // true
console.log('----------------------------------------------------')
console.log('----------------------------------------------------PrepositionPhraseRule')
console.log(PrepositionPhraseRule.isPreposition('button cy-class'))        // false
console.log(PrepositionPhraseRule.isPreposition('cy-class button'))        // false
console.log(PrepositionPhraseRule.isPreposition('button'))                 // false
console.log(PrepositionPhraseRule.isPreposition('cy-buttllon'))            // false
console.log(PrepositionPhraseRule.isPreposition('butdsdston'))             // false
console.log(PrepositionPhraseRule.isPreposition('be'))                     // true
console.log('----------------------------------------------------')
console.log('----------------------------------------------------SubjectRule')
console.log(SubjectRule.isSubject(['button cy-class']))                      // true
console.log(SubjectRule.isSubject(['cy-class button']))                      // true
console.log(SubjectRule.isSubject(['button']))                               // true
console.log(SubjectRule.isSubject(['cy-buttllon']))                          // true
console.log(SubjectRule.isSubject(['butdsdston']))                           // false
console.log(SubjectRule.isSubject(['be']))                                   // false
console.log(SubjectRule.isSubject([new NounPhraseRule(['button'])]))           // true
console.log('----------------------------------------------------')
console.log('----------------------------------------------------VerbPhraseRule')
console.log(VerbPhraseRule.isVerbPhrase(['click']))                                                                                    // true
console.log(VerbPhraseRule.isVerbPhrase(['select', 'button']))                                                                         // true
console.log(VerbPhraseRule.isVerbPhrase(['type', 'button', 'in']))                                                                     // true
console.log(VerbPhraseRule.isVerbPhrase(['focus', 'on', 'cy-buttllon']))                                                               // false
console.log(VerbPhraseRule.isVerbPhrase(['butdsdston']))                                                                               // false
console.log(VerbPhraseRule.isVerbPhrase(['type', 'element', 'in']))                                                                    // true
console.log(VerbPhraseRule.isVerbPhrase([new VerbPhraseRule(['click']), new NounPhraseRule(['button']), 'in']))                            // true
console.log(VerbPhraseRule.isVerbPhrase(['click', new NounPhraseRule(['button']), 'in']))                                                // true
console.log(VerbPhraseRule.isVerbPhrase(['click', new NounPhraseRule(['button']), new PrepositionPhraseRule(['in'])]))                     // true
console.log(VerbPhraseRule.isVerbPhrase([new VerbPhraseRule(['click']), new NounPhraseRule(['button']), new PrepositionPhraseRule(['in'])])) // true
console.log('----------------------------------------------------')
