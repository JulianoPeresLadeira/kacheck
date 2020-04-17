"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sorting_functions_1 = require("./params/sorting.functions");
var ArgParser = /** @class */ (function () {
    function ArgParser(argv) {
        this.argv = argv;
    }
    ArgParser.prototype.getSorting = function () {
        var sorting = sorting_functions_1.Sorting.asc;
        var index = this.argv.findIndex(this.equalsKey(ArgParser.SORTING_KEY));
        if (index >= 0) {
            var sortingValue = this.argv[index + 1];
            sorting = sorting_functions_1.Sorting[sortingValue];
            if (!sorting) {
                throw "Sorting '" + sortingValue + "' not found. Try '-sort asc' or '-sort desc' passing";
            }
        }
        return sorting;
    };
    ArgParser.prototype.equalsKey = function (key) {
        return function (x) { return key.includes(x.toLowerCase()); };
    };
    ArgParser.SORTING_KEY = ['-sort', '-s'];
    return ArgParser;
}());
exports.default = ArgParser;
