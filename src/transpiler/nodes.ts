import {
    SimpleVerbPhraseData,
    ModalVerbPhraseData,
    NestedVerbPhraseData,
    NestedModalPhraseData,
    CompoundVerbPhraseData,
    PredicatePhraseData,
    ASTNode,
    NodeData,
    CompoundModalVerbPhraseData,
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

    static isSimpleVerbPhrase (data: NodeData): boolean {
        return 'verb' in data && 'noun' in data;
    }
}

class ModalVerbPhrase implements ASTNode {
    type = 'ModalVerbPhraseData';
    data: ModalVerbPhraseData;

    constructor (data: ModalVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitModalVerbPhrase(this);
    }

    static isModalVerbPhrase (data: NodeData): boolean {
        return 'modalVerb' in data && 'verb' in data;
    }
}

class NestedVerbPhrase implements ASTNode {
    type = 'NestedVerbPhrase';
    data: NestedVerbPhraseData;

    constructor (data: NestedVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitNestedVerbPhrase(this);
    }

    static isNestedVerbPhrase (data: NodeData): boolean {
        return 'noun' && 'VerbPhrase' in data && SimpleVerbPhrase.isSimpleVerbPhrase(<SimpleVerbPhraseData>(data['VerbPhrase']));
    }
}

class NestedModalVerbPhrase implements ASTNode {
    type = 'NestedModalPhrase';
    data: NestedModalPhraseData;

    constructor (data: NestedModalPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitNestedModalVerbPhrase(this);
    }

    static isNestedModalVerbPhrase (data: NodeData): boolean {
        return 'noun' in data
               && 'ModalVerbPhrase' in data
               && ModalVerbPhrase.isModalVerbPhrase((<NestedModalPhraseData>data).ModalVerbPhrase);
    }
}

class CompoundModalVerbPhrase implements ASTNode {
    type = 'CompoundModalVerbPhrase';
    data: CompoundModalVerbPhraseData;

    constructor (data: CompoundModalVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitCompoundModalVerbPhrase(this);
    }

    static isCompoundModalVerbPhrase (data: NodeData): boolean {
        return 'noun' in data
               && 'VerbPhrase' in data
               && NestedModalVerbPhrase.isNestedModalVerbPhrase((<CompoundModalVerbPhraseData>data).VerbPhrase);
    }
}

class CompoundVerbPhrase implements ASTNode {
    type = 'CompoundVerbPhrase';
    data: CompoundVerbPhraseData;

    constructor (data: CompoundVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitCompoundModalVerbPhrase(this);
    }

    static isCompoundModalVerbPhrase (data: NodeData): boolean {
        return 'noun' in data
               && 'VerbPhrase' in data
               && NestedVerbPhrase.isNestedVerbPhrase((<CompoundVerbPhraseData>data).VerbPhrase);
    }
}

class Predicate implements ASTNode {
    type = 'Predicate';
    data: PredicatePhraseData;

    constructor (data: PredicatePhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitCompoundModalVerbPhrase(this);
    }
}

export {
    SimpleVerbPhrase,
    ModalVerbPhrase,
    NestedVerbPhrase,
    NestedModalVerbPhrase,
    CompoundModalVerbPhrase,
    CompoundVerbPhrase,
    Predicate,
};
