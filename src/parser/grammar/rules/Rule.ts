type Variant = {
    [key: number]: Function
}

class Rule {
    static variants:Variant
    type: string

    static isCorrectLength (tokensLength: Number, min, max) {
        return (tokensLength <= min || tokensLength > max) ? false: true
    }

    static generateRandom () {
        const variantsLength = Object.keys(this.variants).length
        return this.variants[this.randomInt(variantsLength)]()
    }

    static randomInt (max: number): number {
        return Math.floor(Math.random() * max)
    }

    toJSON (result = {}) {
        const properties = Object.getOwnPropertyNames(this)
        let currentInstance = {}
        // TODO: this is error prone; if there is no type this will fail
        const type = properties.splice(properties.indexOf('type'), 1)[0]
        result[this.type] = currentInstance

        for (const property of properties) {
            if (property === 'type') continue

            const propertyInstance = this[property]
            if (propertyInstance.value) {
                currentInstance[property] = propertyInstance.value
                continue
            }

            if (propertyInstance.type) {
                result[this.type] = currentInstance = {...currentInstance, ...propertyInstance.toJSON({})}
            }
        }

        return result
    }
}

export default Rule
