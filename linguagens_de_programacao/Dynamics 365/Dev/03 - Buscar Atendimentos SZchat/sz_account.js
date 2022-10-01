if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var FormContext = null;

Fortics.Dyn365.Account = {
    FormContext: null,

    SearchAttendancesSZchatAccount: function (btn_parameter) {
        
        // Altera para a aba 'Atendimentos SZ.chat'
        Xrm.Page.ui.tabs.get("frt_atendimento_szchat").setFocus();

        var Id = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');
        var intervalo_consulta = btn_parameter;
        var data_inicio = null;
        var data_fim = null;

        if (intervalo_consulta == "personalizado") {
            data_inicio = Xrm.Page.getAttribute("frt_sz_data_inicio").getValue();
            data_fim = Xrm.Page.getAttribute("frt_sz_data_fim").getValue();

            if (data_inicio && data_fim) {
                
                // To calculate the time difference of two dates
                var Difference_In_Time = data_fim.getTime() - data_inicio.getTime();
                
                // To calculate the no. of days between two dates
                var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                
                if (Difference_In_Days < 0) {
                    Xrm.Navigation.openErrorDialog({ message: "A Data Inicio não pode ser maior que a Data Fim" });
                    return;
                }

                if (Difference_In_Days > 31) {
                    Xrm.Navigation.openErrorDialog({ message: "O intervalo máximo da busca é de 30 dias" });
                    return;
                }
            }
        }

        Xrm.Utility.showProgressIndicator("Consultando atendimentos no SZ.chat...");
        
        var target = {};
        target.entityType = "account";
        target.id = Id;

        var req = {};
        req.entity = target; 
        req.intervalo_consulta = intervalo_consulta;
        req.data_inicio = data_inicio;
        req.data_fim = data_fim;

        req.getMetadata = function () {
            return {
                boundParameter: "entity",
                parameterTypes: {
                    "entity": { 
                        typeName: "mscrm.account", 
                        structuralProperty: 5 
                    },
                    "intervalo_consulta": {
                        typeName: "Edm.String",
                        structuralProperty: 1
                    },
                    "data_inicio": {
                        typeName: "Edm.DateTimeOffset",
                        structuralProperty: 1
                    },
                    "data_fim": {
                        typeName: "Edm.DateTimeOffset",
                        structuralProperty: 1
                    }
                },
                operationType: 0,
                operationName: "frt_SearchAttendancesSZchat"
            };
        };
    
        Xrm.WebApi.online.execute(req).then( 
            function (data) { 
                var e = data; 
                debugger; 
                Xrm.Utility.closeProgressIndicator();
                // Atualiza a grid de atendimentos SZ.chat
                var lookupOptions = {};
                lookupOptions.entityType = "frt_atendimento_szchat";
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