//'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.DocumentoSignature = {

    FormContext: null,
    ExecutionContext: null,

    OnLoad: function (executionContext) {
        ExecutionContext = executionContext;
        FormContext = SDKore.GetFormContext(ExecutionContext);
        if (Fortics.Dyn365.DocumentoSignature.FecharFormulario())
            return;
        Fortics.Dyn365.DocumentoSignature.BloqueioCampos();
    },
    EnviarParaServidor: function () {
        try {
            FormContext.data.save(null).then(successCallback, errorCallback);
            function successCallback() {
                
                var parameters = {};
                parameters.documentoSignatureId = FormContext.data.entity.getId();

                var req = new XMLHttpRequest();
                req.open("POST", FormContext.context.getClientUrl() + "/api/data/v9.1/frt_integrar_documento_signature", false);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            var results = JSON.parse(this.response);
                            if (results["sucesso"]) {
                                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", title: "SUCESSO", text: results["mensagem"] }, { height: 100, width: 200 });
                                FormContext.data.refresh(false).then(successCallback, errorCallback);
                                function successCallback() {
                                    Fortics.Dyn365.DocumentoSignature.OnLoad(ExecutionContext);
                                }
                            }
                            else
                                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", title: "ERRO", text: results["mensagem"] }, { height: 300, width: 300 });
                        } else {
                            Xrm.Utility.alertDialog(this.statusText);
                        }
                    }
                };
                req.send(JSON.stringify(parameters));
            }
            function errorCallback() {
                Xrm.Navigation.openErrorDialog({ message: "Erro ao tentar salvar formulÃ¡rio" });
            }
        }
        catch (ex) {
            Xrm.Navigation.openErrorDialog({ message: ex });
        }
    },
    BloqueioCampos: function () {
        var razaoStatus = FormContext.getAttribute("statuscode").getValue();
        var naoEnviado = 173180000;
        if (razaoStatus == naoEnviado) {
            FormContext.getControl("frt_name").setDisabled(false);
            FormContext.getControl("frt_dt_expiracao").setDisabled(false);
            FormContext.getControl("frt_pl_tipo_envio").setDisabled(false);
        }
        else {
            FormContext.getControl("frt_name").setDisabled(true);
            FormContext.getControl("frt_dt_expiracao").setDisabled(true);
            FormContext.getControl("frt_pl_tipo_envio").setDisabled(true);
        }

    },
    ConsultarDocumentoClick: function () {
        var parameters = {};
        parameters.documentoSignatureId = FormContext.data.entity.getId();;

        var req = new XMLHttpRequest();
        req.open("POST", FormContext.context.getClientUrl() + "/api/data/v9.1/frt_consultar_documento_signature", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    if (results["sucesso"]) {
                        Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", title: "SUCESSO", text: results["mensagem"] }, { height: 100, width: 200 });
                        FormContext.data.refresh(false);
                    }
                    else
                        Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", title: "ERRO", text: results["mensagem"] }, { height: 300, width: 300 });
                } else {
                    Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send(JSON.stringify(parameters));

    },
    FecharFormulario: function () {
        if (FormContext.getAttribute("frt_lp_proposta").getValue() == null) {
            Xrm.Navigation.openErrorDialog({ message: "NÃ£o Ã© possÃ­vel criar Assinatura Digital por esse caminho." }).then(successCallback, errorCallback);
            function successCallback() {
                FormContext.ui.close();
            }
            function errorCallback() {
                FormContext.ui.close();
            }
            return true;
        }
        else
            return false;
    }
}