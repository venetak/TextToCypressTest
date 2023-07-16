const fs = require('fs');
const path = require('path');

const Parser = require('natural-language-parser').default;
const parser = new Parser();

import traverse from './interpreter';
import suite from './generators/suite';
import spec from './generators/spec';
import { EOL } from 'os';

function generate (testPlan: string, fileName: string) {
  const textCommands: string[] = testPlan.split(EOL);
  const textCommandsAST = textCommands.map(textCommand => {
    return parser.parse(textCommand);
  });

  const result = traverse(textCommandsAST);

  const suiteGen = suite(`It should test`, result.join('\n\t\t'));
  const specgen = spec(`Test plan in fileName`, suiteGen);
  const outputFilePath = path.join(__dirname, 'testGen.js');

  try {
    fs.writeFileSync(outputFilePath, specgen, { encoding: 'utf8' });
    console.log(`Done! Generated test saved in - ${outputFilePath}`);
  } catch(error) {
    console.error(error);
  }
}

export default generate;

// console.log(interpret({'VerbPhrase':{'verb':'click','preposition':'on','noun':'cybutton'}}));
// console.log(interpret({'VerbPhrase':{'verb':'open','noun':'localhost'}}));

// visitSimpleVerbPhrase
// const SimpleVerbPhraseResult = traverse({
//     'verb': 'click',
//     'noun': 'cyinput',
// });
// console.log('\n\n');
// console.log('-----------------------SimpleVerbPhraseResult------------------------------');
// console.log(SimpleVerbPhraseResult);
// console.log('-----------------------SimpleVerbPhraseResult------------------------------');

// // visitNestedVerbPhrase

// const NestedVerbPhraseResult = traverse({
//     'VerbPhrase': {
//       'verb': 'click',
//       'preposition': 'on',
//       'noun': 'button',
//     },
//     'noun': 'cyinput',
// });

// console.log('\n\n');
// console.log('-----------------------NestedVerbPhraseResult------------------------------');
// console.log(NestedVerbPhraseResult);
// console.log('-----------------------NestedVerbPhraseResult------------------------------');

// const CompoundModalVerbPhraseResult = traverse( {
//   'VerbPhrase': {
//     'noun': 'Button',
//     'ModalVerbPhrase': { // NestedModalVerbPhraseData
//       'modalVerb': 'should',
//       'verb': 'be',
//     },
//   },
//   'noun': 'input',
// });
// console.log('\n\n');
// console.log('-----------------------CompoundModalVerbPhraseResult------------------------------');
// console.log(CompoundModalVerbPhraseResult);
// console.log('-----------------------CompoundModalVerbPhraseResult------------------------------');

// const NestedCompoundModalVerbPhraseResult = traverse({
//   'VerbPhrase': {  // CompoundModalVerbPhraseData
//     'VerbPhrase': {   // CompoundModalVerbData
//       'noun': 'button',
//       'ModalVerbPhrase': {
//         'modalVerb': 'should',
//         'verb': 'have',
//       },
//     },
//     'noun': 'value',
//   },
//   'noun': 'cybutton',
// });

// console.log('\n\n');
// console.log('-----------------------NestedCompoundModalVerbPhraseResult------------------------------');
// console.log(NestedCompoundModalVerbPhraseResult);
// console.log('-----------------------NestedCompoundModalVerbPhraseResult------------------------------');

// const PredicateResult = traverse({
//   'VerbPhrase': {
//     'noun': 'button',
//     'ModalVerbPhrase': {
//       'modalVerb': 'should',
//       'verb': 'be',
//     },
//   },
//   'adverb': 'visible',
// });
// console.log('\n\n');
// console.log('-----------------------PredicateResult------------------------------');
// console.log(PredicateResult);
// console.log('-----------------------PredicateResult------------------------------');

// const TestResult = traverse({
//   'VerbPhrase': {
//       'VerbPhrase': {
//           'verb': 'type',
//           'noun': 'hello',
//       },
//       'preposition': 'in',
//       'noun': 'input',
//   },
//   'noun': 'cyinput',
// });
// console.log('\n\n');
// console.log('-----------------------TestResult------------------------------');
// console.log(TestResult);
// console.log('-----------------------TestResult------------------------------');
