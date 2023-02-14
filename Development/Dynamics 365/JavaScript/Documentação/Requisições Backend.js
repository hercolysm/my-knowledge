// Executar uma action com javascript
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
