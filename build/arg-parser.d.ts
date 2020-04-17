import { SortingFunction } from "./params/sorting.functions";
export default class ArgParser {
    static SORTING_KEY: string[];
    private argv;
    constructor(argv: any);
    getSorting(): SortingFunction;
    private equalsKey;
}
