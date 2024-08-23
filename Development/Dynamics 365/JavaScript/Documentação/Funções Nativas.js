// Funções Nativas do Dynamics 365

// Pernalização da ação ao clicar no botão de telefone (adicionar no onload do formulário)
if (top.MscrmControls.FieldControls.PhoneNumberControl) {

    top.MscrmControls.FieldControls.PhoneNumberControl.prototype.action = function () {
        return false;
    };
}

// Campo Lookup: Ordem de execução dos eventos
top.MscrmControls.FieldControls.SimpleLookupControl.prototype.init 
top.MscrmControls.FieldControls.SimpleLookupControl.prototype.updateView 
top.MscrmControls.FieldControls.SimpleLookupControl.prototype._updateComponentsManager 
top.MscrmControls.FieldControls.SimpleLookupControl.prototype._checkUpdatedParameters //(on hover)
top.MscrmControls.FieldControls.SimpleLookupControl.prototype.getOutputs //(on change)
top.MscrmControls.FieldControls.SimpleLookupControl.prototype.destroy //(ao clicar no link)
