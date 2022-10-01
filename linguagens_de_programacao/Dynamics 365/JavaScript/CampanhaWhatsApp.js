if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var FormContext = null;

Fortics.Dyn365.CampanhaWhatsApp = {
    FormContext: null,

    TipoEnvio: {
        Rpa: 173180000,
    },

    CriarCampanhaRegistrosSelecionados: function (selectedItems, entityName) {
        try {
            if (selectedItems.length == 0) {
                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "Ok", text: "Favor selecionar os registros", title: "Criar Campanha WhatsApp" });
                return;
            }
            Xrm.Utility.showProgressIndicator("Aguarde enquanto a campanha Ã© criada");

            var listIds = "";
            for (var i = 0; i < selectedItems.length; i++)
                listIds = listIds + "|" + selectedItems[i];

            Fortics.Dyn365.CampanhaWhatsApp.ActionCriarCampanhaWhatsApp(entityName, listIds, "", null, 0);
        }
        catch (ex) {
            Xrm.Navigation.openErrorDialog({ message: ex });
            Xrm.Utility.closeProgressIndicator();
        }
    },
    CriarCampanhaRegistrosExibicao: function (selectedControl, entityName) {
        try {
            Xrm.Utility.showProgressIndicator("Aguarde enquanto a campanha Ã© criada");

            var fetchXml = selectedControl.getFetchXml();
            Fortics.Dyn365.CampanhaWhatsApp.ActionCriarCampanhaWhatsApp(entityName, "", fetchXml, null, 1);
        }
        catch (ex) {
            Xrm.Navigation.openErrorDialog({ message: ex });
            Xrm.Utility.closeProgressIndicator();
        }
    },
    ActionCriarCampanhaWhatsApp: function (entityName, listIds, fetchXml, campanhaWhatsAppId, pageNumber) {
        var parameters = {};
        parameters.entityName = entityName;
        parameters.listIds = listIds;
        parameters.fetchXml = fetchXml;
        parameters.campanhaWhatsAppId = campanhaWhatsAppId;
        parameters.pageNumber = pageNumber;

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
                    if (result.nextPageNumber == 0) {
                        let entityFormOptions = {
                            entityName: "frt_campanha_whatsapp",
                            entityId: result.newCampanhaWhatsAppId
                        };

                        Xrm.Navigation.openForm(entityFormOptions);
                        Xrm.Utility.closeProgressIndicator();
                    }
                    else
                        Fortics.Dyn365.CampanhaWhatsApp.ActionCriarCampanhaWhatsApp(entityName, "", fetchXml, result.newCampanhaWhatsAppId, result.nextPageNumber);

                }
                else {
                    Xrm.Navigation.openErrorDialog({ message: this.response });
                    Xrm.Utility.closeProgressIndicator();
                }
            }
        };
        req.send(JSON.stringify(parameters));
    },

    VisibilidadePorTipoEnvio: function () {
        var tipoEnvio = FormContext.getAttribute("frt_tipo_envio").getValue();
        if (tipoEnvio == this.TipoEnvio.Rpa) {
            FormContext.getControl("frt_st_mensagem").setVisible(true);
            FormContext.getControl("frt_lk_nome_hsm").setVisible(false);
            FormContext.ui.tabs.get("tab_geral").sections.get("tab_geral_section_anotacoes").setVisible(true);

            FormContext.getAttribute("frt_st_mensagem").setRequiredLevel("required");
            FormContext.getAttribute("frt_lk_nome_hsm").setRequiredLevel("none");
        }
        else {
            FormContext.getControl("frt_st_mensagem").setVisible(false);
            FormContext.getControl("frt_lk_nome_hsm").setVisible(true);
            FormContext.ui.tabs.get("tab_geral").sections.get("tab_geral_section_anotacoes").setVisible(false);

            FormContext.getAttribute("frt_st_mensagem").setRequiredLevel("none");
            FormContext.getAttribute("frt_lk_nome_hsm").setRequiredLevel("required");
        }
    },
    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        FormContext.getAttribute("frt_tipo_envio").addOnChange(Fortics.Dyn365.CampanhaWhatsApp.OnChangeTipoEnvio);

        Fortics.Dyn365.CampanhaWhatsApp.VisibilidadePorTipoEnvio();
        Fortics.Dyn365.CampanhaWhatsApp.RemoverOptionSetRpa();
    },
    OnChangeTipoEnvio: function () {
        Fortics.Dyn365.CampanhaWhatsApp.VisibilidadePorTipoEnvio();
    },
    GerarWhatsApps: function () {
        try {
            FormContext.data.save(null).then(successCallback, errorCallback);
            function successCallback() {
                Fortics.Dyn365.CampanhaWhatsApp.ActionGerarWhatsApp(1, 1);
            }
            function errorCallback() {
            }
        }
        catch (ex) {
            Xrm.Navigation.openErrorDialog({ message: ex });
            Xrm.Utility.closeProgressIndicator();
        }
    },
    ActionGerarWhatsApp: function (pageNumberContato, pageNumberLead) {
        var campanhaWhatsAppId = FormContext.data.entity.getId();

        Xrm.WebApi.online.retrieveMultipleRecords("frt_whatsapp", "?$select=activityid&$filter=_frt_lk_campanha_whatsapp_value eq " + campanhaWhatsAppId).then(
            function success(results) {
                var qntWhatsAppsCriados = results.entities.length;

                Xrm.Utility.showProgressIndicator("Aguarde enquanto os WhatsApps sÃ£o gerados...Quantidade de WhatsApps processados: " + qntWhatsAppsCriados);

                var parameters = {};
                var campanhawhatsapper = {};
                campanhawhatsapper.frt_campanha_whatsappid = campanhaWhatsAppId;
                campanhawhatsapper["@odata.type"] = "Microsoft.Dynamics.CRM.frt_campanha_whatsapp";
                parameters.campanhaWhatsAppEr = campanhawhatsapper;
                parameters.pageNumberLead = pageNumberLead;
                parameters.pageNumberContato = pageNumberContato;

                var req = new XMLHttpRequest();
                req.open("POST", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.1/frt_gerar_whatsapps", true);
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 200) {
                            var results = JSON.parse(this.response);
                            if (results.mensagemErro != null && results.mensagemErro != "")
                                Xrm.Navigation.openErrorDialog({ message: results.mensagemErro });
                            else {
                                if (results.newPageNumberLead == 0 && results.newPageNumberContato == 0) {
                                    Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "Ok", text: "WhatsApps gerados com sucesso.", title: "Gerar WhatsApps" });
                                    Xrm.Utility.closeProgressIndicator();
                                    FormContext.data.refresh(false).then(null, null);
                                }
                                else {
                                    Fortics.Dyn365.CampanhaWhatsApp.ActionGerarWhatsApp(results.newPageNumberContato, results.newPageNumberLead);
                                }

                            }
                        } else {
                            Xrm.Utility.closeProgressIndicator();
                            Xrm.Navigation.openErrorDialog({ message: this.response });
                        }
                    }
                };
                req.send(JSON.stringify(parameters));
            },
            function (error) {
                Xrm.Utility.alertDialog(error.message);
            }
        );
    },
    EnviarWhatsApps: function (qntEnvios) {
        try {
            Xrm.Utility.showProgressIndicator("Aguarde enquanto os WhatsApps sÃ£o enviados...Quantidade de WhatsApps processados: " + qntEnvios);
            var campanhaWhatsAppId = FormContext.data.entity.getId();
            var parameters = {};
            var campanhawhatsapper = {};
            campanhawhatsapper.frt_campanha_whatsappid = campanhaWhatsAppId;
            campanhawhatsapper["@odata.type"] = "Microsoft.Dynamics.CRM.frt_campanha_whatsapp";
            parameters.campanhaWhatsAppEr = campanhawhatsapper;

            var req = new XMLHttpRequest();
            req.open("POST", Xrm.Page.context.getClientUrl() + "/api/data/v9.1/frt_enviar_whatsapps", true);
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 200) {
                        var results = JSON.parse(this.response);
                        if (results.mensagemErro != null && results.mensagemErro != "") {
                            Xrm.Utility.closeProgressIndicator();
                            Xrm.Navigation.openErrorDialog({ message: results.mensagemErro });
                        }
                        else {
                            if (results.whatsAppsEncontrados) {
                                qntEnvios = qntEnvios + 10;
                                Fortics.Dyn365.CampanhaWhatsApp.EnviarWhatsApps(qntEnvios);
                            }
                            else {
                                Xrm.Utility.closeProgressIndicator();
                                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "Ok", text: "Processo concluÃ­do.", title: "Enviar WhatsApps" });
                                FormContext.data.refresh(false).then(successCallback, errorCallback);
                            }
                        }
                    }
                    else
                        Xrm.Navigation.openErrorDialog({ message: this.response });
                }
            };
            req.send(JSON.stringify(parameters));
        }
        catch (ex) {
            Xrm.Navigation.openErrorDialog({ message: ex });
            Xrm.Utility.closeProgressIndicator();
        }
    },
    VisibilidadeButtonCriarCampanha: function () {
        var currentUserRoles = Xrm.Utility.getGlobalContext().userSettings.securityRoles
        var securityDirecao = "51D906D1-20D4-EB11-BACC-002248374527";
        var securityGerenteVendas = "85325FD9-A136-4849-A7CC-8267DBEF07D2";
        var securityGestaoVendas = "3C17112F-0805-EC11-B6E7-000D3AC1CAF0";
        var securityGestorCustomerSuccess = "87859B64-AFF6-EB11-94EF-00224836BF1D";
        var securityAdmin = "";


        for (var i = 0; i < currentUserRoles.length; i++) {
            var currentRole = currentUserRoles[i].toUpperCase()
            if (currentRole == securityDirecao || currentRole == securityGerenteVendas || currentRole == securityGestaoVendas || currentRole == securityGestorCustomerSuccess || currentRole == securityAdmin)
                return true;
        }
        return false;
    },

    RemoverOptionSetRpa: function () {
        var stateCode = FormContext.getAttribute("statecode").getValue();
        if (stateCode == 0) {
            var tipoEnvio = FormContext.getAttribute("frt_tipo_envio").getValue();
            if (tipoEnvio == this.TipoEnvio.Rpa)
                FormContext.getAttribute("frt_tipo_envio").setValue(null);

            FormContext.getControl("frt_tipo_envio").removeOption(this.TipoEnvio.Rpa);
        }
    }
}