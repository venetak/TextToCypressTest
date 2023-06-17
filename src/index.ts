const fs = require('fs');
const path = require('path');

const cypressAPI = require('./config/cypressAPI');
const allowedChainables = require('./config/allowedChainables');
const vocabulary = require('./config/vocabulary');
const generators = require('./generators/index');


const Parser = require('natural-language-parser').default
const parser = new Parser()
console.log(parser.parse('Button value should be something').toHumanReadableJSON())
// console.log(parser.parse('the dog is in the park'))
