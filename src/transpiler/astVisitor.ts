import NodeVisitor from './nodeVisitor';
import {
    CompoundModalVerbPhrase,
    NestedModalVerbPhrase,
    NestedVerbPhrase,
    SimpleVerbPhrase,
    CompoundVerbPhrase,
    Predicate,
    NestedCompoundModalVerbPhrase,
    NestedCompoundVerbPhrase,
} from './nodes';

import { actions, assertions, queries } from '../generators/index';
import { ASTNode, CompoundModalVerbPhraseData, CompoundVerbPhraseData, NestedCompoundModalVerbPhraseData, PredicatePhraseData } from './nodeDataTypes';
import { Module } from 'module';

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

function generateFromSimpleVerbPhrase (action: Action, selectors: string[], actionParams:string[] = []): string {
    // if (action.hasParams) return `${action.fn(selector)}`;
    const [ selector, complement ] = selectors;
    return `${queries.get.fn(selector, complement)}${action.fn(...actionParams)}`;
}

class AstVisitor implements NodeVisitor {
    visitSimpleVerbPhrase (node: SimpleVerbPhrase): string {
        const { noun, verb } = node.data;
        const action = getAction(actions, verb);

        if (action) return generateFromSimpleVerbPhrase(action, [noun]);
    }

    visitNestedVerbPhrase (node: NestedVerbPhrase): string {
        const { VerbPhrase, noun: siblingNoun } = node.data;
        const { noun, verb } = VerbPhrase;

        const action = getAction(actions, verb);
        if (action) return generateFromSimpleVerbPhrase(action, [siblingNoun, noun]);
    }

    visitCompoundVerbPhrase (node: CompoundVerbPhrase): string {
        const { noun: target, VerbPhrase } = node.data;
        const { noun: complement, VerbPhrase: nestedVerbPhrase } = VerbPhrase;
        const { noun, verb } = nestedVerbPhrase;

        const action = getAction(actions, verb);
        if (action) return generateFromSimpleVerbPhrase(action, [target, complement], [noun]);
    }

    // empty implementations
    visitNestedCompoundVerbPhrase (node: NestedCompoundVerbPhrase): string {
        return '';
    }

    visitModalVerbPhrase (node: ASTNode): string {
        return '';
    }

    visitNestedModalVerbPhrase (node: CompoundModalVerbPhrase): string {
        return '';
    }
    // empty implementations

    visitCompoundModalVerbPhrase (node: CompoundModalVerbPhrase): string {
        const { VerbPhrase, noun: outerMostSibling } = node.data;
        const { noun, ModalVerbPhrase } = VerbPhrase;
        const { modalVerb, verb } = ModalVerbPhrase;

        return `${queries.get.fn(noun)}${assertions[modalVerb][verb].fn(outerMostSibling)}}`;
    }

    visitNestedCompoundModalVerbPhase (node: NestedCompoundModalVerbPhrase): string {
        const { noun: complement, VerbPhrase } = node.data;
        const { noun: assertValueSelector, VerbPhrase: innerVerbPhrase } = VerbPhrase;
        const { noun: subject, ModalVerbPhrase: modalVerbPhrase } = innerVerbPhrase;
        const { verb, modalVerb } = modalVerbPhrase;

        const assertion = getAction(assertions[modalVerb], verb);
        return queries.get.fn(subject) + assertion.fn(complement, assertValueSelector);
    }

    visitPredicate (node: Predicate): string {
        const { VerbPhrase, adverb } = node.data;
        const { ModalVerbPhrase, noun } = VerbPhrase;
        const { modalVerb, verb } = ModalVerbPhrase;

        return `${queries.get.fn(noun)}${assertions[modalVerb][verb].fn(adverb)}`;
    }
}

export default new AstVisitor();
