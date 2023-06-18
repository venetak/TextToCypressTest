const Queries = {
    get: {
        fn: (selector: string):string => {
            return `cy.get([data-cy='${selector}'])`;
        },
        hasParams: 1,
    },
    contains: {
        fn: (text: string):string => {
            return `cy.contains('${text}')`;
        },
        hasParams: 1,
    },
};

export default Queries;
