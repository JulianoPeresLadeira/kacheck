import Kacheck from "./kacheck";

let defaultArgs = process.argv.concat([]);

const defaultTestConfigs = {
    "minDiscount": 25,
    "getProductEndpoint": "https://b2lq2jmc06.execute-api.us-east-1.amazonaws.com/PROD/ofertas",
    "getProductParams": "app=1&limite=2000000&pagina=1",
    "getDiscountEndpoint": "https://www.kabum.com.br/ofertas_home.json"
};

beforeEach(
    () => {
        process.argv = defaultArgs
    }
);

it('should print help information',
    () => {
        process.argv = process.argv.concat(['-h']);
        let kacheck = new Kacheck(defaultTestConfigs);

        let printHelpFn = Kacheck.prototype.printHelp = jest.fn();

        kacheck.process();
        expect(printHelpFn).toHaveBeenCalled();
    }
)
