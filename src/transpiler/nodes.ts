import {
    SimpleVerbPhraseData,
    ModalVerbPhraseData,
    NestedVerbPhraseData,
    NestedModalVerbPhraseData,
    CompoundVerbPhraseData,
    PredicatePhraseData,
    ASTNode,
    NodeData,
    CompoundModalVerbPhraseData,
    NestedCompoundModalVerbPhraseData,
    NestedCompoundVerbPhraseData,
} from './nodeDataTypes';
import NodeVisitor from './nodeVisitor';


// VerbPhrase
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
        return 'noun'
            && 'VerbPhrase' in data
            && SimpleVerbPhrase.isSimpleVerbPhrase(<SimpleVerbPhraseData>(data['VerbPhrase']));
    }
}

class CompoundVerbPhrase implements ASTNode {
    type: 'CompoundVerbPhrase';
    data: CompoundVerbPhraseData;

    constructor (data: CompoundVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor) {
        return visitor.visitCompoundVerbPhrase(this);
    }

    static isCompoundVerbPhrase (data: NodeData): boolean {
        return 'noun' in data
            && 'VerbPhrase' in data
            && NestedVerbPhrase.isNestedVerbPhrase(data.VerbPhrase);
    }
}

class NestedCompoundVerbPhrase implements ASTNode {
    type: 'NestedCompoundVerbPhrase';
    data: NestedCompoundVerbPhraseData;

    constructor (data: NestedCompoundVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor) {
        return visitor.visitNestedCompoundVerbPhrase(this);
    }

    static isNestedCompoundVerbPhrase (data: NodeData): boolean {
        return 'noun' in data
            && 'VerbPhrase' in data
            && CompoundVerbPhrase.isCompoundVerbPhrase(data.VerbPhrase);
    }
}

// ModalVerbPhrase
class ModalVerbPhrase implements ASTNode {
    type = 'ModalVerbPhraseData';
    data: ModalVerbPhraseData;

    constructor (data: ModalVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return '';
        // return visitor.visitModalVerbPhrase(this);
    }

    static isModalVerbPhrase (data: NodeData): boolean {
        return 'modalVerb' in data && 'verb' in data;
    }
}
class NestedModalVerbPhrase implements ASTNode {
    type = 'NestedModalPhrase';
    data: NestedModalVerbPhraseData;

    constructor (data: NestedModalVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return '';
        // return visitor.visitNestedModalVerbPhrase(this);
    }

    static isNestedModalVerbPhrase (data: NodeData): boolean {
        return 'noun' in data
            && 'ModalVerbPhrase' in data
            && ModalVerbPhrase.isModalVerbPhrase((<NestedModalVerbPhraseData>data).ModalVerbPhrase);
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

class NestedCompoundModalVerbPhrase implements ASTNode {
    type = 'NestedCompoundModalVerbPhrase';
    data: NestedCompoundModalVerbPhraseData;

    constructor (data: NestedCompoundModalVerbPhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitNestedCompoundModalVerbPhase(this);
    }

    static isNestedCompoundVerbPhrase (data: NodeData): boolean {
        return 'noun' in data
            && 'VerbPhrase' in data
            && CompoundModalVerbPhrase.isCompoundModalVerbPhrase((<NestedCompoundModalVerbPhraseData>data).VerbPhrase);
    }
}

// Predicate
class Predicate implements ASTNode {
    type = 'Predicate';
    data: PredicatePhraseData;

    constructor (data: PredicatePhraseData) {
        this.data = data;
    }

    accept (visitor: NodeVisitor): string {
        return visitor.visitPredicate(this);
    }

    static isPredicate (data: NodeData): boolean {
        return 'adverb' in data
            && 'VerbPhrase' in data
            && NestedModalVerbPhrase.isNestedModalVerbPhrase(data.VerbPhrase);
    }
}

export {
    SimpleVerbPhrase,
    NestedVerbPhrase,
    CompoundVerbPhrase,
    NestedCompoundVerbPhrase,
    ModalVerbPhrase,
    NestedModalVerbPhrase,
    CompoundModalVerbPhrase,
    NestedCompoundModalVerbPhrase,
    Predicate,
};
