import { Sorting, SortingFunction, SortingInfo } from "./sorting.functions";
import { DisplayFunction, Display, DisplayInfo } from "./display.function";
import { Info } from "../models/info";
import { StructuredJson } from "../models/structured-json";

export default class ArgParser {

    static SORTING_KEY = ['-sort', '-s'];
    static HELP_KEY = ['-help', '-h'];
    static DISPLAY_KEY = ['-display', '-d'];

    private argv: Array<string>;

    constructor(argv) {
        this.argv = argv;
    }

    private getDefault<T>(map: StructuredJson<Info<T>>): Info<T> {
        let func = Object.keys(map)
            .map((key: string) => map[key])
            .find((info: Info<T>) => info.default) as Info<T>;

        return func;
    }

    private getSelectedFunction<T>(map: StructuredJson<Info<T>>, keys: Array<string>, errMessageFuncName: string): Info<T> {
        let defaultFunction = this.getDefault<T>(map);
        const index = this.argv.findIndex(this.equalsKey(keys));

        if (index >= 0) {
            const selectedValue = this.argv[index + 1];
            defaultFunction = map[selectedValue];
            if (!defaultFunction) {
                const errorMessage = selectedValue ?
                    `${errMessageFuncName} '${selectedValue}' not found. Try '-h' to see available options.` :
                    `${errMessageFuncName} not informed. Try '-h' to see available options.`

                throw new Error(errorMessage);
            }
        }

        return defaultFunction;
    }

    public getSorting(): SortingFunction {
        return this.getSelectedFunction<SortingFunction>(Sorting, ArgParser.SORTING_KEY, 'Sorting').func;
    }

    public getDisplay(): DisplayInfo {
        return this.getSelectedFunction<DisplayFunction>(Display, ArgParser.DISPLAY_KEY, 'Display') as DisplayInfo;
    }

    public hasHelpRequest(): boolean {
        return this.argv.findIndex(this.equalsKey(ArgParser.HELP_KEY)) >= 0;
    }

    private equalsKey(key: Array<string>): ((_: string) => boolean) {
        return (x) => key.includes(x.toLowerCase());
    }
}
