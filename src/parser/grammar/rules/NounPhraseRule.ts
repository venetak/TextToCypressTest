import Rule from './Rule'
import { nouns, selectors } from '../dictionary'

const selectorsLength = selectors.length
const nounsLength = nouns.length

class NounPhraseRule extends Rule {
    private schema: NounPhrase
    private noun: Noun
    private selector: string

    static variants = {
        0: () => this.getRandomNoun(),
        1: () => `cy-${this.getRandomNoun()}`,
        2: () => `${this.getRandomNoun()} cy-${this.getRandomNoun()}`,
        3: () => `cy-${this.getRandomNoun()} ${this.getRandomNoun()}`,
    }

    static getRandomNoun (): string {
        return nouns[this.randomInt(nounsLength)]
    }

    static isNoun(token: Noun): boolean {
        return nouns.indexOf(token) > -1
    }

    static isSelector(token: string): boolean {
        const match = token.match(selectors[0])
        if (match && match.length) return true
        return false
    }

    static isNounPhrase(phrase: string): boolean {
        const tokens = tokenize(phrase)
        const tokensLen = tokens.length

        if (tokensLen <= 0 || tokensLen > 2) return false

        const [tokenA, tokenB] = tokens

        if (tokensLen === 1 && ( this.isNoun(tokenA) || this.isSelector(tokenA))) return true
        if (this.isNoun(tokenA) && this.isSelector(tokenB)) return true
        if (this.isNoun(tokenB) && this.isSelector(tokenA)) return true

        return false
    }

}

export default NounPhraseRule
