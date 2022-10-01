if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Click2Call = {
    DiscarAsync: async (contexto, numeroTelefone) => {
        try {
            if (!contexto) {
                Xrm.Navigation.openErrorDialog({ message: 'Contexto nÃ£o informado ou invÃ¡lido.' });
                return;
            }

            if (!numeroTelefone) {
                Xrm.Navigation.openErrorDialog({ message: 'Telefone nÃ£o informado ou invÃ¡lido.' });
                return;
            }

            let formContext = contexto.getFormContext();

            var confirmStrings = { text: "Gostaria de realizar uma ligaÃ§Ã£o ou criar um registro de WhatsApp?", title: "Realizar ligaÃ§Ã£o ou criar WhatsApp?", confirmButtonLabel: "Click 2 Call", cancelButtonLabel: "WhatsApp" };
            var confirmOptions = { height: 200, width: 450 };
            var realizarClickToCall = await Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
                function (success) {
                    if (typeof success.confirmed == 'undefined')
                        return null;
                    if (success.confirmed)
                        return true;
                    else
                        return false;
                });
            if (realizarClickToCall == null)
                return;
            if (!realizarClickToCall) {
                var registroId = formContext.data.entity.getId().replace('{', '').replace('}', '');
                var entity = {};
                entity.frt_telefone_whatsapp = numeroTelefone;

                var entityName = formContext.data.entity.getEntityName();
                switch (entityName) {
                    case "contact":
                        entity["frt_contato_frt_whatsapp@odata.bind"] = "/contacts(" + registroId + ")";
                        entity["regardingobjectid_contact_frt_whatsapp@odata.bind"] = "/contacts(" + registroId + ")";

                        break;

                    case "lead":
                        entity["frt_lk_lead_frt_whatsapp@odata.bind"] = "/leads(" + registroId + ")";
                        entity["regardingobjectid_lead_frt_whatsapp@odata.bind"] = "/leads(" + registroId + ")";

                        break;

                    case "account":
                        entity["regardingobjectid_account_frt_whatsapp@odata.bind"] = "/accounts(" + registroId + ")";

                        break;
                    default:
                }

                Xrm.WebApi.createRecord("frt_whatsapp", entity).then(
                    function success(result) {
                        var newEntityId = result.id;
                        let entityFormOptions = {
                            entityName: "frt_whatsapp",
                            entityId: newEntityId
                        };

                        Xrm.Navigation.openForm(entityFormOptions);
                    },
                    function (error) {
                        Xrm.Navigation.openErrorDialog({ message: error.message });
                    }
                );
                return;
            }


            let dadosRetornadosNaConsultaAoServidor = await Fortics.Dyn365.Servidor.ListarDadosDoServicoAsync("Click2Call");
            if (!dadosRetornadosNaConsultaAoServidor) {
                Xrm.Navigation.openErrorDialog({ message: 'Dados de integraÃ§Ã£o com o Click2Call nÃ£o informados ou invÃ¡lidos.' });
                return;
            }

            dadosRetornadosNaConsultaAoServidor = JSON.parse(dadosRetornadosNaConsultaAoServidor);

            let servidor = {};
            if (dadosRetornadosNaConsultaAoServidor['statusText']) {
                Xrm.Navigation.openErrorDialog({ message: `NÃ£o foi possÃ­vel carregar as informaÃ§Ãµes de integraÃ§Ã£o do serviÃ§o Click2Call. \n RazÃ£o: ${dadosRetornadosNaConsultaAoServidor.statusText}` });
                return;
            }

            servidor = dadosRetornadosNaConsultaAoServidor.value;
            if (!servidor[0].frt_url) {
                Xrm.Navigation.openErrorDialog({ message: 'A url de integraÃ§Ã£o da entidade Servidor nÃ£o foi preenchido para a integraÃ§Ã£o com o Click2Call. Favor preencher estas informaÃ§Ãµes ou entrar em contato com o suporte!' });
                return;
            }

            if (!servidor[0].frt_senha) {
                Xrm.Navigation.openErrorDialog({ message: 'A chave de integraÃ§Ã£o da entidade Servidor nÃ£o foi preenchido para a integraÃ§Ã£o com o Click2Call. Favor preencher estas informaÃ§Ãµes ou entrar em contato com o suporte!' });
                return;
            }

            let dadosDoUsuarioLogado = await Fortics.Dyn365.Click2Call.BuscarDadosDoUsuarioLogadoAsync(contexto);
            if (!dadosDoUsuarioLogado) {
                Xrm.Navigation.openErrorDialog({ message: 'Houve um erro ao consultar os dados do usuÃ¡rio logado, por favor tente novamente ou contate o suporte.' });
                return;
            }

            if (!dadosDoUsuarioLogado.frt_ramal) {
                Xrm.Navigation.openErrorDialog({ message: 'O usuÃ¡rio nÃ£o possui um ramal cadastrado. Entre em contato com a administraÃ§Ã£o do sistema para configurar os dados.' });
                return;
            }

            let click2CallApiReturn = await Fortics.Dyn365.Click2Call.ConsultarDadosNaApiClick2CallAsync(servidor[0].frt_url, servidor[0].frt_senha, dadosDoUsuarioLogado.frt_ramal, numeroTelefone)

            if (click2CallApiReturn['statusText']) {
                Xrm.Navigation.openErrorDialog({ details: `${dadosRetornadosNaConsultaAoServidor.statusText}`, message: 'Erro ao consultar os dados na api do Click2Call.' });
                return;
            }

            click2CallApiReturn = JSON.parse(click2CallApiReturn);

            if (!click2CallApiReturn || !click2CallApiReturn['success']) {
                Xrm.Navigation.openErrorDialog({ message: click2CallApiReturn['msg'] });
                return;
            }

            //let entityFormOptions = {
            //    entityName: "phonecall",
            //    useQuickCreateForm: true
            //};

            //entityFormOptions['useQuickCreateForm'] = true;

            //let parametrosDoFormulario = {};
            //let data = null;
            //let entityId = formContext.data.entity.getId().replace('{', '').replace('}', '');
            //let entityName = formContext.data.entity.getEntityName();
            //let formData = await Xrm.WebApi.retrieveRecord(entityName, entityId);
            //let contato = new Array();

            //if (formData && entityName && entityName == 'contact' && entityId)
            //    data = GerarDadosDoContato(data, formData, entityName, parametrosDoFormulario);

            //else if (formData && entityName == 'account' && entityId)
            //    data = GerarDadosDeConta(data, entityId, entityName, formData, parametrosDoFormulario);

            //else if (formData && entityName == 'lead' && entityId)
            //    data = GerarDadosDoLead(data, entityId, entityName, formData);

            //if (entityName == 'account' || entityName == 'contact') {
            //    contato[0] = data;
            //    parametrosDoFormulario['to'] = contato;
            //}

            //parametrosDoFormulario['regardingobjectid'] = data;
            //parametrosDoFormulario['phonenumber'] = numeroTelefone;

            //Xrm.Navigation.openForm(entityFormOptions, parametrosDoFormulario);
        } catch (e) {
            Xrm.Utility.closeProgressIndicator();
            Xrm.Navigation.openErrorDialog({ details: JSON.stringify(e), message: 'Erro ao executar esta aÃ§Ã£o.' });
        }
    },

    BuscarDadosDoUsuarioLogadoAsync: async (context) => {
        let formContext = context.getFormContext();
        let idUsuario = formContext.context.getUserId();

        if (!idUsuario) {
            Xrm.Navigation.openErrorDialog({ message: 'Dados do usuÃ¡rio nÃ£o informados ou invÃ¡lidos.' });
            return;
        }

        idUsuario = idUsuario.replace('{', '').replace('}', '');

        return await Xrm.WebApi.retrieveRecord("systemuser", idUsuario);
    },

    ConsultarDadosNaApiClick2CallAsync: async (apiUrl, chaveDaApi, ramalDoUsuario, telefoneDestino) => {
        return new Promise(function (resolve, reject) {
            try {
                Xrm.Utility.showProgressIndicator("Realizando a ligaÃ§Ã£o...")
                let xhr = new XMLHttpRequest();

                telefoneDestino = telefoneDestino.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")

                let url = `${apiUrl}/lisintegra.php?gacao=discar&gsrc=${ramalDoUsuario}&gdst=${telefoneDestino}&gresponse=json&gkey=${encodeURIComponent(chaveDaApi)}`

                xhr.open("GET", url);

                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        Xrm.Utility.closeProgressIndicator();
                        resolve(xhr.response);
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };

                xhr.onerror = function () {
                    Xrm.Utility.closeProgressIndicator();
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };

                xhr.send();
            } catch (e) {
                Xrm.Utility.closeProgressIndicator();
                reject({
                    status: "",
                    statusText: e
                });
            }
        });
    }
}

function GerarDadosDoLead(data, entityId, entityName, formData) {
    data = {
        id: entityId,
        entityType: entityName,
        name: formData.firstname
    };
    return data;
}

function GerarDadosDeConta(data, entityId, entityName, formData, parametrosDoFormulario) {
    data = {
        id: entityId,
        entityType: entityName,
        name: formData.name
    };

    parametrosDoFormulario['frt_empresa'] = data;
    return data;
}

function GerarDadosDoContato(data, formData, entityName, parametrosDoFormulario) {
    data = {
        id: formData.contactid,
        entityType: entityName,
        name: formData.fullname
    };

    if (formData._parentcustomerid_value) {
        let empresa = {
            id: formData._parentcustomerid_value,
            name: formData['_parentcustomerid_value@OData.Community.Display.V1.FormattedValue'],
            entityType: formData['_parentcustomerid_value@Microsoft.Dynamics.CRM.lookuplogicalname']
        };

        parametrosDoFormulario['frt_empresa'] = empresa;
    }
    return data;
}