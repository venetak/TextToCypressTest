class Tokenizer {
    tokenize(text: string): string[] {
        return text.split(' ')
    }
}

module.exports = new Tokenizer()
