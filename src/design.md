Parse sequences:
# SimpleVerbPhraseData
Get the verb and noun from the data
- use the noun as selector
- use the verb as cypress
cy.get(<noun>).<verb>

# SimpleVerbPhraseData
Same as SimpleVerbPhraseData but ignore any prepositions

# NestedVerbPhraseData
Use SimpleVerbPhraseData visitor to generate
cy.get(<noun>).<verb>
but pass outer noun as additional selector?

# CompoundModalVerbPhraseData
Use verb to determine the syntax:
- have - use it to assert against chainers (including conjunctions like not) => .should([not]have.<noun>, <most_outer_sibling_noun>)
should()

# CompoundVerbPhraseData
Use CompoundModalVerbPhraseData but pass this tree's outer most noun as complement



