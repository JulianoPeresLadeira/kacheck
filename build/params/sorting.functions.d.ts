export declare type SortingFunction = (x: any, y: any) => number;
export declare const Sorting: {
    asc: {
        description: string;
        func: (productA: any, productB: any) => number;
    };
    desc: {
        description: string;
        func: (productA: any, productB: any) => number;
    };
};
