import Rule from './Rule'
import { nouns, selectors } from '../dictionary'
import tokenize from '../../tokenizer'
import { Token } from '../types'

const selectorsLength = selectors.length
const nounsLength = nouns.length

class NounPhraseRule extends Rule {
    noun: Token
    selector: Token

    constructor (tokens: Token[]) {
        super()

        for (const token of tokens) {
            if (NounPhraseRule.isNoun(token)) this.noun = token
            if (NounPhraseRule.isSelector(token)) this.selector = token
        }
    }

    static variants = {
        0: () => this.getRandomNoun(),
        1: () => `cy-${this.getRandomNoun()}`,
        2: () => `${this.getRandomNoun()} cy-${this.getRandomNoun()}`,
        3: () => `cy-${this.getRandomNoun()} ${this.getRandomNoun()}`,
    }

    static getRandomNoun (): string {
        return nouns[this.randomInt(nounsLength)]
    }

    static isNoun (token: Token): boolean {
        return nouns.indexOf(<Noun>token) > -1
    }

    static isNounInstance (token: Token): boolean {
        return token instanceof NounPhraseRule
    }

    static isSelector (token: Token): boolean {
        if (typeof token !== 'string') return false
        const match = (<string>token).match(selectors[0])
        if (match && match.length) return true
        return false
    }

    static isNounPhrase (tokens: Token[]): boolean {
        const tokensLen = tokens.length
        if (tokensLen <= 0 || tokensLen > 2) return false

        const [tokenA, tokenB] = tokens

        if (tokensLen === 1 && ((this.isNoun(<Noun>tokenA) || this.isNounInstance(tokenA)) || this.isSelector(<string>tokenA))) return true
        if ((this.isNoun(<Noun>tokenA) || this.isNounInstance(tokenA)) && this.isSelector(<string>tokenB)) return true
        if ((this.isNoun(<Noun>tokenA) || this.isNounInstance(tokenA)) && this.isSelector(<string>tokenA)) return true

        return false
    }

}

export default NounPhraseRule
