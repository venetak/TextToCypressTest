import {
    SimpleVerbPhraseData,
    ModalVerbPhraseData,
    NestedVerbPhraseData,
    NestedModalPhraseData,
    CompoundVerbPhraseData,
    PredicatePhraseData,
    ASTNode,
} from './nodeDataTypes';
import NodeVisitor from './nodeVisitor';

class SimpleVerbPhrase implements ASTNode {
    type = 'SimpleVerbPhrase';
    data: SimpleVerbPhraseData;

    constructor (data: SimpleVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitSimpleVerbPhrase(this);
    }
}

export {
    SimpleVerbPhrase,
};
