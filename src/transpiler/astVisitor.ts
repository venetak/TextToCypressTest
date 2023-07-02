import NodeVisitor from './nodeVisitor';
import {
    SimpleVerbPhrase,
} from './nodes';

import { actions, queries } from '../generators/index';
import { ASTNode } from './nodeDataTypes';

interface Action {
    fn: (text?: string) => string,
    hasParams: boolean,
}

// function getAction<Type, Key extends keyof Type> (obj: Type, key: Key) {
function getAction (obj, key: string) {
    const action = obj[key];
    if (!action) console.error(`Failed to find matching action for ${String(key)}!`);

    return action;
};

function generateFromSimpleVerbPhrase (action: Action, actionParam: string): string {
    if (action.hasParams) return `${action.fn(actionParam)}`;
    return `${queries.contains.fn(actionParam)}${action.fn()}`;
}

class AstVisitor implements NodeVisitor {
    visitSimpleVerbPhrase (node: SimpleVerbPhrase): string{
        const { noun, verb } = node.data;
        const action = getAction(actions, verb);

        if (action) return generateFromSimpleVerbPhrase(action, noun);
    }

    visitModalVerbPhrase (node: ASTNode): string {
        return '';
    }

    visitNestedVerbPhrase (node): string {
        const { VerbPhrase, siblingNoun } = node.data;
        const { noun, verb } = VerbPhrase;
        
        const action = getAction(actions, verb);
        if (action) return generateFromSimpleVerbPhrase(action, noun);
    }
}

export default new AstVisitor();
