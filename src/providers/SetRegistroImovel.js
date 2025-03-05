const { Console } = require("winston/lib/winston/transports");
const { SetEmolumento} = require('./SetEmolumento')

function SetRegistroImovel(data) {
    const emolumento = SetEmolumento(data.atosEmolumento)

    const date = new Date();
    const offset = -3; 
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
      .toISOString()
      .replace('Z', '-03:00');    
    const ato =
    `<?xml version="1.0"?>
<ns2:messageAtos version="3.0" numeroSelo="AAA39471"
    xmlns:ns2="http://www.tjal.jus.br/selo/XMLSchema" numeroSeloAnterior="AAA39470" flDut="false">
    <messageID>0</messageID>
    <messageDate>${localISO}</messageDate>
    <codigoServentia>${data.codigoServentia ?? 12}</codigoServentia>
    <atos>
        <ato xsi:type="ns2:RegistroImoveis"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <idAto>0</idAto>
            <codigoServentia>${data.ato.codigoServentia ?? 1}</codigoServentia>
            <dataAto>${localISO}</dataAto>
            <tipoAto>${data.ato.tipoAto ?? 5}</tipoAto>
            <valorEmolumento>${data.ato.valorEmolumento}</valorEmolumento>
            <valorAto>${data.ato.valorAto}</valorAto>
            <responsavel>${data.ato.responsavel ?? 1}</responsavel>
            <idAtos>0</idAtos>
            <selo>
                <tipoSelo>${data.ato.selo.tipoSelo}</tipoSelo>
                <numeroSerie>${data.ato.selo.numeroSerie}</numeroSerie>
                <validador>${data.ato.selo.validador}</validador>
            </selo>
            <retificador>false</retificador>
            <SubTipoAto> 158</SubTipoAto>
            <ValidadeAto>${data.ato.validadeAto}</ValidadeAto>
            <Registro>
                <numeroFicha>${data.ato.registro.numeroFicha}</numeroFicha>
                <dataRegistro>${data.ato.registro.dataRegistro ?? localISO}</dataRegistro>
            </Registro>
            <ClausulaGeral>${data.ato.clausulaGeral}</ClausulaGeral>
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
    SetRegistroImovel
};