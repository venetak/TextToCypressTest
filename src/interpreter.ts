import { blob } from 'stream/consumers';
import { actions, navigation, queries } from './generators/index';
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
} from './transpiler/nodeDataTypes';
import NodeVisitor from './transpiler/nodeVisitor';
import { 
    SimpleVerbPhrase,
    // ModalVerbPhrase,
    NestedVerbPhrase,
    NestedModalVerbPhrase,
    CompoundModalVerbPhrase,
    CompoundVerbPhrase,
    Predicate,
} from './transpiler/nodes';
import astVisitor from './transpiler/astVisitor';

type AST = {
    [key: string]: ASTNode;
};

function generateElement (ast: NodeData) {
    // TODO: can this explicit check be avoided>
    if (SimpleVerbPhrase.isSimpleVerbPhrase(ast)) return new SimpleVerbPhrase(<SimpleVerbPhraseData>ast);
    // if (ModalVerbPhrase.isModalVerbPhrase(ast)) return new ModalVerbPhrase(<ModalVerbPhraseData>ast);
    if (NestedVerbPhrase.isNestedVerbPhrase(ast)) return new NestedVerbPhrase(<NestedVerbPhraseData>ast);
    if (NestedModalVerbPhrase.isNestedModalVerbPhrase(ast)) return new NestedModalVerbPhrase(<NestedModalVerbPhraseData>ast);
    if (CompoundModalVerbPhrase.isCompoundModalVerbPhrase(ast)) return new CompoundModalVerbPhrase(<CompoundModalVerbPhraseData>ast);
    if (CompoundVerbPhrase.isCompoundVerbPhrase(ast)) return new CompoundVerbPhrase(<CompoundVerbPhraseData>ast);
    if (Predicate.isPredicate(ast)) return new Predicate(<PredicatePhraseData>ast);
}

// TODO: pass composite
function traverse (ast: any) {
    const element = generateElement(ast);
    return element.accept(astVisitor);
    // recursively loop ast
    // deduce the type of node and create a node instance
    // TODO: !! might be more accurate to call them AST types instead of node types? !!
    // call the accept method and save the output?

    // call all visitors and implement the node type check in the visitor!
}

// const interpreter = new Interpreter();
// interpreter.

export default traverse;
