const Navigation = {
    visit: {
        fn: (address: string):string => {
            return `.visit(${address})`;
        },
        hasParams: 1,
    },
};

export default Navigation;
