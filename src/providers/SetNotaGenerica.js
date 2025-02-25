function SetNotaGenerica(data) {
    const date = new Date();
    const offset = -3;
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
        .toISOString()
        .replace('Z', '-03:00');

    const xml =
    `<?xml version="1.0"?>
<ns2:messageAtos version="3.0" numeroSelo="${data.numeroSelo ?? 'AAA38743'}" xmlns:ns2="http://www.tjal.jus.br/selo/XMLSchema" numeroSeloAnterior="" flDut="false">
    <messageID>${data.messageID ?? 0}</messageID>
    <messageDate>${data.messageDate ?? localISO}</messageDate>
    <codigoServentia>${data.codigoServentia ?? 12}</codigoServentia>
    <atos>
        <ato xsi:type="ns2:NotasGenerico" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <idAto>${data.ato.idAto ?? 0}</idAto>
            <codigoServentia>${data.ato.codigoServentia ?? 1}</codigoServentia>
            <dataAto>${data.ato.dataAto ?? '2022-10-27T00:00:00.000-03:00'}</dataAto>
            <tipoAto>${data.ato.tipoAto ?? 3}</tipoAto>
            <valorEmolumento>${data.ato.valorEmolumento ?? 22.43}</valorEmolumento>
            <valorAto>${data.ato.valorAto ?? 51.29}</valorAto>
            <responsavel>${data.ato.responsavel ?? 1}</responsavel>
            <idAtos>${data.ato.idAtos ?? 0}</idAtos>
            <selo>
                <tipoSelo>${data.ato.selo.tipoSelo ?? 47}</tipoSelo>
                <numeroSerie>${data.ato.selo.numeroSerie ?? 'AAA38743'}</numeroSerie>
                <validador>${data.ato.selo.validador ?? '2C7F'}</validador>
            </selo>
            <retificador>${data.ato.retificador ?? false}</retificador>
            <solicitante>
                <nomePessoa>${data.ato.solicitante.nomePessoa ?? 'MARIA BERNADETE DOS SANTOS'}</nomePessoa>
                <tipoPessoa>${data.ato.solicitante.tipoPessoa ?? 'Física'}</tipoPessoa>
                <documento>
                    <tipoDocumento>${data.ato.solicitante.documento.tipoDocumento ?? 8}</tipoDocumento>
                    <numero>${data.ato.solicitante.documento.numero ?? '59421274415'}</numero>
                </documento>
            </solicitante>
            <SubTipoAto>${data.ato.SubTipoAto ?? 42}</SubTipoAto>
            <ValidadeAto>${data.ato.ValidadeAto ?? 'N/A'}</ValidadeAto>
            <Protocolo>${data.ato.Protocolo ?? '47/2022'}</Protocolo>
            ${data.ato.partes.map(parte => `
            <Partes>
                <nomePessoa>${parte.nomePessoa ?? 'MARIA BERNADETE DOS SANTOS'}</nomePessoa>
                <tipoPessoa>${parte.tipoPessoa ?? 'Física'}</tipoPessoa>
                <documento>
                    <tipoDocumento>${parte.documento.tipoDocumento ?? 8}</tipoDocumento>
                    <numero>${parte.documento.numero ?? '59421274415'}</numero>
                </documento>
            </Partes>
            `).join('')}
            <Registro>
                <codigoLivro>${data.ato.registro.codigoLivro ?? 13}</codigoLivro>
                <paginaInicial>${data.ato.registro.paginaInicial ?? 152}</paginaInicial>
                <paginaFinal>${data.ato.registro.paginaFinal ?? 152}</paginaFinal>
                <dataRegistro>${data.ato.registro.dataRegistro ?? '2022-10-27-03:00'}</dataRegistro>
            </Registro>
            <ClausulaGeral>${data.ato.ClausulaGeral ?? 'S A I B A M quantos este P\u00FAblico Instrumento de Procura\u00E7\u00E3o'}</ClausulaGeral>
        </ato>
        ${data.atoEmolumento.map(emolumento => `
        <atoEmolumento>
            <id>${emolumento.id ?? 0}</id>
            <valor>${emolumento.valor ?? 22.43}</valor>
            <quantidade>${emolumento.quantidade ?? 1}</quantidade>
            <id_tipo_emolumento>${emolumento.id_tipo_emolumento ?? 79}</id_tipo_emolumento>
            <id_emolumento>${emolumento.id_emolumento ?? 64}</id_emolumento>
            <id_desconto>${emolumento.id_desconto ?? 0}</id_desconto>
            <id_ato>${emolumento.id_ato ?? 0}</id_ato>
        </atoEmolumento>
        `).join('')}
    </atos>
    <atosEmolumento>
        ${data.atosEmolumento.map(emolumento => `
        <atoEmolumento>
            <id>${emolumento.id ?? 0}</id>
            <valor>${emolumento.valor ?? 22.43}</valor>
            <quantidade>${emolumento.quantidade ?? 1}</quantidade>
            <id_tipo_emolumento>${emolumento.id_tipo_emolumento ?? 79}</id_tipo_emolumento>
            <id_emolumento>${emolumento.id_emolumento ?? 64}</id_emolumento>
            <id_desconto>${emolumento.id_desconto ?? 0}</id_desconto>
            <id_ato>${emolumento.id_ato ?? 0}</id_ato>
        </atoEmolumento>
        `).join('')}
    </atosEmolumento>
</ns2:messageAtos>`;

    return xml;
}

module.exports = {
    SetNotaGenerica
};
