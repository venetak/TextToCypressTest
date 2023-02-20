type Selector = 'cy-[a-z]*';
type Noun = 'button' | 'input' | 'element' | 'class' | 'value' | 'id' | 'attr';
type Verb = 'click' | 'type' | 'select' | 'focus' | 'submit' | 'be' | 'is' | 'has' | 'have' | 'should' | 'include';
type Determiner = 'a' | 'an' | 'the';
type Conjunction = 'not' | 'and';
type Preposition ='be' | 'on' | 'in' | 'to';

type PrepositionPhrase = [Preposition, NounPhrase];

type Subject =           [NounPhrase];

type NounPhrase =        [Noun | Selector] |
                         [Noun, Selector] |
                         [Selector, Noun];
         
type VerbPhrase =        [Verb] |
                         [Verb, NounPhrase] |
                         [Verb, NounPhrase, PrepositionPhrase];

type Sentence =          [VerbPhrase, Subject];
