if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var FormContext = null;

Fortics.Dyn365.MensagemSZchat = {
    FormContext: null,

    OnLoad: function (executionContext) {
        FormContext = executionContext.getFormContext();    
        
        var tipo = FormContext.getAttribute("frt_tipo").getValue();

        switch(tipo) {
            case 'files':
            case 'images':
            case 'sounds':
            case 'videos':
                Fortics.Dyn365.MensagemSZchat.GetStorageSZchat();
        }

    },
    GetStorageSZchat: function() {

        Xrm.Utility.showProgressIndicator("Consultando a mídia...");
        
        var Id = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');
        
        var target = {};
        target.entityType = "frt_mensagem_szchat";
        target.id = Id;

        /*var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace('{','').replace('}','');

        var systemuser = {};
        systemuser.entityType = "systemuser";
        systemuser.id = userId;*/

        var storageid = FormContext.getAttribute("frt_storage_id").getValue();

        var req = {};
        req.entity = target; 
        //req.systemuser = systemuser;
        req.storageid = storageid;

        req.getMetadata = function () {
            return {
                boundParameter: "entity",
                parameterTypes: {
                    "entity": { 
                        typeName: "mscrm.frt_mensagem_szchat", 
                        structuralProperty: 5 
                    },
                    /*"systemuser": {
                        typeName: "mscrm.systemuser",
                        structuralProperty: 5
                    },*/
                    "storageid": {
                        typeName: "Edm.String",
                        structuralProperty: 1
                    }
                },
                operationType: 0,
                operationName: "frt_GetStorageSZchat"
            };
        };
    
        Xrm.WebApi.online.execute(req).then( 
            function (data) { 
                var e = data; 
                console.log(data);

                data.json().then(function(Response){

                    // In the Response.OutputParameterName you will get your out put value
                    console.log(Response);

                });

                debugger; 
                Xrm.Utility.closeProgressIndicator();
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