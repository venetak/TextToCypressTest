interface FocusOptions {
    log?: boolean;
    timeout?: number;
};

interface ClickOptions {
    altKey?: boolean;
    animationDistanceThreshold?: number;
    ctrlKey?: boolean;
    log?: boolean;
    force?: boolean;
    metaKey?: boolean;
    multiple?: boolean;
    scrollBehavior?: string;
    timeout?: number;
    waitForAnimations?: boolean;
};

type Position = string | { x:number, y:number };

const Actions = {
    type: {
        fn: (text: string): string => {
            return `.type(${text})`;
        },
        hasParams: 1,
    },
    focus: {
        fn: (): string => {
            return `.focus()`;
        },
        hasParams: false,
    },
    click: {
        fn: (): string => {
            return `.click()`;
        },
        hasParams: false,
    }
}

module.exports = Actions;
