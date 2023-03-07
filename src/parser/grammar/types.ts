import NounPhraseRule from './rules/NounPhraseRule'
import PrepositionPhraseRule from './rules/Preposition'
import SentenceRule from './rules/SentenceRule'
import SubjectRule from './rules/SubjectRule'
import VerbPhraseRule from './rules/VerbPhraseRule'
import Noun from './rules/Noun'
import Verb from './rules/Verb'

declare type Token = string | Noun | NounPhraseRule | PrepositionPhraseRule | SentenceRule | SubjectRule | VerbPhraseRule | Verb

export {
    Token,
}
