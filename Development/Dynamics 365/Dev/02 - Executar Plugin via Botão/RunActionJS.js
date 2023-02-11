function RunAction() {
 
    var Id = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');
    
    var target = {};
    target.entityType = "account";
    target.id = Id;

    var req = {};
    req.entity = target; 

    req.getMetadata = function () {
        return {
            boundParameter: "entity",
            parameterTypes: {
                "entity": { 
                    typeName: "mscrm.account", 
                    structuralProperty: 5 
                }
            },
            operationType: 0,
            operationName: "new_PrimeiraAcao"
        };
    };
 
    Xrm.WebApi.online.execute(req).then( 
        function (data) { 
            var e = data; 
            debugger; 
        }, 
        function (error) { 
            debugger; 
            var errMsg = error.message; 
        }
    );
}
