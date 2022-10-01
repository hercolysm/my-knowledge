///'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Discador = {

    AcionarDiscador: function (acao){
        var parameters = {};
        parameters.acao = acao;

        var req = new XMLHttpRequest();
        req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/frt_ForticsAcionarDiscador", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    alert(results.mensagem + "\n\n" + results.log)

                } else {
                    alert(this.statusText);
                }
            }
        };
        req.send(JSON.stringify(parameters));
    },

    
}