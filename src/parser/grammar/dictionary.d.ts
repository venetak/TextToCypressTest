type SelectorValue = 'cy-[a-z]*';
type NounValue = 'button' | 'input' | 'element' | 'class' | 'value' | 'id' | 'attr';
type VerbValue = 'click' | 'type' | 'select' | 'focus' | 'submit' | 'be' | 'is' | 'has' | 'have' | 'should' | 'include';
type Determiner = 'a' | 'an' | 'the';
type ConjunctionValue = 'not' | 'and';
type PrepositionValue ='be' | 'on' | 'in' | 'to';

type PrepositionPhrase = [PrepositionValue, NounPhrase];

type Subject =           [NounPhrase];

type NounPhrase =        [NounValue | SelectorValue] |
                         [NounValue, SelectorValue] |
                         [SelectorValue, NounValue];
         
type VerbPhrase =        [VerbValue] |
                         [VerbValue, NounPhrase] |
                         [VerbValue, NounPhrase, PrepositionPhrase];

type Sentence =          [VerbPhrase, Subject];
