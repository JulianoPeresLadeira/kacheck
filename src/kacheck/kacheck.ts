import ArgParser from "../params/arg-parser";
import axios from 'axios';
import { Sorting, SortingMap } from "../params/sorting.functions";

export default class Kacheck {

    private params: ArgParser;;
    private config: any;

    constructor(config: any) {
        this.params = new ArgParser(process.argv);
        this.config = config;
    }

    printHelp() {

        type Helper = { keys: Array<string>, options: SortingMap };

        const flagsToPrint: Array<Helper> = [{ keys: ArgParser.SORTING_KEY, options: Sorting }];

        flagsToPrint.forEach(
            (helper: Helper) => {
                const keyOptions = Object.keys(helper.options)
                    .map((optionValue: string) => `${optionValue}: ${helper.options[optionValue].description}`)
                    .map((optionDescription: string) => `\t${optionDescription}`)
                    .join('\n');
                const keys = `${helper.keys}`;

                console.log(keys);
                console.log(keyOptions);
            }
        );
    }

    async fetchDiscounts() {
        const minDiscount = this.config.minDiscount;

        const transformPrice = val => val.toFixed(2).replace('.', ',')

        const filteringFunction = product => product.desconto > minDiscount
        const sortingFunction = this.params.getSorting();
        const reducingFunction = (product) => ({ Nome: product.produto, Desconto: product.desconto, Valor: transformPrice(product.vlr_oferta) })
        const stringifyFunction = (reducedProduct) => `${reducedProduct.Desconto}% => (R\$${reducedProduct.Valor}) ${reducedProduct.Nome}`;
        const getPromotion = async () => {
            const offerResponse = await axios.get(this.config.getDiscountEndpoint);
            const campanha = offerResponse && offerResponse.data && offerResponse.data.oferta && offerResponse.data.oferta.path_json;
            return campanha;
        }
        const buildEndPoint = (promotion: string) => {
            return `${this.config.getProductEndpoint}?campanha=${promotion}&${this.config.getProductParams}`;
        }

        const promotion = await getPromotion();

        if (promotion) {
            console.log(`Promotion found: ${promotion}`);
        } else {
            console.log("No promotion found");
            return;
        }

        const endpoint = await buildEndPoint(promotion);

        const response = await axios.get(endpoint);
        response.data
            .produtos
            .filter(filteringFunction)
            .sort(sortingFunction)
            .map(reducingFunction)
            .map(stringifyFunction)
            .forEach(str => console.log(str))
    }

    async process() {
        this.params.hasHelpRequest() ?
            this.printHelp() :
            await this.fetchDiscounts();
    }
}
