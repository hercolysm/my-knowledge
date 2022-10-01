if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var FormContext = null;
const EnumTipoEnvio = {
    RPA: 173180000,
    HSM: 173180001
}
const StateCode = {
    Concluida: 1,
}

Fortics.Dyn365.Whatsapp = {
    FormContext: null,

    VisibilidadesPorTipoEnvio: function () {
        var tipo = FormContext.getAttribute("frt_tipo_envio").getValue();
        if (tipo == EnumTipoEnvio.RPA) {
            FormContext.getControl("frt_lp_tag").setVisible(false);
            FormContext.getControl("description").setVisible(true);
            FormContext.getAttribute("description").setRequiredLevel("required");
            FormContext.getAttribute("frt_lp_tag").setRequiredLevel("none");
            //FormContext.ui.tabs.get("tab_geral").sections.get("secao_anotacoes").setVisible(true);
        }
        else {
            FormContext.getControl("description").setVisible(false);
            FormContext.getControl("frt_lp_tag").setVisible(true);
            FormContext.getAttribute("description").setRequiredLevel("none");
            FormContext.getAttribute("frt_lp_tag").setRequiredLevel("required");
            //FormContext.ui.tabs.get("tab_geral").sections.get("secao_anotacoes").setVisible(false);
        }

    },
    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        FormContext.getAttribute("frt_lk_lead").addOnChange(this.OnChangeLead);
        FormContext.getAttribute("frt_contato").addOnChange(this.OnChangeContato);
        FormContext.getAttribute("frt_tipo_envio").addOnChange(this.OnChangeTipoEnvio);

        Fortics.Dyn365.Whatsapp.VisibilidadesPorTipoEnvio(executionContext);
        Fortics.Dyn365.Whatsapp.VisibilidadeContatoLead();
        Fortics.Dyn365.Whatsapp.PreencherTelefoneWhatsApp();
        Fortics.Dyn365.Whatsapp.RemoverOptionSetRpa();
        Fortics.Dyn365.Whatsapp.SetFilterContato();
    },
    OnChangeTipoEnvio: function (executionContext) {
        Fortics.Dyn365.Whatsapp.VisibilidadesPorTipoEnvio(executionContext);
    },
    VisibilidadeContatoLead: function () {
        var lead = FormContext.getAttribute("frt_lk_lead").getValue();
        var contato = FormContext.getAttribute("frt_contato").getValue();
        FormContext.getControl("frt_lk_lead").setVisible(false);
        FormContext.getControl("frt_contato").setVisible(false);

        if (lead == null && contato == null) {
            FormContext.getControl("frt_lk_lead").setVisible(true);
            FormContext.getControl("frt_contato").setVisible(true);
        }
        else if (lead != null)
            FormContext.getControl("frt_lk_lead").setVisible(true);
        else if (contato != null)
            FormContext.getControl("frt_contato").setVisible(true);
    },
    OnChangeLead: function () {
        Fortics.Dyn365.Whatsapp.VisibilidadeContatoLead();
        Fortics.Dyn365.Whatsapp.PreencherTelefoneWhatsApp();
    },
    OnChangeContato: function () {
        Fortics.Dyn365.Whatsapp.VisibilidadeContatoLead();
        Fortics.Dyn365.Whatsapp.PreencherTelefoneWhatsApp();
    },
    PreencherTelefoneWhatsApp: function () {
        var telefoneWhatsApp = FormContext.getAttribute("frt_telefone_whatsapp").getValue();
        if (telefoneWhatsApp != null && telefoneWhatsApp != "")
            return;

        var contato = FormContext.getAttribute("frt_contato").getValue();
        var lead = FormContext.getAttribute("frt_lk_lead").getValue();
        var entityName = null;
        var clienteId = null;
        if (contato != null) {
            entityName = "contact";
            clienteId = contato[0].id;
        }
        else if (lead != null) {
            entityName = "lead";
            clienteId = lead[0].id;
        }

        if (entityName != null) {
            Xrm.WebApi.online.retrieveRecord(entityName, clienteId, "?$select=address1_telephone2,address1_telephone3,frt_whatsapp").then(
                function success(result) {
                    var whatsAppUm = result["frt_whatsapp"];
                    var whatsAppDois = result["address1_telephone2"];
                    var whatsAppTres = result["address1_telephone3"];

                    if (whatsAppUm != null)
                        telefoneWhatsApp = whatsAppUm;
                    else if (whatsAppDois != null)
                        telefoneWhatsApp = whatsAppDois;
                    else
                        telefoneWhatsApp = whatsAppTres;

                    FormContext.getAttribute("frt_telefone_whatsapp").setValue(telefoneWhatsApp);
                },
                function (error) {
                    Xrm.Utility.alertDialog(error.message);
                }
            );
        }
    },
    RemoverOptionSetRpa: function () {
        var stateCode = FormContext.getAttribute("statecode").getValue();
        if (stateCode == 0) {
            var tipoEnvio = FormContext.getAttribute("frt_tipo_envio").getValue();
            if (tipoEnvio == EnumTipoEnvio.RPA)
                FormContext.getAttribute("frt_tipo_envio").setValue(null);

            FormContext.getControl("frt_tipo_envio").removeOption(EnumTipoEnvio.RPA);
        }
    },
    SetFilterContato: function () {
        var accountId = "";
        var referenteA = FormContext.getAttribute("regardingobjectid").getValue();
        if (referenteA != null && referenteA[0].entityType == "account")
            accountId = referenteA[0].id;

        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_contato");
    },
}