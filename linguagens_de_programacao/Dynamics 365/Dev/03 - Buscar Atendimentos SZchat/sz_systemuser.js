if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var FormContext = null;
var input = null;

Fortics.Dyn365.SystemUser = {
    FormContext: null,

    OnLoad: function (executionContext) {

        // id do registro
        var IdUserForm = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');

        // id do usuario logado
        var userSettings = Xrm.Utility.getGlobalContext().userSettings
        var IdUser = userSettings.userId.replace('{', '').replace('}', '');
        
        if (IdUserForm == IdUser) {
            var formContext = executionContext.getFormContext();    
            formContext.getControl("frt_st_senha_agente_szchat").setVisible(true);
        }
    }
}
