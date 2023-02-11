if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Telefonema = {

    FormContext: null,
    ExisteNotificacao: false,

    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        var referenteA = FormContext.getAttribute("regardingobjectid").getValue();
        if (referenteA != null && (referenteA[0].entityType == "bulkoperation" || referenteA[0].entityType == "campaignactivity")) {
            FormContext.getControl("subject").setVisible(true);
            FormContext.getAttribute("subject").setRequiredLevel("required");

            FormContext.getControl("frt_assunto").setVisible(false);
            FormContext.getAttribute("frt_assunto").setRequiredLevel("none");
        }
        else {
            FormContext.getControl("subject").setVisible(false);
            FormContext.getAttribute("subject").setRequiredLevel("none");

            FormContext.getControl("frt_assunto").setVisible(true);
            FormContext.getAttribute("frt_assunto").setRequiredLevel("required");
        }

        FormContext.getAttribute("frt_empresa").addOnChange(Fortics.Dyn365.Telefonema.OnChangeEmpresa);
        FormContext.getAttribute("actualstart").addOnChange(Fortics.Dyn365.Telefonema.OnChangeActualStart);
        FormContext.getAttribute("actualend").addOnChange(Fortics.Dyn365.Telefonema.OnChangeActualEnd);
        FormContext.getAttribute("ownerid").addOnChange(Fortics.Dyn365.Telefonema.OnChangeOwnerId);
        FormContext.getAttribute("frt_data_reagendamento").addOnChange(Fortics.Dyn365.Telefonema.OnChangeDataReagendamento);
        FormContext.getAttribute("frt_remarcar").addOnChange(Fortics.Dyn365.Telefonema.OnChangeRemarcar);
        FormContext.getAttribute("frt_notificacao").addOnChange(Fortics.Dyn365.Telefonema.OnChangeNotifiqueMe);

        Fortics.Dyn365.Telefonema.SetFilterContato();

    },

    SetFilterContato: function () {
        var empresa = FormContext.getAttribute("frt_empresa").getValue();
        var accountId = "";
        if (empresa != null)
            accountId = empresa[0].id;

        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_contato");
    },

    OnChangeEmpresa: function () {
        Fortics.Dyn365.Telefonema.SetFilterContato();

    },

    OnSave: function () {

    },
   
    OnChangeActualStart: function () {
        Fortics.Dyn365.Telefonema.ValidarHorariosTelefonema();

    },
    OnChangeActualEnd: function () {
        Fortics.Dyn365.Telefonema.ValidarHorariosTelefonema();

    },
    OnChangeOwnerId: function () {
        Fortics.Dyn365.Telefonema.ValidarHorariosTelefonema();
    },
    OnChangeDataReagendamento: function () {
        Fortics.Dyn365.Telefonema.ValidarHorariosTelefonema();
    },
    OnChangeRemarcar: function () {
        Fortics.Dyn365.Telefonema.ValidarHorariosTelefonema();
    },
    OnChangeNotifiqueMe: function () {
        Fortics.Dyn365.Telefonema.ValidarHorariosTelefonema();
    },
    ValidarHorariosTelefonema: function () {
        debugger;
        FormContext.getControl("actualstart").clearNotification();
        FormContext.getControl("frt_data_reagendamento").clearNotification();
        var dtInicial = null;
        var dtFinal = null;

        if (!FormContext.getAttribute("frt_notificacao").getValue())
            return;

        var remarcar = FormContext.getAttribute("frt_remarcar").getValue();
        if (remarcar) {
            dtInicial = FormContext.getAttribute("frt_data_reagendamento").getValue();
            if (dtInicial == null)
                return;
        }
        else {
            dtInicial = FormContext.getAttribute("actualstart").getValue();
            dtFinal = FormContext.getAttribute("actualend").getValue();
        }

        var proprietario = FormContext.getAttribute("ownerid").getValue();
        if (proprietario == null)
            return;

        var proprietarioId = proprietario[0].id;
        var telefonemaId = FormContext.data.entity.getId();

        var parameters = {};
        parameters.InicioReal = dtInicial.toJSON();
        if (dtFinal != null)
            parameters.FinalReal = dtFinal.toJSON();

        //parameters.InicioReal = new Date("04/05/2022 06:00:00").toISOString();
        //parameters.FinalReal = new Date("04/05/2022 07:00:00").toISOString();

        var proprietario = {};
        proprietario.systemuserid = proprietarioId.replace("{", "").replace("}", "");
        proprietario["@odata.type"] = "Microsoft.Dynamics.CRM.systemuser";
        parameters.Proprietario = proprietario;

        if (telefonemaId !== "") {
            var telefonemaer = {};
            telefonemaer.activityid = telefonemaId.replace("{", "").replace("}", "");
            telefonemaer["@odata.type"] = "Microsoft.Dynamics.CRM.phonecall";
            parameters.TelefonemaEr = telefonemaer;
        }

        var req = new XMLHttpRequest();
        req.open("POST", FormContext.context.getClientUrl() + "/api/data/v9.1/frt_validar_horarios_telefonema", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                debugger;
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    if (results["ExisteTelefonema"]) {
                        var nomeCampo = remarcar ? "frt_data_reagendamento" : "actualstart";
                        FormContext.getControl(nomeCampo).addNotification({ messages: ['JÃ¡ existe um telefonema aberto nesse horÃ¡rio'], notificationLevel: 'ERROR' });
                    }
                } else {
                    Xrm.Utility.alertDialog(this.statusText);
                }
            }
        };
        req.send(JSON.stringify(parameters));



    }
}