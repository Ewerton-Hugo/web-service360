function normalizeName(name) {
    if (!name || typeof name !== 'string') {
        console.error("Valor inválido para name:", name);
        return ""; // Retorne um valor padrão ou lance um erro, dependendo do caso.
    }
    name = name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace("º", "")
        .replace(/\s+/g, "-")
        .toLowerCase();
    return name;
}

module.exports = {
    normalizeName
};
