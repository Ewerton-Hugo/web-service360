const { SetEmolumento} = require('./SetEmolumento')

function SetProtestoGenerico(data) {
    const emolumento = SetEmolumento(data.atosEmolumento)

    const date = new Date();
    const offset = -3;
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
        .toISOString()
        .replace('Z', '-03:00');

    const ato = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:messageAtos numeroSeloAnterior="" version="3.0" numeroSelo="AAA36202" xmlns:ns2="http://www.tjal.jus.br/selo/XMLSchema">
    <messageID>0</messageID>
    <messageDate>${localISO}</messageDate>
    <codigoServentia>${data.codigoServentia ?? 59}</codigoServentia>
    <atos>
        <ato xsi:type="ns2:ProtestoGenerico" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <idAto>0</idAto>
            <codigoServentia>${data.codigoServentia ?? 59}</codigoServentia>
            <dataAto>${localISO}</dataAto>
            <tipoAto>${data.atos.tipoAto ?? 7}</tipoAto>
            <valorEmolumento>${data.atos.valorEmolumento}</valorEmolumento>
            <valorAto>${data.atos.valorAto}</valorAto>
            <responsavel>${data.atos.responsavel ?? 436}</responsavel>
            <id_imposto>${data.atos.id_imposto ?? 12}</id_imposto>
            <idAtos>0</idAtos>
            <selo>
                <tipoSelo>${data.atos.selo.tipoSelo}</tipoSelo>
                <numeroSerie>${data.atos.selo.numeroSerie}</numeroSerie>
                <validador>${data.atos.selo.validador}</validador>
            </selo>
            <retificador>false</retificador>
            <solicitante>
                <nomePessoa>${data.atos.solicitante.nomePessoa}</nomePessoa>
                <tipoPessoa>${data.atos.solicitante.tipoPessoa}</tipoPessoa>
                <documento>
                    <tipoDocumento>${data.atos.solicitante.documento.tipoDocumento}</tipoDocumento>
                    <numero>${data.atos.solicitante.documento.numero}</numero>
                </documento>
            </solicitante>
            <SubTipoAto>${data.atos.subTipoAto ?? 53}</SubTipoAto>
            <ValidadeAto>${data.atos.validadeAto ?? 7}</ValidadeAto>
            <Protocolo>${data.atos.protocolo ?? 1}</Protocolo>
            <apontamento>
                <motivoProtesto>${data.atos.apontamento.motivoProtesto}</motivoProtesto>
                <apresentante>
                    <nomePessoa>${data.atos.apontamento.apresentante.nomePessoa}</nomePessoa>
                    <tipoPessoa>${data.atos.apontamento.apresentante.tipoPessoa}</tipoPessoa>
                    <documento>
                        <tipoDocumento>${data.atos.apontamento.apresentante.documento.tipoDocumento}</tipoDocumento>
                        <numero>${data.atos.apontamento.apresentante.documento.numero}</numero>
                    </documento>
                </apresentante>
                <tituloCredito>
                    <tipoTitulo>${data.atos.apontamento.tituloCredito.tipoTitulo}</tipoTitulo>
                    <valorProtestado>${data.atos.apontamento.tituloCredito.valorProtestado}</valorProtestado>
                    <credor>
                        <nomePessoa>${data.atos.apontamento.tituloCredito.credor.nomePessoa}</nomePessoa>
                        <tipoPessoa>${data.atos.apontamento.tituloCredito.credor.tipoPessoa}</tipoPessoa>
                        <documento>
                            <tipoDocumento>${data.atos.apontamento.tituloCredito.credor.documento.tipoDocumento}</tipoDocumento>
                            <numero>${data.atos.apontamento.tituloCredito.credor.documento.numero}</numero>
                        </documento>
                    </credor>
                    <devedor>
                        <nomePessoa>${data.atos.apontamento.tituloCredito.devedor.nomePessoa}</nomePessoa>
                        <tipoPessoa>${data.atos.apontamento.tituloCredito.devedor.tipoPessoa}</tipoPessoa>
                        <documento>
                            <tipoDocumento>${data.atos.apontamento.tituloCredito.devedor.documento.tipoDocumento}</tipoDocumento>
                            <numero>${data.atos.apontamento.tituloCredito.devedor.documento.numero}</numero>
                        </documento>
                    </devedor>
                </tituloCredito>
            </apontamento>
            <registro>
                <codigoLivro>${data.atos.registro.codigoLivro ?? 1}</codigoLivro>
                <paginaInicial>${data.atos.registro.paginaInicial ?? 1}</paginaInicial>
                <paginaFinal>${data.atos.registro.paginaFinal ?? 1}</paginaFinal>
                <dataRegistro>${data.atos.registro.dataRegistro ?? localISO}</dataRegistro>
            </registro>
            <EncaminhadoPeloDistribuidor>false</EncaminhadoPeloDistribuidor>
        </ato>
        ${emolumento}
    </atos>
        
    
    <atosEmolumento>
        ${emolumento}

    </atosEmolumento>
</ns2:messageAtos>`;

    return ato;
}

module.exports = {
    SetProtestoGenerico,
};
