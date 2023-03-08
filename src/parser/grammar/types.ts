import NounPhraseRule from './rules/NounPhraseRule'
import Preposition from './rules/PrepositionRule'
import SentenceRule from './rules/SentenceRule'
import VerbPhraseRule from './rules/VerbPhraseRule'
import Noun from './rules/Noun'
import Verb from './rules/Verb'

declare type Token = string | Noun | NounPhraseRule | Preposition | SentenceRule | VerbPhraseRule | Verb

export {
    Token,
}
