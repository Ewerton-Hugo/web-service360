const { Console } = require("winston/lib/winston/transports");

function SetReconhecimentoFirma(data) {
    console.log('EEEEEEEEEEEE', data)
    const date = new Date();
    const offset = -3; 
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
      .toISOString()
      .replace('Z', '-03:00');

    // Gerar o XML
    const reconhecimento = `
<ns2:messageAtos version="3.0"  
    numeroSelo="AAA39471"
    xmlns:ns2="http://www.tjal.jus.br/selo/XMLSchema" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    numeroSeloAnterior="AAA39470" flDut="false">
    
    <messageID>${data.messageID}</messageID>
    <messageDate>${data.messageDate}</messageDate>
    <codigoServentia>111</codigoServentia>

    <atos>
        ${data.atos.map(ato => `
        <ato xsi:type="ns2:ReconhecimentoFirma">
            <idAto>${ato.idAto}</idAto>
            <codigoServentia>${ato.codigoServentia ?? 1}</codigoServentia>
            <dataAto>${ato.dataAto}</dataAto>
            <tipoAto>${ato.tipoAto ?? 5}</tipoAto>
            <valorEmolumento>${ato.valorEmolumento}</valorEmolumento>
            <valorAto>${ato.valorAto}</valorAto>
            <responsavel>${ato.responsavel ?? 1}</responsavel>
            <id_imposto>${ato.id_imposto}</id_imposto>
            <idAtos>${ato.idAtos}</idAtos>
            <selo>
                <tipoSelo>${ato.tipoSelo}</tipoSelo>
                <numeroSerie>${ato.numeroSerie}</numeroSerie>
            </selo>
            <retificador>${ato.retificador}</retificador>
            <solicitante>
                <nomePessoa>${ato.solicitante.nomePessoa}</nomePessoa>
                <tipoPessoa>${ato.solicitante.tipoPessoa}</tipoPessoa>
                <documento>
                    <tipoDocumento>${ato.solicitante.tipoDocumento}</tipoDocumento>
                    <numero>${ato.solicitante.numero}</numero>
                </documento>
            </solicitante>
            <signatario>
                <nomePessoa>${ato.signatario.nomePessoa}</nomePessoa>
                <tipoPessoa>${ato.signatario.tipoPessoa}</tipoPessoa>
                <documento>
                    <tipoDocumento>${ato.signatario.tipoDocumento}</tipoDocumento>
                    <numero>${ato.signatario.numero}</numero>
                </documento>
            </signatario>
            <descricaoDocto>${ato.descricaoDocto ?? 2}</descricaoDocto>
            <tipoReconhecimento>${ato.tipoReconhecimento ?? 82}</tipoReconhecimento>
            
        </ato>
        <atoEmolumento>
            <id>0</id>
            <valor>${data.atoEmolumento[0].valor}</valor>
            <quantidade>${data.atoEmolumento[0].quantidade}</quantidade>
            <id_tipo_emolumento>${data.atoEmolumento[0].id_tipo_emolumento}</id_tipo_emolumento>
            <id_emolumento>${data.atoEmolumento[0].id_emolumento}</id_emolumento>
            <id_desconto>${data.atoEmolumento[0].id_desconto}</id_desconto>
            <id_ato>${data.atoEmolumento[0].id_ato}</id_ato>
        </atoEmolumento>

        
        `).join('')}
    </atos>
    <atosEmolumento>
        ${data.atoEmolumento.map(atoEmolumento => `
        <atoEmolumento>
            <id>0</id>
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

    return reconhecimento;
}

module.exports = {
    SetReconhecimentoFirma
};
