if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.SetLookUpFilter = {
    EmpresaId: null,

    FilterContact: function (executionContext) {
        debugger;
        formContext = SDKore.GetFormContext(executionContext);
        if (EmpresaId == null || EmpresaId == "")
            return;

        EmpresaId = EmpresaId.replace("{", "").replace("}", "");

        var condictionEmpresaParceira = "";
        var empresaParceiraId = null;

        var entityName = formContext.data.entity.getEntityName();
        if (entityName == "account") {
            var empresaParceira = formContext.getAttribute("frt_empresa_parceira").getValue();
            if (empresaParceira != null)
                empresaParceiraId = empresaParceira[0].id.replace("{", "").replace("}", "");
        }
        else {
            var req = new XMLHttpRequest();
            req.open("GET", formContext.context.getClientUrl() + "/api/data/v9.1/accounts(" + EmpresaId + ")?$select=_frt_empresa_parceira_value", false);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var result = JSON.parse(this.response);
                        empresaParceiraId = result["_frt_empresa_parceira_value"];
                    } else {
                        Xrm.Utility.alertDialog(this.statusText);
                    }
                }
            };
            req.send();
        }

        if (empresaParceiraId != null)
            condictionEmpresaParceira = "<condition attribute='parentcustomerid' operator='eq' uitype='account' value='" + empresaParceiraId + "' />";

        var contactFilter =
            "<filter type='or'> " +
            "<condition attribute='parentcustomerid' operator='eq' uitype='account' value='" + EmpresaId + "' />" +
            condictionEmpresaParceira +
            "</filter> ";

        var campoContato = executionContext.getEventSource()._controlName;
        formContext.getControl(campoContato).addCustomFilter(contactFilter);

    },
    SetContactFilter: function (formContext, empresaId, campoContato) {
        EmpresaId = empresaId;

        if (EmpresaId == null)
            formContext.getControl(campoContato).removePreSearch(Fortics.Dyn365.SetLookUpFilter.FilterContact);
        else
            formContext.getControl(campoContato).addPreSearch(Fortics.Dyn365.SetLookUpFilter.FilterContact);
    },
}