# Cypress Test Generator

The purpose of this tool is to enable automatic generation of Cypress tests from natural language sentences.

# Motivation

Writing simple Cypress tests can be time consuming if you have to cover multiple similar situations. Automating the creation of simple tests can help reduce the time and energy needed to create multiple tests.

# How it Works

Usually the test developer plans the test cases in advance, before actually implementing them. Describing the test using natural language is easier and more intuitive that having to write a library compatible code. The generator reads test plan written in English, parses the sentences and transpiles them to Cypress commands.

Simply write:

```
click on button cybutton.
```

in a test file and the generator will output:

```
describe('Test plan in <test_plan_file_name>', () => {
    it('It should test', () => {
        cy.get("button[data-cy='cybutton']").click()
    });
})
```

Or

```
cybutton should be visible
type hello in input cyinput
```

will be transpiled to:

```
describe('Test plan in fileName', () => {
    it('It should test', () => {
        cy.get("[data-cy='cybutton']").should('be.visible')
        cy.get("input[data-cy='cyinput']").type('hello')
    });
})
```

# Usage

## Configuring a Dictionary

The test generator depends on the [Natural Language Parser npm module](). It requires a dictionary file that specifies the words that can be recognized. Refer to [this guide]() for more information on how to create a dictionary file. For optimal results use [data-cy](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) selectors whenever possible and make sure to add them to the **nouns** array in the dictionary.

## Writing a Test Plan

Each line of the test plan is supposed to be a separate command. For example:

```
Click on button my-button
Type hello in some-input
Button should be visible
```

You must use only words that are specified in the dictionary. If you use other words, the parser will not be able to construct the abstract syntax tree needed to generate the tests.

## Generating Tests

The CLI has a `generate` command. You must pass a `--file` parameter, which is the path to the test plan:

`text-to-test generate -f --file <path_to_test_plan>`

# Limitations

- If a word that is not part of the dictionary is used - the generation will fail.
- No support for multiple specs within one file.
- No support for custom names of test cases.
- No JS API.
