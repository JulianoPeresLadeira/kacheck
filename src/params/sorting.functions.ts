export type SortingFunction = (x, y) => number;
export type SortingInfo = { description: string, func: SortingFunction }
export type SortingMap = { [index: string]: SortingInfo }
export const Sorting: SortingMap = {
    "asc": {
        description: 'Ascendent sorting',
        func: (productA, productB) => productA.desconto - productB.desconto
    },
    "desc": {
        description: 'Descendant sorting',
        func: (productA, productB) => productB.desconto - productA.desconto
    }
};
