import Rule from './Rule'
import SubjectRule from './SubjectRule'
import VerbPhraseRule from './VerbPhraseRule'

class SentenceRule extends Rule {
    private verbPhrase: VerbPhraseRule
    private subject: SubjectRule

    static variants = {
        // 0: () => `${VerbPhraseRule.generateRandom()} ${SubjectRule.generateRandom()}`,
        0: () => `${SubjectRule.generateRandom()} ${VerbPhraseRule.generateRandom()}`,
    }
}

export default SentenceRule
