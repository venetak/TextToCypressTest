/// <reference path="./grammar/dictionary.d.ts" />

import NounPhraseRule from './grammar/rules/NounPhraseRule'
import PrepositionPhraseRule from './grammar/rules/Preposition'
import SentenceRule from './grammar/rules/SentenceRule'
import SubjectRule from './grammar/rules/SubjectRule'
import VerbPhraseRule from './grammar/rules/VerbPhraseRule'
import { Token } from './grammar/types'
import tokenize from './tokenizer'

declare type productionItem = Token | string;

class Stack {
    tokens: Token[]
    items: productionItem[]

    constructor (tokens: Token[]) {
        this.tokens = tokens
        this.items = []
    }

    shift (word) {
        this.tokens.shift()
        return this.items.unshift(word)
    }

    reduce (start, end, replacement: Token) {
        this.items.splice(start, end, replacement)
    }
}

class AST {
    root
}

class Parser {
    phrase: string
    stack: object[]

    hasProduction (tokens: Token[], stack) {
        if (NounPhraseRule.isNoun(tokens[0])) return new NounPhraseRule(tokens)
        if (VerbPhraseRule.isVerbPhrase(tokens)) return new VerbPhraseRule(tokens)
        if (PrepositionPhraseRule.isPreposition(tokens[0])) return new PrepositionPhraseRule(tokens)
        // if (SubjectRule.isSubject(tokens)) return new SubjectRule(tokens[0])
        if (!stack.tokens.length && SentenceRule.isSentence(tokens)) return new SentenceRule(tokens)
    }

    checkForProduction (stack) {
        const stackLength = stack.items.length
        const beginning = 0
        let i = beginning

        do {
            i += 1
            const production = this.hasProduction(stack.items.slice(beginning, i).reverse(), stack)
            if (production) {
                stack.reduce(beginning, i, production)
                this.checkForProduction(stack)
            }
        } while (i !== stackLength)
    }

    parse (phrase: string) {
        const tokens = tokenize(phrase)
        const stack = new Stack(tokens)

        this.shiftReduce(stack)
    }

    shiftReduce (stack: Stack) {
        if (!stack.tokens.length) {
            console.log('------------')
            console.log(JSON.stringify(stack.items[0]))
            return
        }
        stack.shift(stack.tokens[0])
        this.checkForProduction(stack)
        this.shiftReduce(stack)
    }
}

new Parser().parse('type button in input')
