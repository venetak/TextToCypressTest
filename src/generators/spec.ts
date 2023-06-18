const specTemplate = (filename: string, suites: string) => `
    describe('${filename}', () => {
        ${suites}
    })
`;

module.exports = specTemplate;
