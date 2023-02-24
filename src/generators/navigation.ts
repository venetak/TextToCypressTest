const Navigation = {
    visit: {
        fn: (address: string):string => {
            return `.visit(${address})`
        },
        hasParams: 1,
    },
}

module.exports = Navigation
