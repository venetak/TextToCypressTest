# Cypress Test Generator

The purpose of this tool is to enable automatic generation of Cypress tests from natural language expressions.

# Motivation

Writing simple Cypress tests can be time consuming if you have to cover multiple similar situation. Automating the creation of simple tests can help reduce the time needed to create multiple tests.

# How it Works

Usually the test developer plans the test cases in advance, before actually implementing them. Describing the test using natural language is easier and more intuitive that having to write a library compatible code.

Simply write:

```
Go to http://localhost:8080.
```

in a test file and the generator will output:

```
describe('testPlan', () => {

    it('Suite: ', () => {
        cy.visit(http://localhost:8080);
    });

});
```