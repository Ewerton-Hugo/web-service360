function SetEmolumento(data) {
    return data
        .map(
            (emolumento) => `
        <atoEmolumento>
            <id>${emolumento.id ?? 0}</id>
            <valor>${emolumento.valor}</valor>
            <quantidade>${emolumento.quantidade}</quantidade>
            <id_tipo_emolumento>${emolumento.id_tipo_emolumento ?? 84}</id_tipo_emolumento>
            <id_emolumento>${emolumento.id_emolumento ?? 691}</id_emolumento>
            <id_desconto>${emolumento.id_desconto ?? 0}</id_desconto>
            <id_ato>${emolumento.id_ato ?? 0}</id_ato>
            <id_ato_multiplo>${emolumento.id_ato_multiplo ?? 0}</id_ato_multiplo>
        </atoEmolumento>`
        )
        .join('');
}

module.exports = { SetEmolumento };
