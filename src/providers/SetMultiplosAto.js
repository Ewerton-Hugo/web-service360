const { Console } = require("winston/lib/winston/transports");

function SetMultiplosAto(data) {
    console.log('wwww', data)
    const date = new Date();
    const offset = -3; 
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
      .toISOString()
      .replace('Z', '-03:00');

    // Gerar o XML
    const ato = `
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:messageAtos version="${data.xmlData.version}" numeroSelo="${data.xmlData.numeroSelo}" xmlns:ns2="${data.xmlData["xmlns:ns2"]}" xmlns:xsi="${data.xmlData["xmlns:xsi"]}">
    <messageID>${data.xmlData.messageID}</messageID>
    <messageDate>${data.xmlData.messageDate}</messageDate>
    <atos>
        ${data.atos.map(ato => `
        <ato xsi:type="ns2:RegistroTitulosDocPJ">
            <idAto>${ato.idAto}</idAto>
            <codigoServentia>${ato.codigoServentia}</codigoServentia>
            <dataAto>${ato.dataAto}</dataAto>
            <tipoAto>${ato.tipoAto}</tipoAto>
            <valorEmolumento>${ato.valorEmolumento}</valorEmolumento>
            <valorAto>${ato.valorAto}</valorAto>
            <responsavel>${ato.responsavel}</responsavel>
            <id_imposto>${ato.id_imposto}</id_imposto>
            <idAtos>${ato.idAtos}</idAtos>
            <selo>
                <tipoSelo>${ato.tipoSelo}</tipoSelo>
                <numeroSerie>${ato.numeroSerie}</numeroSerie>
                <validador>${ato.validador}</validador>
            </selo>
            <retificador>${ato.retificador}</retificador>
            <Recolhimentos>
                <nomeImposto>FUNJURIS</nomeImposto>
                <valorPago>${ato.FUNJURIS.valorPago}</valorPago>
            </Recolhimentos>
            <Recolhimentos>
                <nomeImposto>FERC + ANOREG</nomeImposto>
                <valorPago>${ato.FERC_ANOREG.valorPago}</valorPago>
            </Recolhimentos>
            <SubTipoAto>${ato.SubTipoAto}</SubTipoAto>
            <ValidadeAto>${ato.ValidadeAto}</ValidadeAto>
            <Protocolo>${ato.Protocolo}</Protocolo>
            <DocRegistrado>${ato.DocRegistrado}</DocRegistrado>
            <Registro>
                <codigoLivro>${ato.codigoLivro}</codigoLivro>
                <paginaInicial>${ato.paginaInicial}</paginaInicial>
                <paginaFinal>${ato.paginaFinal}</paginaFinal>
                <dataRegistro>${ato.dataRegistro}</dataRegistro>
            </Registro>
            <ClausulaGeral>${ato.ClausulaGeral}</ClausulaGeral>
        </ato>
        `).join('')}
    </atos>
    <atosEmolumento>
        ${data.xmlData.atoEmolumento.map(atoEmolumento => `
        <atoEmolumento>
            <id>${atoEmolumento.id}</id>
            <valor>${atoEmolumento.valor}</valor>
            <quantidade>${atoEmolumento.quantidade}</quantidade>
            <id_tipo_emolumento>${atoEmolumento.id_tipo_emolumento}</id_tipo_emolumento>
            <id_emolumento>${atoEmolumento.id_emolumento}</id_emolumento>
            <id_desconto>${atoEmolumento.id_desconto}</id_desconto>
            <id_ato>${atoEmolumento.id_ato}</id_ato>
        </atoEmolumento>
        `).join('')}
    </atosEmolumento>
</ns2:messageAtos>`;

    return ato;
}

module.exports = {
    SetMultiplosAto
};
