export default (filename: string, suites: string) => `
    describe('${filename}', () => {
        ${suites}
    })
`;
