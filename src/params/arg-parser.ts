import { Sorting, SortingFunction } from "./sorting.functions";

export default class ArgParser {

    static SORTING_KEY = ['-sort', '-s'];
    static HELP_KEY = ['-help', '-h'];

    private argv: Array<string>;

    constructor (argv) {
        this.argv = argv;
    }

    public getSorting(): SortingFunction {
        let sorting = Sorting.asc;
        const index = this.argv.findIndex(this.equalsKey(ArgParser.SORTING_KEY))

        if (index >= 0) {
            const sortingValue = this.argv[index + 1];
            sorting = Sorting[sortingValue];
            if (!sorting) {
                throw `Sorting '${sortingValue}' not found. Try '-sort asc' or '-sort desc`
            }
        }

        return sorting.func;
    }

    public hasHelpRequest(): boolean {
        return this.argv.findIndex(this.equalsKey(ArgParser.HELP_KEY)) >= 0;
    }

    private equalsKey(key: Array<string>): ((_: string) => boolean) {
        return (x) => key.includes(x.toLowerCase());
    }
}
