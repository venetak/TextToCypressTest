export default (name: string, commands: string): string => `
    it('${name}', () => {
        ${commands}
    });
`;
