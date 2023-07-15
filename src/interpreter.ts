import { actions, navigation, queries } from './generators/index';
import suite from './generators/suite';
import spec from './generators/spec';

import {
    SimpleVerbPhraseData,
    ModalVerbPhraseData,
    NestedVerbPhraseData,
    CompoundVerbPhraseData,
    PredicatePhraseData,
    ASTNode,
    NodeData,
    CompoundModalVerbPhraseData,
    NestedModalVerbPhraseData,
    NestedCompoundModalVerbPhraseData,
} from './transpiler/nodeDataTypes';
import NodeVisitor from './transpiler/nodeVisitor';
import {
    SimpleVerbPhrase,
    NestedVerbPhrase,
    NestedModalVerbPhrase,
    CompoundModalVerbPhrase,
    CompoundVerbPhrase,
    Predicate,
    NestedCompoundModalVerbPhrase,
} from './transpiler/nodes';
import astVisitor from './transpiler/astVisitor';

type AST = {
    [key: string]: ASTNode;
};

function createElement (ast: NodeData) {
    // TODO: can this explicit check be avoided>
    // VerbPhrase
    if (SimpleVerbPhrase.isSimpleVerbPhrase(ast)) return new SimpleVerbPhrase(<SimpleVerbPhraseData>ast);
    // if (ModalVerbPhrase.isModalVerbPhrase(ast)) return new ModalVerbPhrase(<ModalVerbPhraseData>ast);
    if (NestedVerbPhrase.isNestedVerbPhrase(ast)) return new NestedVerbPhrase(<NestedVerbPhraseData>ast);
    if (CompoundVerbPhrase.isCompoundVerbPhrase(ast)) return new CompoundVerbPhrase(<CompoundVerbPhraseData>ast);

    if (NestedModalVerbPhrase.isNestedModalVerbPhrase(ast)) return new NestedModalVerbPhrase(<NestedModalVerbPhraseData>ast);
    if (CompoundModalVerbPhrase.isCompoundModalVerbPhrase(ast)) return new CompoundModalVerbPhrase(<CompoundModalVerbPhraseData>ast);
    if (NestedCompoundModalVerbPhrase.isNestedCompoundVerbPhrase(ast)) return new NestedCompoundModalVerbPhrase(<NestedCompoundModalVerbPhraseData>ast);
    
    if (Predicate.isPredicate(ast)) return new Predicate(<PredicatePhraseData>ast);
}

// TODO: remove any
function traverse (asts: any[]) {
    const commands = asts.map(ast => {
        const readableObj = ast.toHumanReadableObject();
        const firstKey = Object.keys(readableObj)[0];
        const element = createElement(readableObj[firstKey]);
        return element.accept(astVisitor);
    });

    return commands;
}

export default traverse;
