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


# Workflow
- pass a file?
- pass a directory with files following pre-established naming convention?
- read the file and parse each line using the NLP module; after that loop the parsed trees to generate code
- how to differentiate between it()s
- CLI support?

# TODO
- generate suite and spec
- decide how to determine suite and spec names
- add tests...
- update readme
