const { SetEmolumento} = require('./SetEmolumento')

function SetNascimento(data) {
    const emolumento = SetEmolumento(data.atosEmolumento)

    console.log(data);
    const date = new Date();
    const offset = -3;
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
        .toISOString()
        .replace('Z', '-03:00');

    const xml =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:messageAtos numeroSeloAnterior="" flWebcartorio="true" version="3.0" numeroSelo="${data.numeroSelo ?? 'AAA15794'}" xmlns:ns2="http://www.tjal.jus.br/selo/XMLSchema">
    <messageID>${data.messageID ?? 0}</messageID>
    <messageDate>${data.messageDate ?? localISO}</messageDate>
    <codigoServentia>${data.codigoServentia ?? 59}</codigoServentia>
    <atos>
        <ato xsi:type="ns2:NascimentoNatimortoObito" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <idAto>${data.ato.idAto ?? 0}</idAto>
            <codigoServentia>${data.ato.codigoServentia ?? 59}</codigoServentia>
            <dataAto>${data.ato.dataAto ?? '2021-09-09T00:00:00.000-03:00'}</dataAto>
            <tipoAto>${data.ato.tipoAto ?? 19}</tipoAto>
            <valorEmolumento>${data.ato.valorEmolumento ?? 4.3}</valorEmolumento>
            <valorAto>${data.ato.valorAto ?? 4.3}</valorAto>
            <responsavel>${data.ato.responsavel ?? 461}</responsavel>
            <id_imposto>${data.ato.id_imposto ?? 12}</id_imposto>
            <idAtos>${data.ato.idAtos ?? 0}</idAtos>
            <selo>
                <tipoSelo>${data.ato.selo.tipoSelo ?? 44}</tipoSelo>
                <numeroSerie>${data.ato.selo.numeroSerie ?? 'AAA15794'}</numeroSerie>
                <validador>${data.ato.selo.validador ?? 'HMGF'}</validador>
            </selo>
            <retificador>${data.ato.retificador ?? false}</retificador>
            ${data.ato.recolhimentos.map(recolhimento => `
            <Recolhimentos>
                <nomeImposto>${recolhimento.nomeImposto ?? 'FUNJURIS'}</nomeImposto>
                <valorPago>${recolhimento.valorPago ?? 0}</valorPago>
            </Recolhimentos>
            `).join('')}
            <solicitante>
                <nomePessoa>${data.ato.solicitante.nomePessoa ?? 'PEDRO DA SILVA'}</nomePessoa>
                <tipoPessoa>${data.ato.solicitante.tipoPessoa ?? 'Física'}</tipoPessoa>
                <documento>
                    <tipoDocumento>${data.ato.solicitante.documento.tipoDocumento ?? 8}</tipoDocumento>
                    <numero>${data.ato.solicitante.documento.numero ?? '18203017029'}</numero>
                </documento>
            </solicitante>
            <SubTipoAto>98</SubTipoAto>
            <Protocolo>${data.ato.Protocolo ?? 1}</Protocolo>
            ${data.ato.partes.map(parte => `
            <Partes>
                <nomePessoa>${parte.nomePessoa ?? 'MARIA DA SILVA'}</nomePessoa>
                <tipoPessoa>${parte.tipoPessoa ?? 'Física'}</tipoPessoa>
                <documento>
                    <tipoDocumento>${parte.documento.tipoDocumento ?? 8}</tipoDocumento>
                    <numero>${parte.documento.numero ?? '54961163090'}</numero>
                </documento>
            </Partes>
            `).join('')}
            <Data>${data.ato.Data ?? 1}</Data>
            <Local>${data.ato.Local ?? 1}</Local>
            <NumeroDNVDO>${data.ato.NumeroDNVDO ?? 1}</NumeroDNVDO>
            <Sexo>${data.ato.Sexo ?? 'Indefinido'}</Sexo>
            <Registro>
                <codigoLivro>${data.ato.registro.codigoLivro ?? 1}</codigoLivro>
                <paginaInicial>${data.ato.registro.paginaInicial ?? 1}</paginaInicial>
                <paginaFinal>${data.ato.registro.paginaFinal ?? 1}</paginaFinal>
                <dataRegistro>${data.ato.registro.dataRegistro ?? '2021-09-09-03:00'}</dataRegistro>
            </Registro>
            <ClausulaGeral>${data.ato.ClausulaGeral ?? 'TESTE'}</ClausulaGeral>
        </ato>
        ${emolumento}

    </atos>
    <atosEmolumento>
        ${emolumento}

    </atosEmolumento>
</ns2:messageAtos>`;

    return xml;
}

module.exports = {
    SetNascimento
};
