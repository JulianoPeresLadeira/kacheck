import { Info } from "../models/info";
import { StructuredJson } from "../models/structured-json";
import Product from "../models/product";

export type SortingFunction = (x, y) => number;
export type SortingInfo = Info<SortingFunction>;
export type SortingMap = StructuredJson<SortingInfo>;

export const Sorting: SortingMap = {
    "asc": {
        description: 'Ascendent sorting',
        func: (productA: Product, productB: Product) => productA.desconto - productB.desconto,
        default: true
    },
    "desc": {
        description: 'Descendent sorting',
        func: (productA: Product, productB: Product) => productB.desconto - productA.desconto,
        default: false
    },
    "price-asc": {
        description: 'Price ascendent sorting',
        func: (productA: Product, productB: Product) => productA.vlr_oferta - productB.vlr_oferta,
        default: false
    },
    "price-desc": {
        description: 'Price descendent sorting',
        func: (productA: Product, productB: Product) => productB.vlr_oferta - productA.vlr_oferta,
        default: false
    }
};
