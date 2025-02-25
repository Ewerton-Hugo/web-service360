function SetNotasEscrituratias(data) {
    const date = new Date();
    const offset = -3;
    const localISO = new Date(date.getTime() + offset * 60 * 60 * 1000)
        .toISOString()
        .replace('Z', '-03:00');

    const xml = `
<ns2:messageAtos version="3.0" numeroSelo="${data.numeroSelo ?? 'AAA39168'}" xmlns:ns2="http://www.tjal.jus.br/selo/XMLSchema" numeroSeloAnterior="" flDut="false">
    <messageID>${data.messageID ?? 0}</messageID>
    <messageDate>${data.messageDate ?? localISO}</messageDate>
    <codigoServentia>${data.codigoServentia ?? 12}</codigoServentia>
    <atos>
        <ato xsi:type="ns2:NotasEscrituras" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <idAto>${data.ato.idAto ?? 0}</idAto>
            <codigoServentia>${data.ato.codigoServentia ?? 1}</codigoServentia>
            <dataAto>${data.ato.dataAto ?? '2023-05-17T00:00:00.000-03:00'}</dataAto>
            <tipoAto>${data.ato.tipoAto ?? 2}</tipoAto>
            <valorEmolumento>${data.ato.valorEmolumento ?? 0}</valorEmolumento>
            <valorAto>${data.ato.valorAto ?? 28.86}</valorAto>
            <responsavel>${data.ato.responsavel ?? 1}</responsavel>
            <idAtos>${data.ato.idAtos ?? 0}</idAtos>
            <selo>
                <tipoSelo>${data.ato.selo.tipoSelo ?? 47}</tipoSelo>
                <numeroSerie>${data.ato.selo.numeroSerie ?? 'AAA39168'}</numeroSerie>
                <validador>${data.ato.selo.validador ?? '5Q2P'}</validador>
            </selo>
            <retificador>${data.ato.retificador ?? false}</retificador>
            <solicitante>
                <nomePessoa>${data.ato.solicitante.nomePessoa ?? 'teste'}</nomePessoa>
                <tipoPessoa>${data.ato.solicitante.tipoPessoa ?? 'Física'}</tipoPessoa>
                <documento>
                    <tipoDocumento>${data.ato.solicitante.documento.tipoDocumento ?? 8}</tipoDocumento>
                    <numero>${data.ato.solicitante.documento.numero ?? '77497892002'}</numero>
                </documento>
            </solicitante>
            <SubTipoAto>${data.ato.SubTipoAto ?? 124}</SubTipoAto>
            <ValidadeAto>${data.ato.ValidadeAto ?? 'N/A'}</ValidadeAto>
            <Protocolo>${data.ato.Protocolo ?? '54/2023'}</Protocolo>
            <Partes>
                <nomePessoa>${data.ato.partes.nomePessoa ?? 'NÃO INFORMADO'}</nomePessoa>
                <tipoPessoa>${data.ato.partes.tipoPessoa ?? 'Física'}</tipoPessoa>
                <documento>
                    <tipoDocumento>${data.ato.partes.documento.tipoDocumento ?? 23}</tipoDocumento>
                    <numero>${data.ato.partes.documento.numero ?? 'NÃO INFORMADO'}</numero>
                </documento>
            </Partes>
            <Registro>
                <codigoLivro>${data.ato.registro.codigoLivro ?? 1}</codigoLivro>
                <paginaInicial>${data.ato.registro.paginaInicial ?? 48}</paginaInicial>
                <paginaFinal>${data.ato.registro.paginaFinal ?? 48}</paginaFinal>
                <dataRegistro>${data.ato.registro.dataRegistro ?? '2023-04-01-03:00'}</dataRegistro>
            </Registro>
            <ObjetoNegocio>
                <tipoObjeto>${data.ato.objetoNegocio.tipoObjeto ?? 'Escritura sem valor declarado'}</tipoObjeto>
                <especificacao>${data.ato.objetoNegocio.especificacao ?? 'TRATA-SE de Escritura Pública de Compra e Venda lavrada em Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula nisi ut lorem elementum, a aliquam felis malesuada. Integer varius, sapien at efficitur efficitur, purus ligula pharetra magna, at tincidunt lacus turpis vitae ipsum. Suspendisse potenti. Nam vitae nisi vel augue tincidunt feugiat. Proin id nulla at lorem fringilla scelerisque. Donec ac lectus sed justo suscipit venenatis non nec eros. Praesent ac massa nec nisl consequat consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula nisi ut lorem elementum, a aliquam felis malesuada. Integer varius, sapien at efficitur efficitur, purus ligula pharetra magna, at tincidunt lacus turpis vitae ipsum. Suspendisse potenti. Nam vitae nisi vel augue tincidunt feugiat. Proin id nulla at lorem fringilla scelerisque. Donec ac lectus sed justo suscipit venenatis non nec eros. Praesent ac massa nec nisl consequat consectetur.'}</especificacao>
                <caracteristicas>${data.ato.objetoNegocio.caracteristicas ?? ''}</caracteristicas>
                <valorObjeto>${data.ato.objetoNegocio.valorObjeto ?? 0}</valorObjeto>
            </ObjetoNegocio>
        </ato>
    </atos>
    <atosEmolumento>
        <id>${data.emolumento.id ?? 0}</id>
        <valor>${data.emolumento.valor ?? 0}</valor>
        <quantidade>${data.emolumento.quantidade ?? 1}</quantidade>
        <id_tipo_emolumento>${data.emolumento.id_tipo_emolumento ?? 92}</id_tipo_emolumento>
        <id_emolumento>${data.emolumento.id_emolumento ?? 853}</id_emolumento>
        <id_desconto>${data.emolumento.id_desconto ?? 0}</id_desconto>
        <id_ato>${data.emolumento.id_ato ?? 0}</id_ato>
    </atosEmolumento>
</ns2:messageAtos>`;

    return xml;
}

module.exports = {
    SetNotasEscrituratias
};
