const fs = require('fs');
const path = require('path');

const Parser = require('natural-language-parser').default;
const parser = new Parser();

// console.log(parser.parse('click on cybutton').toHumanReadableJSON());
// {"VerbPhrase":{"verb":"click","preposition":"on","noun":"cybutton"}}
// console.log('-------------------------------------------------------------');
// console.log(parser.parse('cybutton should be visible').toHumanReadableJSON());
// {"VerbPhrase":{"VerbPhrase":{"noun":"cybutton","ModalVerbPhrase":{"modalVerb":"should","verb":"be"}},"noun":"visible"}}
// console.log('-------------------------------------------------------------');
// console.log(parser.parse('open localhost').toHumanReadableJSON());
// {"VerbPhrase":{"verb":"open","noun":"localhost"}}
// console.log('-------------------------------------------------------------');
// console.log(parser.parse('type hello in cyinput').toHumanReadableJSON());
// {"VerbPhrase":{"VerbPhrase":{"verb":"type","noun":"hello"},"preposition":"in","noun":"cyinput"}}
// console.log(parser.parse('button should be visible').toHumanReadableJSON());
// console.log(parser.parse('click on the button'));

import cypressAPI from './config/cypressAPI';
import allowedChainables from './config/allowedChainables';
import vocabulary from './config/vocabulary';
import traverse from './interpreter';

const text = fs.readFileSync(path.join(__dirname, '../demo/testPlan.txt'), { encoding: 'utf8' });

// console.log(interpret({'VerbPhrase':{'verb':'click','preposition':'on','noun':'cybutton'}}));
// console.log(interpret({'VerbPhrase':{'verb':'open','noun':'localhost'}}));

// visitSimpleVerbPhrase
const SimpleVerbPhraseResult = traverse({
    'verb': 'click',
    'noun': 'cyinput',
});
console.log('\n\n');
console.log('-----------------------SimpleVerbPhraseResult------------------------------');
console.log(SimpleVerbPhraseResult);
console.log('-----------------------SimpleVerbPhraseResult------------------------------');

// visitNestedVerbPhrase

const NestedVerbPhraseResult = traverse({
    'VerbPhrase': {
      'verb': 'click',
      'preposition': 'on',
      'noun': 'button',
    },
    'noun': 'cyinput',
});

console.log('\n\n');
console.log('-----------------------NestedVerbPhraseResult------------------------------');
console.log(NestedVerbPhraseResult);
console.log('-----------------------NestedVerbPhraseResult------------------------------');

const CompoundModalVerbPhraseResult = traverse( {
  'VerbPhrase': {
    'noun': 'Button',
    'ModalVerbPhrase': { // NestedModalVerbPhraseData
      'modalVerb': 'should',
      'verb': 'be',
    },
  },
  'noun': 'input',
});
console.log('\n\n');
console.log('-----------------------CompoundModalVerbPhraseResult------------------------------');
console.log(CompoundModalVerbPhraseResult);
console.log('-----------------------CompoundModalVerbPhraseResult------------------------------');

const NestedCompoundModalVerbPhraseResult = traverse({
  'VerbPhrase': {  // CompoundModalVerbPhraseData
    'VerbPhrase': {   // CompoundModalVerbData
      'noun': 'button',
      'ModalVerbPhrase': {
        'modalVerb': 'should',
        'verb': 'have',
      },
    },
    'noun': 'value',
  },
  'noun': 'cybutton',
});

console.log('\n\n');
console.log('-----------------------NestedCompoundModalVerbPhraseResult------------------------------');
console.log(NestedCompoundModalVerbPhraseResult);
console.log('-----------------------NestedCompoundModalVerbPhraseResult------------------------------');

const PredicateResult = traverse({
  'VerbPhrase': {
    'noun': 'button',
    'ModalVerbPhrase': {
      'modalVerb': 'should',
      'verb': 'be',
    },
  },
  'adverb': 'visible',
});
console.log('\n\n');
console.log('-----------------------PredicateResult------------------------------');
console.log(PredicateResult);
console.log('-----------------------PredicateResult------------------------------');

const TestResult = traverse({
  'VerbPhrase': {
      'VerbPhrase': {
          'verb': 'type',
          'noun': 'hello',
      },
      'preposition': 'in',
      'noun': 'input',
  },
  'noun': 'cyinput',
});
console.log('\n\n');
console.log('-----------------------TestResult------------------------------');
console.log(TestResult);
console.log('-----------------------TestResult------------------------------');
