// TODO: rename to tree data
// and tree visitor

import NodeVisitor from './nodeVisitor';

interface SimpleVerbPhraseData {
    verb: string,
    noun: string,
}

interface ModalVerbPhraseData {
    modalVerb: string,
    verb: string,
}

interface NestedVerbPhraseData {
    noun: string,
    VerbPhrase: SimpleVerbPhraseData,
}

interface NestedModalVerbPhraseData {
    noun: string
    ModalVerbPhrase: ModalVerbPhraseData,
}

interface CompoundModalVerbPhraseData {
    VerbPhrase: {
        noun: string
        ModalVerbPhrase: ModalVerbPhraseData,
    }, 
    noun: string,
}

interface CompoundVerbPhraseData {
    VerbPhrase: CompoundModalVerbPhraseData,
    noun: string,
}

interface PredicatePhraseData {
    VerbPhrase: NestedModalVerbPhraseData,
    adverb: string,
}

declare type NodeData = SimpleVerbPhraseData | ModalVerbPhraseData | NestedVerbPhraseData | NestedModalVerbPhraseData | CompoundModalVerbPhraseData | CompoundVerbPhraseData | PredicatePhraseData;

interface ASTNode {
    type: string;
    data: NodeData;
    accept: (visitor: NodeVisitor) => void
}

export {
    SimpleVerbPhraseData,
    ModalVerbPhraseData,
    NestedVerbPhraseData,
    NestedModalVerbPhraseData,
    CompoundVerbPhraseData,
    CompoundModalVerbPhraseData,
    PredicatePhraseData,
    ASTNode,
    NodeData,
};
