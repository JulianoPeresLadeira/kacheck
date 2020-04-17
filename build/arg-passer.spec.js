"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var arg_parser_1 = __importDefault(require("./arg-parser"));
var sorting_functions_1 = require("./params/sorting.functions");
var mockArgs = function (params) { return process.argv.concat(params.split(' ')); };
it('should select default sort on no argument', function () {
    var params = '';
    var parser = new arg_parser_1.default(mockArgs(params));
    expect(parser.getSorting()).toEqual(sorting_functions_1.Sorting.asc);
});
it('should select asc sorting', function () {
    var params = '-sort asc';
    var parser = new arg_parser_1.default(mockArgs(params));
    expect(parser.getSorting()).toEqual(sorting_functions_1.Sorting.asc);
});
it('should select desc sorting', function () {
    var params = '-sort desc';
    var parser = new arg_parser_1.default(mockArgs(params));
    expect(parser.getSorting()).toEqual(sorting_functions_1.Sorting.desc);
});
it('should throw error on sorting function not understood', function () {
    var params = '-sort invalid_sort';
    var parser = new arg_parser_1.default(mockArgs(params));
    expect(function () { return parser.getSorting(); }).toThrowError();
});
