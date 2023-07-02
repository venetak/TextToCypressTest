import { blob } from 'stream/consumers';
import { actions, navigation, queries } from './generators/index';
import {
    SimpleVerbPhraseData,
    ModalVerbPhraseData,
    NestedVerbPhraseData,
    NestedModalPhraseData,
    CompoundVerbPhraseData,
    PredicatePhraseData,
    ASTNode,
    NodeData,
} from './transpiler/nodeDataTypes';
import NodeVisitor from './transpiler/nodeVisitor';
import { SimpleVerbPhrase } from './transpiler/nodes';
import astVisitor from './transpiler/astVisitor';

type AST = {
    [key: string]: ASTNode;
};

function isSimpleVerbPhraseData (ast: NodeData): boolean {
    return 'verb' in ast && 'noun' in ast;
}

function isModalVerbPhraseData (ast: NodeData): boolean {
    return 'modalVerb' in ast && 'verb' in ast;
}

function isNestedVerbPhraseData (ast: NodeData): boolean {
    return 'VerbPhrase' in ast && 'noun' in ast && isSimpleVerbPhraseData(<SimpleVerbPhraseData>(ast['VerbPhrase']));
}
// TODO: finish for rest

function generateElement (ast: NodeData) {
    if (isSimpleVerbPhraseData(ast)) return new SimpleVerbPhrase(<SimpleVerbPhraseData>ast);
    // TODO: same for other types
}

function traverse (ast: NodeData) {
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
