import ArgParser from "./arg-parser"
import { Sorting } from "./sorting.functions";

const mockArgs = (params: string) => process.argv.concat(params.split(' '));

it('should select default sort on no argument',
    () => {
        const params = '';
        const parser = new ArgParser(mockArgs(params));
        expect(parser.getSorting()).toEqual(Sorting.asc.func);
    }
)

it('should select asc sorting',
    () => {
        const params = '-sort asc';
        const parser = new ArgParser(mockArgs(params));
        expect(parser.getSorting()).toEqual(Sorting.asc.func);
    }
)

it('should select desc sorting',
    () => {
        const params = '-sort desc';
        const parser = new ArgParser(mockArgs(params));
        expect(parser.getSorting()).toEqual(Sorting.desc.func);
    }
)


it('should throw error on sorting function not understood',
    () => {
        const params = '-sort invalid_sort';
        const parser = new ArgParser(mockArgs(params));
        expect(() => parser.getSorting()).toThrowError();
    }
)
