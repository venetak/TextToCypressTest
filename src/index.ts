const fs = require('fs');
const path = require('path');

const cypressAPI = require('./config/cypressAPI');
const allowedChainables = require('./config/allowedChainables');
const vocabulary = require('./config/vocabulary');
const generators = require('./generators/index');

const suiteDelimiter = '.';
const commandDelimiter = '\n';

declare type ParseError = {
    message: string,
};

declare type ParseResult = {
    error: null | ParseError,
    result?: string[],

};

const specTemplate = (filename: string, suites: string) => `
    describe('${filename}', () => {
        ${suites}
    })
`;

const suiteTemplate = (name: string, commands: string): string => `
    it('${name}', () => {
        ${commands}
    });
`;

function parseTestPlan(text: string, filename: string) {
    const suites = text.split(suiteDelimiter);
    let generatedSuites: string[] = [];

    for(const suite of suites) {
        const commands = suite.split(commandDelimiter);
        let generatedCommands: string[] = [];
        if (!suite.length) continue;

        for(let command of commands) {
            let test = 'cy';
            command = updateWithVocabulary(command);
            const words = command.split(' ');
            for (let i=0; i < words.length; i++) {
                const word = words[i];

                const generator = generators[word];
                if (!generator) continue;
                if (!generator.hasParams) {
                    test += generator.fn();
                    continue;
                }

                const args = getArguments(words, i, generator.hasParams);
                if (args.result) test += generator.fn(...args.result);
                if (args.error) console.error(`Error parsing ${word}: ${args.error.message}`);
            }

            test += ';';
            generatedCommands.push(test);
        }

        if (!generatedCommands.length) continue;
        generatedSuites.push(suiteTemplate(`Suite: `, generatedCommands.join('\n')));
    }

    return specTemplate(filename, generatedSuites.join('\n\n'));
}

function updateWithVocabulary(command: string): string {
    const expressions = Object.keys(vocabulary);

    for (const expression of expressions) {
        const regexp = new RegExp(expression, 'i');
        if (!command.match(regexp)) continue;
        return command.replace(regexp, vocabulary[expression]);
    }

    return command;
}

function getArguments(words: string[], currentIndex: number, numOfParams: number): ParseResult {
    const args: string[] = [];

    for (let i = 0; i < numOfParams; i++) {
        if (!words[currentIndex+1]) return { error: { message: 'missing_arguments' } };

        args.push(words[currentIndex+1]);
        currentIndex +=1;
    }

    return {
        error: null,
        result: args,
    }
}


const text = fs.readFileSync(path.join(__dirname, '../demo/testPlan.txt'), { encoding: 'utf8' });
console.log(parseTestPlan(text, 'testPlan'));
