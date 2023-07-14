const path = require('path');
const yargs = require('yargs');

yargs.scriptName('text-to-test')
    .usage('$0 <cmd> [args]')
    .command('generate', 'Generate test from test plan!', function (argv) {
        const filePath = path.join(process.cwd(), argv.file);
        console.log('hello', argv.name, 'welcome to yargs!');
    })
    .option('file', {
        type: 'string',
        describe: 'The path to the test plan',
        alias: 'f',
    })
    .demandOption('file', 'Please, provide a path to the file containing the test plan!')
    .help()
    .argv;
