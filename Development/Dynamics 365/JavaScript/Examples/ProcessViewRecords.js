if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

Client.Dyn365.ProcessViewRecords = {
    
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
}