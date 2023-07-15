const Queries = {
    get: {
        fn: (selector: string, complement: string = ''):string => {
            return `cy.get("${complement}[data-cy='${selector}']")`;
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
