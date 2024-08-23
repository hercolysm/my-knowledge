function RemoverCaracteresEspeciais (cnpj) {
    if (cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
    }
    return cnpj;
}