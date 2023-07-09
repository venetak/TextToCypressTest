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

interface NestedModalPhraseData {
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
    VerbPhrase: {
        noun: string,
        VerbPhrase: NestedModalPhraseData
    },
    noun: string,
}

interface PredicatePhraseData {
    VerbPhrase: NestedModalPhraseData,
    adverb: string,
}

declare type NodeData = SimpleVerbPhraseData | ModalVerbPhraseData | NestedVerbPhraseData | NestedModalPhraseData | CompoundModalPhraseData;

interface ASTNode {
    type: string;
    data: NodeData;
    accept: (visitor: NodeVisitor) => void
}

export {
    SimpleVerbPhraseData,
    ModalVerbPhraseData,
    NestedVerbPhraseData,
    NestedModalPhraseData,
    CompoundVerbPhraseData,
    CompoundModalVerbPhraseData,
    PredicatePhraseData,
    ASTNode,
    NodeData,
};
