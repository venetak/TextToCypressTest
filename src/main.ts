const path = require('path');
const fs = require('fs');
const yargs = require('yargs');
import generate from './index'
import { file } from '@babel/types';

yargs.scriptName('text-to-test')
    .usage('$0 <cmd> [args]')
    .command('generate', 'Generate test from test plan!', function (argv) {
        // TODO: check on windows
        const filePath = path.join(process.cwd(), argv.argv.file);

        // TODO: use lsstats to validate!
        try {
            const data = fs.readFileSync(filePath, { encoding: 'utf8' });
            generate(data);
        } catch (error) {
            console.error('--------err',  error);
        }
        // console.log('hello', argv.name, 'welcome to yargs!');
    })
    .option('file', {
        type: 'string',
        describe: 'The path to the test plan',
        alias: 'f',
    })
    .demandOption('file', 'Please, provide a path to the file containing the test plan!')
    .help()
    .argv;
