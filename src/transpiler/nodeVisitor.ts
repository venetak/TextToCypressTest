import { ASTNode } from './nodeDataTypes';

interface NodeVisitor {
    visitSimpleVerbPhrase(node: ASTNode): string
    visitModalVerbPhrase(node: ASTNode): string
    visitNestedVerbPhrase(node: ASTNode): string
}

export default NodeVisitor;
