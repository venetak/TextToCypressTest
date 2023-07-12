import NodeVisitor from './nodeVisitor';
import {
    CompoundModalVerbPhrase,
    NestedModalVerbPhrase,
    NestedVerbPhrase,
    SimpleVerbPhrase,
    CompoundVerbPhrase,
    Predicate,
} from './nodes';

import { actions, assertions, queries } from '../generators/index';
import { ASTNode, CompoundModalVerbPhraseData, CompoundVerbPhraseData, PredicatePhraseData } from './nodeDataTypes';
import { Module } from 'module';

interface Action {
    fn: (text?: string) => string,
    hasParams: boolean,
}

// function getAction<Type, Key extends keyof Type> (obj: Type, key: Key) {
function getAction(obj, key: string) {
    const action = obj[key];
    if (!action) console.error(`Failed to find matching action for ${String(key)}!`);

    return action;
};

function generateFromSimpleVerbPhrase(action: Action, actionParam: string): string {
    if (action.hasParams) return `${action.fn(actionParam)}`;
    return `${queries.contains.fn(actionParam)}${action.fn()}`;
}

class AstVisitor implements NodeVisitor {
    visitSimpleVerbPhrase (node: SimpleVerbPhrase): string {
        const { noun, verb } = node.data;
        const action = getAction(actions, verb);

        if (action) return generateFromSimpleVerbPhrase(action, noun);
    }

    visitNestedVerbPhrase (node: NestedVerbPhrase): string {
        const { VerbPhrase, noun: siblingNoun } = node.data;
        const { noun, verb } = VerbPhrase;

        const action = getAction(actions, verb);
        if (action) return generateFromSimpleVerbPhrase(action, `.${noun}.${siblingNoun}`);
    }

    // visitCompoundVerbPhrase (node: CompoundVerbPhrase): string {
        // const { noun: complement, VerbPhrase } = node.data;
        // const { noun: subject, ModalVerbPhrase } = VerbPhrase;
        // const { verb, modalVerb } = ModalVerbPhrase;

        // const assertion = getAction(assertions.should, verb);
        // return queries.get.fn(subject) + assertion.fn(complement, verb);
    // }

    visitNestedModalVerbPhrase (node: CompoundModalVerbPhrase): string {
        return '';
    }

    visitCompoundModalVerbPhrase (node: CompoundModalVerbPhrase): string {
        const { VerbPhrase, noun: outerMostSibling } = node.data;
        const { noun, ModalVerbPhrase } = VerbPhrase;
        const { modalVerb, verb } = ModalVerbPhrase;

        return `${queries.get.fn(noun)}.${assertions[modalVerb][verb].fn(outerMostSibling)}}`;
    }

    visitPredicate (node: Predicate): string {
        const { VerbPhrase, adverb } = node.data;
        const { ModalVerbPhrase, noun } = VerbPhrase;
        const { modalVerb, verb } = ModalVerbPhrase;

        return `${queries.get.fn(noun)}.${assertions[modalVerb][verb].fn(adverb)}`;
    }
}

export default new AstVisitor();
