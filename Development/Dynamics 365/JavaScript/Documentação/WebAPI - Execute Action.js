// Link: https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/online/execute

// Executar uma action com WebAPI 
function ExecuteAnActionWithWebAPI() {

    Xrm.Utility.showProgressIndicator("Executando a action...");
    
    var Id = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');
    
    var target = {};
    target.entityType = "table_name";
    target.id = Id;

    var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace('{','').replace('}','');

    var systemuser = {};
    systemuser.entityType = "systemuser";
    systemuser.id = userId;

    var field_name = FormContext.getAttribute("field_name").getValue();

    var req = {};
    req.entity = target; 
    req.systemuser = systemuser;
    req.field_name = field_name;

    req.getMetadata = function () {
        return {
            boundParameter: "entity",
            parameterTypes: {
                "entity": { 
                    typeName: "mscrm.table_name", 
                    structuralProperty: 5 
                },
                "systemuser": {
                    typeName: "mscrm.systemuser",
                    structuralProperty: 5
                },
                "storageid": {
                    typeName: "Edm.String",
                    structuralProperty: 1
                }
            },
            operationType: 0,
            operationName: "action_name"
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

// Executar uma action com javascript nativo
function ExecuteAnActionWithNativeJS() {
    var entity = {};
    entity.primaryid = "231f7ee2-8879-ed11-81ad-00224836fdb9";
    entity["@odata.type"] = "Microsoft.Dynamics.CRM.table_name";

    var parameters = {};
    parameters.param1 = entity;
    parameters.param2 = '1';

    var req = new XMLHttpRequest();
    req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/Action_Name", true);
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                console.log(results);
            } else {
                Xrm.Navigation.openErrorDialog({ message: this.response });
            }
        }
    };
    req.send(JSON.stringify(parameters));
}