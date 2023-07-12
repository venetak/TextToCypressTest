import { ASTNode } from './nodeDataTypes';

interface NodeVisitor {
    visitSimpleVerbPhrase(node: ASTNode): string
    // visitModalVerbPhrase(node: ASTNode): string
    visitNestedVerbPhrase(node: ASTNode): string
    // visitNestedModalVerbPhrase(node: ASTNode): string
    visitCompoundModalVerbPhrase(node: ASTNode): string
    // visitCompoundVerbPhrase(node: ASTNode): string
    visitPredicate(node: ASTNode): string
}

export default NodeVisitor;
