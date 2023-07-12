const Assertions = {
    should: {
        be: {
            fn: (value: string): string => {
                return `.should('be.${value}')`;
            },
        },
        have: {
            fn: (value: string, chainers: string): string => {
                return `.should(have.${chainers}, '${value}')`;
            },
        },

    },
};

export default Assertions;
