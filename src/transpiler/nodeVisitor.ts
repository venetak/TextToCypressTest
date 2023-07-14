import { ASTNode } from './nodeDataTypes';

interface NodeVisitor {
    visitSimpleVerbPhrase(node: ASTNode): string
    visitNestedVerbPhrase(node: ASTNode): string
    visitCompoundVerbPhrase(node: ASTNode): string
    visitNestedCompoundVerbPhrase(node: ASTNode): string

    visitModalVerbPhrase(node: ASTNode): string
    visitNestedModalVerbPhrase(node: ASTNode): string
    visitCompoundModalVerbPhrase(node: ASTNode): string
    visitNestedCompoundModalVerbPhase(node: ASTNode): string

    visitPredicate(node: ASTNode): string
}

export default NodeVisitor;
