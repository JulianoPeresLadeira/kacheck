#!/usr/bin/env node

const axios = require('axios')
const config = require("./config.json")

const minDiscount = config.minDiscount;

const transformPrice = val => val.toFixed(2).replace('.', ',')

const filteringFunction = product => product.desconto > minDiscount
const sortingFunction = (productA, productB) => productA.desconto - productB.desconto
const reducingFunction = (product) => ({Nome: product.produto, Desconto: product.desconto, Valor: transformPrice(product.vlr_oferta)})
const stringifyFunction = (reducedProduct) => `${reducedProduct.Desconto}% => (R\$${reducedProduct.Valor}) ${reducedProduct.Nome}`;
const buildEndPoint = async () => {
    const offerResponse = await axios.get(config.getDiscountEndpoint);
    const campanha = offerResponse && offerResponse.data && offerResponse.data.oferta && offerResponse.data.oferta.path_json;
    return campanha ? `${config.getProductEndpoint}?campanha=${campanha}&${config.getProductParams}` : null
}

const main = (async () => {
    const endpoint = await buildEndPoint();

    if (!endpoint) {
        console.log("Nenhuma oferta encontrada");
        return;
    }

    const response = await axios.get(endpoint);
    response.data
        .produtos
        .filter(filteringFunction)
        .sort(sortingFunction)
        .map(reducingFunction)
        .map(stringifyFunction)
        .forEach(str => console.log(str))
})

main();
