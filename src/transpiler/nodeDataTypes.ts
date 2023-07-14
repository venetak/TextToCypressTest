// TODO: rename to tree data
// and tree visitor

import NodeVisitor from './nodeVisitor';
import { NestedVerbPhrase } from './nodes';

// VerbPhrase
interface SimpleVerbPhraseData {
    noun: string,
    verb: string,
}

interface NestedVerbPhraseData {
    noun: string,
    VerbPhrase: SimpleVerbPhraseData,
}

interface CompoundVerbPhraseData {
    noun: string
    VerbPhrase: NestedVerbPhraseData,
}

interface NestedCompoundVerbPhraseData {
    noun: string
    VerbPhrase: CompoundVerbPhraseData,
}

// ModalVerbPhrase
interface ModalVerbPhraseData {
    modalVerb: string,
    verb: string,
}

interface NestedModalVerbPhraseData {
    noun: string
    ModalVerbPhrase: ModalVerbPhraseData,
}

interface CompoundModalVerbPhraseData {
    noun: string,
    VerbPhrase: NestedModalVerbPhraseData,
}

interface NestedCompoundModalVerbPhraseData {
    noun: string,
    VerbPhrase: CompoundModalVerbPhraseData,
}

// Predicate
interface PredicatePhraseData {
    adverb: string,
    VerbPhrase: NestedModalVerbPhraseData,
}

declare type NodeData = SimpleVerbPhraseData
    | ModalVerbPhraseData
    | NestedVerbPhraseData
    | NestedCompoundVerbPhraseData
    | NestedModalVerbPhraseData
    | CompoundModalVerbPhraseData
    | CompoundVerbPhraseData
    | PredicatePhraseData
    | NestedCompoundModalVerbPhraseData;

interface ASTNode {
    type: string;
    data: NodeData;
    accept: (visitor: NodeVisitor) => void
}

export {
    SimpleVerbPhraseData,
    NestedVerbPhraseData,
    CompoundVerbPhraseData,
    NestedCompoundVerbPhraseData,
    ModalVerbPhraseData,
    NestedModalVerbPhraseData,
    CompoundModalVerbPhraseData,
    NestedCompoundModalVerbPhraseData,
    PredicatePhraseData,
    ASTNode,
    NodeData,
};
