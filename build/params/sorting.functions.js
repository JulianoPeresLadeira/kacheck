"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorting = {
    "asc": {
        description: 'Ascendent sorting',
        func: function (productA, productB) { return productA.desconto - productB.desconto; }
    },
    "desc": {
        description: 'Descendant sorting',
        func: function (productA, productB) { return productB.desconto - productA.desconto; }
    }
};
