import NounPhraseRule from './rules/NounPhraseRule'
import PrepositionPhraseRule from './rules/PrepositionPhraseRule'
import SentenceRule from './rules/SentenceRule'
import SubjectRule from './rules/SubjectRule'
import VerbPhraseRule from './rules/VerbPhraseRule'

declare type Token = string | NounPhraseRule | PrepositionPhraseRule | SentenceRule | SubjectRule | VerbPhraseRule

export {
    Token,
}
