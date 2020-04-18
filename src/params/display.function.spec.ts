import ArgParser from "./arg-parser";

const prdResponseSample = {
    fabricante: 178,
    produto: 'Kaspersky Small Office Security 6 Multidispositivos 5 PCs + 5 Mobile + 1 Server - Digital para Download',
    oferta_codigo: 95033,
    ordem_listagem: 0,
    quantidade: 187,
    dep_nome: 'Computadores',
    data_acab: 0,
    sec_nome: 'Softwares',
    dep: '04',
    vlr_normal: '420.95',
    sec_amigavel: 'softwares',
    tmp_avaliacao_numero: 1,
    tmp_ranking: 368,
    sec: '504',
    data_ini: 1587121200,
    tmp_avaliacao_nota: 5,
    destaque_listagem: false,
    codigo: 100808,
    imagem: 'https://images8.kabum.com.br/produtos/fotos/100808/100808_1552071733_index_m.jpg',
    dep_amigavel: 'computadores',
    desconto: 62,
    oferta_quantidade_vendida: 13,
    data_fim: 1588276800,
    vlr_oferta: 149.9005
};

it('should correctly reduce and stringify product with default display function',
    () => {
        const defaultDisplay = new ArgParser(process.argv).getDisplay();

        const reducer = defaultDisplay.func;
        const stringify = defaultDisplay.stringify;

        expect(stringify(reducer(prdResponseSample))).toBeTruthy();
    }
)
