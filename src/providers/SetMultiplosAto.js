const { Console } = require("winston/lib/winston/transports");

function SetMultiplosAto(data) {
    console.log('EEEEEEEEEEEE')
    console.log('data', data)
    const date = new Date();
    const offset = -3; 
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
      .toISOString()
      .replace('Z', '-03:00');

    // Gerar o XML
    const ato = `
<ns2:messageAtos version="${data.version}" numeroSelo="${data.numeroSelo}" xmlns:ns2="${data["xmlns:ns2"]}" xmlns:xsi="${data["xmlns:xsi"]}">
    <messageID>${data.messageID}</messageID>
    <messageDate>${data.messageDate}</messageDate>
    <codigoServentia>111</codigoServentia>
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

        <atoEmolumento>
            <id>0</id>
            <valor>99.21</valor>
            <quantidade>1</quantidade>
            <id_tipo_emolumento>73</id_tipo_emolumento>
            <id_emolumento>123</id_emolumento>
            <id_desconto>0</id_desconto>
            <id_ato>0</id_ato>
        </atoEmolumento>
        `).join('')}
    </atos>
    <atosEmolumento>
            <atoEmolumento>
                <id>0</id>
                <valor>198,42</valor>
                <quantidade>1</quantidade>
                <id_tipo_emolumento>73</id_tipo_emolumento>
                <id_emolumento>123</id_emolumento>
                <id_desconto>0</id_desconto>
                <id_ato>0</id_ato>
            </atoEmolumento>
       
    </atosEmolumento>
</ns2:messageAtos>`;

    return ato;
}

module.exports = {
    SetMultiplosAto
};
