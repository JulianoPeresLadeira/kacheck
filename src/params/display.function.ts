import Product from "../models/product";
import { Info } from "../models/info";
import { StructuredJson } from "../models/structured-json";

export type DisplayFunction = (product: Product) => any;
export interface DisplayInfo extends Info<DisplayFunction> { stringify: (_: any) => string };
export type DisplayMap = StructuredJson<DisplayInfo>;

const transformPrice = (val: number) => val.toFixed(2).replace('.', ',')
const buildKabumLink = (product: Product) => `https://www.kabum.com.br/cgi-local/site/produtos/descricao_ofertas.cgi?codigo=${product.codigo}`
const buildZoomSearchLink = (product: Product) => `https://www.zoom.com.br/search?q=${product.produto.split(' ').join('+')}`

export const Display: DisplayMap = {
    "simple": {
        description: 'Displays only basic information on the product',
        func: (product: Product) => ({
            Nome: product.produto,
            Desconto: product.desconto,
            Valor: transformPrice(product.vlr_oferta)
        }),
        stringify: (reducedProduct) => `${reducedProduct.Desconto}% => (R\$${reducedProduct.Valor}) ${reducedProduct.Nome} `,
        default: true
    },
    "full": {
        description: 'Displays additional information on the product',
        func: (product: Product) => ({
            Nome: product.produto,
            Desconto: product.desconto,
            Valor: transformPrice(product.vlr_oferta),
            Link: buildKabumLink(product),
            Zoom: buildZoomSearchLink(product)
        }),
        stringify: (reducedProduct) => `${reducedProduct.Desconto}% => (R\$${reducedProduct.Valor}) ${reducedProduct.Nome} ${reducedProduct.Link} ${reducedProduct.Zoom} `,
        default: false
    },
}
