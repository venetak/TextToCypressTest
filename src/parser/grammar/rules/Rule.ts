type Variant = {
    [key: number]: Function
}

class Rule {
    static variants:Variant

    static generateRandom () {
        const variantsLength = Object.keys(this.variants).length
        return this.variants[this.randomInt(variantsLength)]()
    }

    static randomInt (max: number): number {
        return Math.floor(Math.random() * max)
    }
}

export default Rule
