//'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.AssinanteSignature = {

    FormContext: null,

    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        if (Fortics.Dyn365.AssinanteSignature.FecharFormulario())
            return;
        Fortics.Dyn365.AssinanteSignature.ObrigatoriedadeOrdencacao();
        Fortics.Dyn365.AssinanteSignature.BloquearContato();



        FormContext.getAttribute("frt_lp_contato").addOnChange(Fortics.Dyn365.AssinanteSignature.OnChangeContato);
    },
    ObrigatoriedadeOrdencacao: function () {
        var documentoSignature = FormContext.getAttribute("frt_lp_documento_signature").getValue();
        Xrm.WebApi.online.retrieveRecord("frt_documento_signature", documentoSignature[0].id, "?$select=frt_pl_tipo_envio,_frt_lp_empresa_value,statuscode").then(
            function success(result) {
                
                var sequencial = 173180001;
                if (result["frt_pl_tipo_envio"] == sequencial) {
                    FormContext.getControl("frt_int_ordenacao").setVisible(true);
                    FormContext.getAttribute("frt_int_ordenacao").setRequiredLevel("required");
                }
                else {
                    FormContext.getControl("frt_int_ordenacao").setVisible(false);
                    FormContext.getAttribute("frt_int_ordenacao").setRequiredLevel("none");
                }
                var naoEnviado = 173180000;
                if (result["statuscode"] == naoEnviado) {
                    FormContext.getControl("frt_int_ordenacao").setDisabled(false);
                    FormContext.getControl("frt_pl_tipo").setDisabled(false);
                }
                else {
                    FormContext.getControl("frt_int_ordenacao").setDisabled(true);
                    FormContext.getControl("frt_pl_tipo").setDisabled(true);
                }
                //Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, result["_frt_lp_empresa_value"], "frt_lp_contato");
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    },
    OnChangeContato: function () {
        Fortics.Dyn365.AssinanteSignature.CarregarInformacoesContato();
    },
    CarregarInformacoesContato: function () {
        var contato = FormContext.getAttribute("frt_lp_contato").getValue();
        if (contato != null) {
            Xrm.WebApi.online.retrieveRecord("contact", contato[0].id, "?$select=emailaddress1,fullname,mobilephone").then(
                function success(result) {
                    var emailaddress1 = result["emailaddress1"];
                    var fullname = result["fullname"];
                    var mobilephone = result["mobilephone"];
                    var msgErro = "";
                    if (emailaddress1 == "" || emailaddress1 == null)
                        msgErro = "Contato sem e-mail.";

                    if (msgErro != "") {
                        FormContext.getControl("frt_lp_contato").addNotification({ messages: [msgErro], notificationLevel: 'ERROR' });
                        FormContext.getAttribute("frt_lp_contato").setValue(null);
                        return;
                    }
                    FormContext.getControl("frt_lp_contato").clearNotification();
                    FormContext.getAttribute("frt_name").setValue(fullname);
                    FormContext.getAttribute("frt_st_telefone").setValue(mobilephone);
                    FormContext.getAttribute("frt_st_email").setValue(emailaddress1);
                    FormContext.getControl("frt_lp_contato").setDisabled(true);
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        }

    },
    BloquearContato: function () {
        if (FormContext.getAttribute("frt_lp_contato").getValue() != null) 
            FormContext.getControl("frt_lp_contato").setDisabled(true);
    },
    FecharFormulario: function () {
        if (FormContext.getAttribute("frt_lp_documento_signature").getValue() == null) {
            Xrm.Navigation.openErrorDialog({ message: "Assinatura Digital nÃ£o encontrada" }).then(successCallback, errorCallback);
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