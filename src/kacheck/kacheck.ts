import ArgParser from "../params/arg-parser";
import axios from 'axios';
import { Sorting } from "../params/sorting.functions";
import { Info } from "../models/info";
import { StructuredJson } from "../models/structured-json";
import { Display, DisplayInfo } from "../params/display.function";
import Product from "../models/product";

export default class Kacheck {

    private params: ArgParser;;
    private config: any;

    constructor(config: any) {
        this.params = new ArgParser(process.argv);
        this.config = config;
    }

    printHelp() {
        type Helper = { keys: Array<string>, options: StructuredJson<Info<any>> };

        const flagsToPrint: Array<Helper> = [
            { keys: ArgParser.SORTING_KEY, options: Sorting },
            { keys: ArgParser.DISPLAY_KEY, options: Display }
        ];

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

    buildEndpoint(promotion: string): string {
        return `${this.config.getProductEndpoint}?campanha=${promotion}&${this.config.getProductParams}`;
    }

    async fetchPromotion(): Promise<string> {
        const offerResponse = await axios.get(this.config.getDiscountEndpoint);
        const campanha = offerResponse && offerResponse.data && offerResponse.data.oferta && offerResponse.data.oferta.path_json;
        return campanha;
    }

    async fetchProducts(endpoint: string): Promise<Array<Product>> {
        return (await axios.get(endpoint)).data.produtos;
    }

    async fetchDiscounts() {
        const minDiscount = this.config.minDiscount;

        const filteringFunction = product => product.desconto > minDiscount

        const sortingFunction = this.params.getSorting();
        const displayInfo: DisplayInfo = this.params.getDisplay();
        const reducingFunction = displayInfo.func;
        const stringifyFunction = displayInfo.stringify;

        const promotion = await this.fetchPromotion();

        if (promotion) {
            console.log(`Promotion found: ${promotion}`);
        } else {
            console.log("No promotion found");
            return;
        }

        const endpoint = this.buildEndpoint(promotion);
        const products = await this.fetchProducts(endpoint);
        products
            .filter(filteringFunction)
            .sort(sortingFunction)
            .map(reducingFunction)
            .map(stringifyFunction)
            .forEach(str => console.log(str))
    }

    async process() {
        this.params.hasHelpRequest() ?
            this.printHelp() :
            this.fetchDiscounts()
                .catch((err: Error) => console.log(err.message));
    }
}
