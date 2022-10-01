if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var FormContext = null;

Fortics.Dyn365.AtendimentoSZchat = {
    FormContext: null,

    OnLoad: function (executionContext) {
        Fortics.Dyn365.AtendimentoSZchat.SearchMessagesAttendanceSZchat();
    },
    SearchMessagesAttendanceSZchat: function() {

        Xrm.Utility.showProgressIndicator("Consultando mensagens do atendimento...");

        var Id = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');
        
        var target = {};
        target.entityType = "frt_atendimento_szchat";
        target.id = Id;

        var req = {};
        req.entity = target; 

        req.getMetadata = function () {
            return {
                boundParameter: "entity",
                parameterTypes: {
                    "entity": { 
                        typeName: "mscrm.frt_atendimento_szchat", 
                        structuralProperty: 5 
                    }
                },
                operationType: 0,
                operationName: "frt_SearchMessagesAttendanceSZchat"
            };
        };
    
        Xrm.WebApi.online.execute(req).then( 
            function (data) { 
                var e = data; 
                debugger; 
                Xrm.Utility.closeProgressIndicator();
                // Atualiza a grid de atendimentos SZ.chat
                var lookupOptions = {};
                lookupOptions.entityType = "frt_mensagem_szchat";
                Xrm.Utility.refreshParentGrid(lookupOptions);
            }, 
            function (error) { 
                debugger; 
                var errMsg = error.message; 
                Xrm.Navigation.openErrorDialog({ message: errMsg });
                Xrm.Utility.closeProgressIndicator();
            }
        );
    }
}