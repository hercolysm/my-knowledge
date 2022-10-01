if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var formContext = null;

Fortics.Dyn365.ExecutarActions = {

    CriarCampanhaWhatsApp: function (entityName, listIds, fetchXml) {
        Xrm.Utility.showProgressIndicator("Aguarde enquanto a campanha Ã© criada");

        var parameters = {};
        parameters.entityName = entityName;
        parameters.listIds = listIds;
        parameters.fetchXml = fetchXml;

        var req = new XMLHttpRequest();
        req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/frt_criar_campanha_whatsapp", true);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {

                    var result = JSON.parse(this.response);
                    let entityFormOptions = {
                        entityName: "frt_campanha_whatsapp",
                        entityId: result.campanhaWhatsAppId
                    };

                    Xrm.Navigation.openForm(entityFormOptions);
                }
                else
                    Xrm.Navigation.openErrorDialog({ message: this.response });
                Xrm.Utility.closeProgressIndicator();
            }
        };
        req.send(JSON.stringify(parameters));
    }
}