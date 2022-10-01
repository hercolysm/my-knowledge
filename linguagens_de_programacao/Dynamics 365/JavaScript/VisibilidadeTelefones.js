if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.VisibilidadeTelefones = {
    //Sempre mostrar o primeiro telefone
    //Sempre mostrar os telefones que estÃ£o preenchidos
    //Se o telefone 2 estiver vazio, mostrar somente se o primeiro estiver preenchido
    //Se o telefone 3 estiver vazio, mostrar somente se o telefone 1 e 2 estiverem preenchidos
    
    OcultarMostrarTelefones: function (FormContext, telefones) {
        //Telefones celulares
        FormContext.getControl(telefones.campoTelefoneUm).setVisible(true);
        FormContext.getControl(telefones.campoTelefoneDois).setVisible(false);
        FormContext.getControl(telefones.campoTelefoneTres).setVisible(false);

        var valorTelefoneUm = FormContext.getAttribute(telefones.campoTelefoneUm).getValue();
        var valorTelefoneDois = FormContext.getAttribute(telefones.campoTelefoneDois).getValue();
        var valorTelefoneTres = FormContext.getAttribute(telefones.campoTelefoneTres).getValue();

        if (valorTelefoneDois != null && valorTelefoneDois != "")
            FormContext.getControl(telefones.campoTelefoneDois).setVisible(true);
        else if (valorTelefoneUm != null && valorTelefoneUm != "")
            FormContext.getControl(telefones.campoTelefoneDois).setVisible(true);
        else
            FormContext.getControl(telefones.campoTelefoneDois).setVisible(false);

        if (valorTelefoneTres != null && valorTelefoneTres != "")
            FormContext.getControl(telefones.campoTelefoneTres).setVisible(true);
        else if (valorTelefoneUm != null && valorTelefoneUm != "" && valorTelefoneDois != null && valorTelefoneDois != "")
            FormContext.getControl(telefones.campoTelefoneTres).setVisible(true);
        else
            FormContext.getControl(telefones.campoTelefoneTres).setVisible(false);
    }
    
}