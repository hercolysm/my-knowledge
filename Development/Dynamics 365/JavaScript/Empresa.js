///'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

const Fortics_tipo_account = {
    CNPJ: 173180000,
    CPF: 173180001,
    OUTROS: 173180002
}

Fortics.Dyn365.Empresa = {
    globalContext: null,
    FormContext: null,

    OnLoad: (executionContext) => {
        Fortics.Dyn365.Empresa.globalContext = executionContext;
        FormContext = SDKore.GetFormContext(executionContext);
        FormContext.getAttribute("telephone1").addOnChange(Fortics.Dyn365.Empresa.OnChange_telephone1);
        FormContext.getAttribute("address1_telephone2").addOnChange(Fortics.Dyn365.Empresa.OnChange_address1_telephone2);
        FormContext.getAttribute("address1_telephone3").addOnChange(Fortics.Dyn365.Empresa.OnChange_address1_telephone3);
        FormContext.getAttribute("frt_parceiro").addOnChange(Fortics.Dyn365.Empresa.OnChangeParceiro);
        FormContext.getAttribute("frt_empresa_parceira").addOnChange(Fortics.Dyn365.Empresa.OnChangeEmpresaParceira);
        Fortics.Dyn365.Empresa.VisibilidadeTelefones();

        Fortics.Dyn365.Empresa.NaoRealizarIntegracaoReceita();
        if (top.MscrmControls.FieldControls.PhoneNumberControl)
            top.MscrmControls.FieldControls.PhoneNumberControl.prototype.action = function () {
                Fortics.Dyn365.Click2Call.DiscarAsync(Fortics.Dyn365.Empresa.globalContext, this._value);
            };

        Fortics.Dyn365.Empresa.VisibilidadePorEmpresaParceira();
        Fortics.Dyn365.Empresa.SetFilterContatoPrincipal();
    },

    OnChange_Tipo: function (executionContext) {
        var formContext = SDKore.GetFormContext(executionContext);
        var tipo = formContext.getAttribute("frt_tipo").getValue();
        var identificacao = formContext.getAttribute("frt_cnpj_cpf").getValue();

        if (tipo === "" || tipo === null) {
            return;
        }

        if (identificacao === "" || identificacao === null) {
            return;
        }

        identificacao = identificacao.replace(/[^\d]+/g, '');

        if (tipo == Fortics_tipo_account.CPF && identificacao.length != 11) {
            formContext.getControl("frt_tipo").addNotification({ messages: ["Inconsistencia entre Tipo e CPF"], notificationLevel: 'ERROR' });
            return;
        }
        else
            formContext.getControl("frt_tipo").clearNotification();

        if (tipo == Fortics_tipo_account.CNPJ && identificacao.length != 14) {
            formContext.getControl("frt_tipo").addNotification({ messages: ["Inconsistencia entre Tipo e CNPJ"], notificationLevel: 'ERROR' });
            return;
        }
        else
            formContext.getControl("frt_tipo").clearNotification();

        Fortics.Dyn365.Empresa.OnChange_CPF_CNPJ(executionContext);
    },

    OnChange_CPF_CNPJ: function (executionContext) {
        Fortics.Dyn365.Empresa.ValidaDocumentoConsultaReceita();
    },

    ValidaDocumentoConsultaReceita: function () {
        if (Fortics.Dyn365.Empresa.ValidarCpfCnjTipo())
            Fortics.Dyn365.Empresa.ConsultarReceita();
    },

    OnChange_Postalcode: function (executionContext) {
        var formContext = SDKore.GetFormContext(executionContext);

        var cep = formContext.getAttribute("address1_postalcode").getValue();

        if (cep === "" || cep === null) {
            Fortics.Dyn365.Empresa.LimpaCamposEndereco();
            return;
        }

        cep = cep.replace(/[^\d]+/g, '');

        if (cep.length !== 8) {
            Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "CEP digitado [" + cep + "] Ã© InvÃ¡lido" }, { height: 100, width: 300 }).then(
                function success(result) {
                    Fortics.Dyn365.Empresa.LimpaCamposEndereco();
                }
            );
        }
        else {
            Fortics.Dyn365.Empresa.ObterCep(cep);
        }
    },

    ObterCep: function (cep) {

        Fortics.Dyn365.ViacepLibrary.ObterCepInfo(cep, Fortics.Dyn365.Empresa.AtualizaCamposEnderecoCallback);
    },

    AtualizaCamposEnderecoCallback(retornoCallback) {

        if (retornoCallback == undefined || retornoCallback == null) {
            alert("Erro na consulta CEP");
            Fortics.Dyn365.Empresa.LimpaCamposEndereco();
            return;
        }

        if (retornoCallback.success == false) {
            alert(retornoCallback.errorMessage);
            Fortics.Dyn365.Empresa.LimpaCamposEndereco();
            return;
        }

        if (retornoCallback.endereco == undefined) {
            alert("Erro na consulta CEP. NÃ£o hÃ¡ endereÃ§o.");
            Fortics.Dyn365.Empresa.LimpaCamposEndereco();
            return;
        }

        var endereco = retornoCallback.endereco;

        var formContext = SDKore.GetFormContext(Fortics.Dyn365.Empresa.globalContext);

        // AtualizaCampos
        if (endereco.cep != undefined && endereco.cep != null)
            formContext.getAttribute("address1_postalcode").setValue(endereco.cep);

        if (endereco.logradouro != undefined && endereco.logradouro != null)
            formContext.getAttribute("address1_line1").setValue(endereco.logradouro);

        if (endereco.complemento != undefined && endereco.complemento != null)
            formContext.getAttribute("address1_line3").setValue(endereco.complemento);

        if (endereco.bairro != undefined && endereco.bairro != null)
            formContext.getAttribute("address1_county").setValue(endereco.bairro);

        if (endereco.localidade != undefined && endereco.localidade != null)
            formContext.getAttribute("address1_city").setValue(endereco.localidade);

        if (endereco.uf != endereco && endereco.uf != null)
            formContext.getAttribute("address1_stateorprovince").setValue(endereco.uf);

        if (endereco.pais != endereco && endereco.pais != null)
            formContext.getAttribute("address1_country").setValue(endereco.pais);
    },

    LimpaCamposEndereco: function () {
        var formContext = SDKore.GetFormContext(Fortics.Dyn365.Empresa.globalContext);

        formContext.getAttribute("address1_postalcode").setValue("");

        formContext.getAttribute("address1_line1").setValue("");

        formContext.getAttribute("address1_line3").setValue("");

        formContext.getAttribute("address1_county").setValue("");

        formContext.getAttribute("address1_city").setValue("");

        formContext.getAttribute("address1_stateorprovince").setValue("");

        formContext.getAttribute("address1_country").setValue("");
    },

    ConsultarReceita: function () {
        var tipo = FormContext.getAttribute("frt_tipo").getValue();
        var cnpj = FormContext.getAttribute("frt_cnpj_cpf").getValue();

        if (tipo != Fortics_tipo_account.CNPJ || cnpj == "" || cnpj === null)
            return;

        Xrm.Utility.showProgressIndicator("Aguarde enquanto a consulta na receita federal Ã© realizada");

        var parameters = {};
        parameters.Cnpj = cnpj;

        var req = new XMLHttpRequest();
        req.open("POST", FormContext.context.getClientUrl() + "/api/data/v9.1/frt_ForticsConsultarReceitaFederal", true);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);
                    var empresa = results.Empresa;
                    if (empresa != null) {
                        FormContext.getAttribute("name").setValue(empresa.name);
                        FormContext.getAttribute("frt_nome_fantasia").setValue(empresa.frt_nome_fantasia);
                        FormContext.getAttribute("telephone1").setValue(empresa.telephone1);
                        FormContext.getAttribute("emailaddress1").setValue(empresa.emailaddress1);
                        FormContext.getAttribute("emailaddress1").fireOnChange()
                        FormContext.getAttribute("address1_line1").setValue(empresa.address1_line1);
                        FormContext.getAttribute("address1_line2").setValue(empresa.address1_line2);
                        FormContext.getAttribute("address1_line3").setValue(empresa.address1_line3);
                        FormContext.getAttribute("address1_county").setValue(empresa.address1_county);
                        FormContext.getAttribute("address1_city").setValue(empresa.address1_city);
                        FormContext.getAttribute("address1_stateorprovince").setValue(empresa.address1_stateorprovince);
                        FormContext.getAttribute("address1_postalcode").setValue(empresa.address1_postalcode);
                        FormContext.getAttribute("address1_country").setValue("Brasil");
                        FormContext.getAttribute("marketcap").setValue(empresa.marketcap);
                        FormContext.getAttribute("frt_pl_porte").setValue(empresa.frt_pl_porte);
                        FormContext.getAttribute("frt_situacao_rfb").setValue(empresa.frt_situacao_rfb);
                        FormContext.getAttribute("frt_pl_tipo_contabil").setValue(empresa.frt_pl_tipo_contabil);
                        FormContext.getAttribute("frt_st_response_receita").setValue(empresa.frt_st_response_receita);

                        if (empresa._frt_cnae_value != null && empresa._frt_cnae_value != "") {
                            var cnaeLk = SDKore.CreateLookup(empresa._frt_cnae_value, results.CnaeName, "frt_cnae");
                            FormContext.getAttribute("frt_cnae").setValue(cnaeLk);
                        }
                        Xrm.Utility.closeProgressIndicator();
                    }
                }
                else {
                    Xrm.Utility.closeProgressIndicator();
                    Xrm.Navigation.openAlertDialog({ title: "Erro ao realizar integraÃ§Ã£o", text: this.statusText });
                }
            }
        };
        req.send(JSON.stringify(parameters));
    },

    ValidarCpfCnjTipo: function () {
        var tipo = FormContext.getAttribute("frt_tipo").getValue();
        var cpfCnpj = FormContext.getAttribute("frt_cnpj_cpf").getValue();

        if (cpfCnpj === "" || cpfCnpj === null)//Campo nÃ£o Ã© obrigatÃ³rio
        {
            FormContext.getControl("frt_cnpj_cpf").clearNotification();
            return false;
        }

        if (tipo === "" || tipo === null) {
            FormContext.getControl("frt_tipo").addNotification({ messages: ["Informe o campo Tipo."], notificationLevel: 'ERROR' });
            return false;
        }
        else
            FormContext.getControl("frt_tipo").clearNotification();

        cpfCnpj = Fortics.Dyn365.Validacoes.RemoverCaracteresEspeciais(cpfCnpj);

        if (tipo == Fortics_tipo_account.CPF) {
            if (!Fortics.Dyn365.Validacoes.VerificarCpf(cpfCnpj)) {
                FormContext.getControl("frt_cnpj_cpf").addNotification({ messages: ['O CPF digitado Ã© invÃ¡lido'], notificationLevel: 'ERROR' });
                return false;
            }
            else {
                var cpfFormatado = Fortics.Dyn365.Validacoes.FormatarCpf(cpfCnpj);
                FormContext.getAttribute("frt_cnpj_cpf").setValue(cpfFormatado);
                FormContext.getControl("frt_cnpj_cpf").clearNotification();
            }
        }
        else if (tipo == Fortics_tipo_account.CNPJ) {
            if (!Fortics.Dyn365.Validacoes.VerificarCnpj(cpfCnpj)) {
                FormContext.getControl("frt_cnpj_cpf").addNotification({ messages: ['O CNPJ digitado Ã© invÃ¡lido'], notificationLevel: 'ERROR' });
                return false;
            }
            else {
                var cnpjFormatado = Fortics.Dyn365.Validacoes.FormatarCnpj(cpfCnpj);
                FormContext.getAttribute("frt_cnpj_cpf").setValue(cnpjFormatado);
                FormContext.getControl("frt_cnpj_cpf").clearNotification();
            }
        }

        var cpfCnpjFormatado = FormContext.getAttribute("frt_cnpj_cpf").getValue();
        var accountId = FormContext.data.entity.getId();
        var filter = "";
        if (accountId !== "")
            filter = "accountid ne " + accountId + " and ";

        filter = filter + "frt_cnpj_cpf eq '" + cpfCnpjFormatado + "'";
        var contas = SDKore.GetAPI("accounts", "frt_cnpj_cpf", filter);
        if (contas != null) {
            var msgContaExistente = "";
            if (tipo == Fortics_tipo_account.CPF)
                msgContaExistente = "CPF jÃ¡ cadastrado";
            else
                msgContaExistente = "CNPJ jÃ¡ cadastrado";

            FormContext.getControl("frt_cnpj_cpf").addNotification({ messages: [msgContaExistente], notificationLevel: 'ERROR' });
            return false;
        }
        else
            FormContext.getControl("frt_cnpj_cpf").clearNotification();
        return true;
    },

    NaoRealizarIntegracaoReceita: function () {
        var accountId = FormContext.data.entity.getId();
        if (accountId !== "")
            return;
        FormContext.getAttribute("frt_integracao_receita").setValue(false);
    },

    OnChange_telephone1: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext);
        Fortics.Dyn365.Empresa.VisibilidadeTelefones();
    },

    OnChange_address1_telephone2: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext);
        Fortics.Dyn365.Empresa.VisibilidadeTelefones();
    },

    OnChange_address1_telephone3: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext);
        Fortics.Dyn365.Empresa.VisibilidadeTelefones();
    },

    VisibilidadeTelefones: function () {
        const telefones = {
            campoTelefoneUm: "telephone1",
            campoTelefoneDois: "address1_telephone2",
            campoTelefoneTres: "address1_telephone3",
        };
        Fortics.Dyn365.VisibilidadeTelefones.OcultarMostrarTelefones(FormContext, telefones);
    },
    SubstituirOportunidades: async (selectedControlSelectedItemsId) => {
        var continuar = true;
        for (var i = 0; i < selectedControlSelectedItemsId.length; i++) {
            var cancelamentoId = null;
            await Xrm.WebApi.online.retrieveRecord("opportunity", selectedControlSelectedItemsId[i], "?$select=statecode,_frt_oportunidadesid_value").then(
                function success(result) {
                    var statecode = result["statecode"];
                    if (statecode != 1)//Ganha
                        continuar = false;
                    else {
                        cancelamentoId = result["_frt_oportunidadesid_value"];
                    }
                },
            );

            if (!continuar)
                break;

            if (cancelamentoId != null && cancelamentoId != "") {
                await Xrm.WebApi.online.retrieveRecord("frt_cancelamentos", cancelamentoId, "?$select=statuscode").then(
                    function success(result) {
                        var statuscode = result["statuscode"];
                        if (statuscode == 2)//Cancelado
                            continuar = false;
                    },
                );
            }
            if (!continuar)
                break;
        }

        if (!continuar) {
            Xrm.Navigation.openAlertDialog({ title: "Substituir oportunidades", text: "SÃ³ Ã© possÃ­vel criar oportunidades de substituiÃ§Ã£o para oportunidades Ganhas e nÃ£o canceladas" });
            return;
        }

        var entity = {};
        entity.frt_tipo = Fortics.Dyn365.OportunidadeEnum.Tipo.Vigente; //Vigente
        var accountId = FormContext.data.entity.getId().replace("{", "").replace("}", "");
        entity["customerid_account@odata.bind"] = "/accounts(" + accountId + ")";

        var newOpportunityId = null;
        await Xrm.WebApi.online.createRecord("opportunity", entity).then(
            function success(result) {
                newOpportunityId = result.id

            },
        );
        for (var i = 0; i < selectedControlSelectedItemsId.length; i++) {
            var association = {
                "@odata.id": FormContext.context.getClientUrl() + "/api/data/v9.1/opportunities(" + selectedControlSelectedItemsId[i] + ")"
            };
            var req = new XMLHttpRequest();
            req.open("POST", FormContext.context.getClientUrl() + "/api/data/v9.1/opportunities(" + newOpportunityId + ")/frt_opportunity_opportunity/$ref", false);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.onreadystatechange = function () {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 204 || this.status === 1223) {
                        //Success - No Return Data - Do Something
                    } else {
                        Xrm.Utility.alertDialog(this.statusText);
                    }
                }
            };
            req.send(JSON.stringify(association));
        }

        let entityFormOptions = {
            entityName: "opportunity",
            entityId: newOpportunityId
        };

        Xrm.Navigation.openForm(entityFormOptions);
    },
    VisibilidadePorEmpresaParceira: function () {
        var parceiro = FormContext.getAttribute("frt_parceiro").getValue();
        var empresaParceira = FormContext.getAttribute("frt_empresa_parceira").getValue();

        if (parceiro) {
            FormContext.ui.tabs.get("tab_clientes").setVisible(true);
            FormContext.ui.tabs.get("tab_empresas_mapeadas").setVisible(true);
        }
        else {
            FormContext.ui.tabs.get("tab_clientes").setVisible(false);
            FormContext.ui.tabs.get("tab_empresas_mapeadas").setVisible(false);
        }

        if (empresaParceira != null) {
            FormContext.getControl("accountopportunitiesgrid").setVisible(false);
            FormContext.ui.quickForms.get("form_contato_empresa_parceira").setVisible(true);
        }
        else {
            FormContext.getControl("accountopportunitiesgrid").setVisible(true);
            FormContext.ui.quickForms.get("form_contato_empresa_parceira").setVisible(false);
        }
    },
    OnChangeParceiro: function () {
        Fortics.Dyn365.Empresa.VisibilidadePorEmpresaParceira();
    },
    OnChangeEmpresaParceira: function () {
        Fortics.Dyn365.Empresa.VisibilidadePorEmpresaParceira();
    },
    SetFilterContatoPrincipal: function () {
        var accountId = FormContext.data.entity.getId();
        if (accountId === "")
            return;

        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "primarycontactid");
    }
}