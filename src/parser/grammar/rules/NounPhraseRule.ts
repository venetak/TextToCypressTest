import Rule from './Rule'
import { nouns, selectors } from '../dictionary'
import { Token } from '../types'
import Noun from './Noun'

class NounPhraseRule extends Rule {
    noun: Noun
    selector: string

    constructor (tokens: Token[]) {
        super()

        for (const token of tokens) {
            if (Noun.isNoun(token)) this.noun = <Noun>token
            if (NounPhraseRule.isSelector(token)) this.selector = <string>token
        }
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

        if (tokensLen === 1) return (Noun.isNoun(<Noun>tokenA) || this.isSelector(<string>tokenA))
        if (Noun.isNoun(<Noun>tokenA) && this.isSelector(<string>tokenB)) return true
        if (Noun.isNoun(<Noun>tokenA) && this.isSelector(<string>tokenA)) return true

        return false
    }

}

export default NounPhraseRule
