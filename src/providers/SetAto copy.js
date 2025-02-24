function setAto(data) {
    const date = new Date();
    const offset = -3; 
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
      .toISOString()
      .replace('Z', '-03:00');    const ato =
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<ns2:messageAtos version="3.0" numeroSelo="AAA00083" xmlns:ns2="http://www.tjal.jus.br/selo/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <messageID>0</messageID>
    <messageDate>${localISO}</messageDate>
    <codigoServentia>${data.codigoServentia ?? 24}</codigoServentia>
    <atos>
        <ato xsi:type="ns2:RegistroTitulosDocPJ">
            <idAto>0</idAto>
            <codigoServentia>${data.codigoServentia ?? 24}</codigoServentia>
            <dataAto>${localISO}</dataAto>
            <tipoAto>${data.tipoAto ?? 15}</tipoAto>
            <valorEmolumento>${data.valorEmolumento}</valorEmolumento>
            <valorAto>${data.valorAto}</valorAto>
            <responsavel>${data.responsavel}</responsavel>
            <id_imposto>12</id_imposto>
            <idAtos>0</idAtos>
            <selo>
                <tipoSelo>${data.tipoSelo}</tipoSelo>
                <numeroSerie>${data.numeroSerie}</numeroSerie>
                <validador>${data.validador}</validador>
            </selo>
            <retificador>false</retificador>
            <Recolhimentos>
                <nomeImposto>FUNJURIS</nomeImposto>
                <valorPago>${data.FUNJURIS.valorPago}</valorPago>
            </Recolhimentos>
            <Recolhimentos>
                <nomeImposto>FERC + ANOREG</nomeImposto>
                <valorPago>${data.FERC_ANOREG.valorPago}</valorPago>
            </Recolhimentos>
            <SubTipoAto>${data.SubTipoAto ?? 71}</SubTipoAto>
            <ValidadeAto>${data.SubTipoAto ?? 1}</ValidadeAto>
            <Protocolo>${data.Protocolo ?? 11}</Protocolo>
            <DocRegistrado>${data.Protocolo ?? 1}</DocRegistrado>
            <Registro>
                <codigoLivro>${data.codigoLivro ?? 1}1</codigoLivro>
                <paginaInicial>${data.paginaInicial ?? 1}1</paginaInicial>
                <paginaFinal>${data.paginaFinal ?? 1}1</paginaFinal>
                <dataRegistro>${data.dataRegistro}</dataRegistro>
            </Registro>
            <ClausulaGeral>1</ClausulaGeral>
        </ato>
    </atos>
</ns2:messageAtos>`;

}

module.exports = {
    setAto
};