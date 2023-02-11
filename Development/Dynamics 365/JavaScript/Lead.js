///'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

const EnumTipo = {
    CNPJ: 173180000,
    CPF: 173180001,
    OUTROS: 173180002
}

Fortics.Dyn365.Lead = {
    globalContext: null,
    FormContext: null,

    ValidarCpfCnpjTipo: function (executionContext) {
        var formContext = SDKore.GetFormContext(executionContext);

        var tipo = formContext.getAttribute("frt_tipo").getValue();
        var cpfCnpj = formContext.getAttribute("frt_cnpj_cpf").getValue();

        if (cpfCnpj === "" || cpfCnpj === null) {
            formContext.getControl("frt_cnpj_cpf").clearNotification();
            return; //Campo nÃ£o Ã© obrigatÃ³rio
        }

        if (tipo === "" || tipo === null) {
            formContext.getControl("frt_tipo").addNotification({ messages: ['Informe o campo Tipo.'], notificationLevel: 'ERROR' });
            return;
        }
        else
            formContext.getControl("frt_tipo").clearNotification();

        cpfCnpj = Fortics.Dyn365.Validacoes.RemoverCaracteresEspeciais(cpfCnpj);

        if (tipo == EnumTipo.CPF) {
            if (!Fortics.Dyn365.Validacoes.VerificarCpf(cpfCnpj))
                formContext.getControl("frt_cnpj_cpf").addNotification({ messages: ['O CPF digitado Ã© invÃ¡lido.'], notificationLevel: 'ERROR' });
            else {
                formContext.getControl("frt_cnpj_cpf").clearNotification();
                var cpfFormatado = Fortics.Dyn365.Validacoes.FormatarCpf(cpfCnpj);
                formContext.getAttribute("frt_cnpj_cpf").setValue(cpfFormatado);
            }
        }
        else if (tipo == EnumTipo.CNPJ) {
            if (!Fortics.Dyn365.Validacoes.VerificarCnpj(cpfCnpj))
                formContext.getControl("frt_cnpj_cpf").addNotification({ messages: ['O CNPJ digitado Ã© invÃ¡lido.'], notificationLevel: 'ERROR' });
            else {
                formContext.getControl("frt_cnpj_cpf").clearNotification();
                var cnpjFormatado = Fortics.Dyn365.Validacoes.FormatarCnpj(cpfCnpj);
                formContext.getAttribute("frt_cnpj_cpf").setValue(cnpjFormatado);
            }
        }
    },

    OnLoad: function (executionContext) {
        Fortics.Dyn365.Lead.globalContext = executionContext;
        FormContext = SDKore.GetFormContext(executionContext);

        FormContext.getAttribute("mobilephone").addOnChange(Fortics.Dyn365.Lead.OnChange_mobilephone);
        FormContext.getAttribute("address2_telephone2").addOnChange(Fortics.Dyn365.Lead.OnChange_address2_telephone2);
        FormContext.getAttribute("address2_telephone3").addOnChange(Fortics.Dyn365.Lead.OnChange_address2_telephone3);
        FormContext.getAttribute("telephone1").addOnChange(Fortics.Dyn365.Lead.OnChange_telephone1);
        FormContext.getAttribute("telephone2").addOnChange(Fortics.Dyn365.Lead.OnChange_telephone2);
        FormContext.getAttribute("telephone3").addOnChange(Fortics.Dyn365.Lead.OnChange_telephone3);
        FormContext.getAttribute("frt_whatsapp").addOnChange(Fortics.Dyn365.Lead.OnChange_frt_whatsapp);
        FormContext.getAttribute("address1_telephone2").addOnChange(Fortics.Dyn365.Lead.OnChange_address1_telephone2);
        FormContext.getAttribute("address1_telephone3").addOnChange(Fortics.Dyn365.Lead.OnChange_address1_telephone3);
        FormContext.getAttribute("frt_cnpj_cpf").addOnChange(Fortics.Dyn365.Lead.OnChange_frt_cnpj_cpf);
        FormContext.getAttribute("frt_produtos").addOnChange(Fortics.Dyn365.Lead.OnChangeProdutos);
        FormContext.getAttribute("frt_canais_desejados").addOnChange(Fortics.Dyn365.Lead.OnChangeQuaisCanaisDesejaUtilizar);
        FormContext.getAttribute("frt_possui_site").addOnChange(Fortics.Dyn365.Lead.OnChangePossuiWebSite);
        FormContext.getAttribute("frt_possui_facebook").addOnChange(Fortics.Dyn365.Lead.OnChangePossuiFacebook);

        Fortics.Dyn365.Lead.VisibilidadeTelefones();
        Fortics.Dyn365.Lead.ObrigatoriedadeQuaisCanaisDesajaUtilizar();
        Fortics.Dyn365.Lead.OnChangeQuaisCanaisDesejaUtilizar();

        if (top.MscrmControls.FieldControls.PhoneNumberControl)
            top.MscrmControls.FieldControls.PhoneNumberControl.prototype.action = function () {
                Fortics.Dyn365.Click2Call.DiscarAsync(Fortics.Dyn365.Lead.globalContext, this._value);
            };
    },

    //Telefone celular
    OnChange_mobilephone: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, true);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    //Telefone celular2
    OnChange_address2_telephone2: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, true);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    //Telefone celular3
    OnChange_address2_telephone3: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, true);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    //Telefone comercial
    OnChange_telephone1: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    //Telefone comercial 2
    OnChange_telephone2: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    //Telefone comercial 3
    OnChange_telephone3: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    //Whatsapp
    OnChange_frt_whatsapp: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    //Whatsapp 2
    OnChange_address1_telephone2: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    //Whatsapp 3
    OnChange_address1_telephone3: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Lead.VisibilidadeTelefones();
    },

    VisibilidadeTelefones: function () {

        const telefonesCelulares = {
            campoTelefoneUm: "mobilephone",
            campoTelefoneDois: "address2_telephone2",
            campoTelefoneTres: "address2_telephone3",
        };
        Fortics.Dyn365.VisibilidadeTelefones.OcultarMostrarTelefones(FormContext, telefonesCelulares);

        const telefonesComerciais = {
            campoTelefoneUm: "telephone1",
            campoTelefoneDois: "telephone2",
            campoTelefoneTres: "telephone3",
        };
        Fortics.Dyn365.VisibilidadeTelefones.OcultarMostrarTelefones(FormContext, telefonesComerciais);

        const telefonesWhatsapps = {
            campoTelefoneUm: "frt_whatsapp",
            campoTelefoneDois: "address1_telephone2",
            campoTelefoneTres: "address1_telephone3",
        };
        Fortics.Dyn365.VisibilidadeTelefones.OcultarMostrarTelefones(FormContext, telefonesWhatsapps);
    },

    ConsultarReceita: function () {
        var tipo = FormContext.getAttribute("frt_tipo").getValue();
        var cnpj = FormContext.getAttribute("frt_cnpj_cpf").getValue();

        if (tipo != EnumTipo.CNPJ || cnpj == "" || cnpj === null)
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
                        FormContext.getAttribute("companyname").setValue(empresa.name);
                        FormContext.getAttribute("frt_nome_fantasia").setValue(empresa.frt_nome_fantasia);
                        if (FormContext.getAttribute("telephone1").getValue() == null || FormContext.getAttribute("telephone1").getValue() == "")
                            FormContext.getAttribute("telephone1").setValue(empresa.telephone1);
                        if (FormContext.getAttribute("emailaddress1").getValue() == null || FormContext.getAttribute("emailaddress1").getValue() == "")
                            FormContext.getAttribute("emailaddress1").setValue(empresa.emailaddress1);
                        FormContext.getAttribute("address1_line1").setValue(empresa.address1_line1);
                        FormContext.getAttribute("address1_line2").setValue(empresa.address1_line2);
                        FormContext.getAttribute("address1_line3").setValue(empresa.address1_line3);
                        FormContext.getAttribute("address1_county").setValue(empresa.address1_county);
                        FormContext.getAttribute("address1_city").setValue(empresa.address1_city);
                        FormContext.getAttribute("address1_stateorprovince").setValue(empresa.address1_stateorprovince);
                        FormContext.getAttribute("address1_postalcode").setValue(empresa.address1_postalcode);
                        FormContext.getAttribute("address1_country").setValue("Brasil");
                        FormContext.getAttribute("frt_capital_social").setValue(empresa.marketcap);
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

    OnChange_frt_cnpj_cpf: function () {
        Fortics.Dyn365.Lead.ConsultarReceita();
    },

    ObrigatoriedadeQuaisCanaisDesajaUtilizar: function () {
        var produtos = FormContext.getAttribute("frt_produtos").getValue();
        FormContext.getAttribute("frt_canais_desejados").setRequiredLevel("none");

        var produtoSzChat = 173180000;
        if (produtos != null) {
            for (var i = 0; i < produtos.length; i++) {
                if (produtos[i] == produtoSzChat) {
                    FormContext.getAttribute("frt_canais_desejados").setRequiredLevel("required");
                    break;
                }
            }
        }

    },

    OnChangeProdutos: function () {
        Fortics.Dyn365.Lead.ObrigatoriedadeQuaisCanaisDesajaUtilizar();
    },

    OnChangeQuaisCanaisDesejaUtilizar: function () {
        var canaisDesejados = FormContext.getAttribute("frt_canais_desejados").getValue();
        var canalWhatsApp = 173180000;
        var canalWhatsAppBusinessAPI = 173180001;
        var whatsApp = false;
        if (canaisDesejados != null) {
            for (var i = 0; i < canaisDesejados.length; i++) {
                if (canaisDesejados[i] == canalWhatsApp || canaisDesejados[i] == canalWhatsAppBusinessAPI) {
                    whatsApp = true;
                    break;
                }
            }
        }
        if (whatsApp) {
            if (!FormContext.getAttribute("frt_possui_site").getValue())
                FormContext.getAttribute("frt_possui_site").setValue(true);
            if (!FormContext.getAttribute("frt_possui_facebook").getValue())
                FormContext.getAttribute("frt_possui_facebook").setValue(true);
        }
        Fortics.Dyn365.Lead.OnChangePossuiWebSite();
        Fortics.Dyn365.Lead.OnChangePossuiFacebook();
    },

    OnChangePossuiWebSite: function () {
        if (FormContext.getAttribute("frt_possui_site").getValue()) {
            FormContext.getAttribute("websiteurl").setRequiredLevel("required");
            FormContext.getControl("websiteurl").setVisible(true);
        }
        else {
            FormContext.getAttribute("websiteurl").setRequiredLevel("none");
            FormContext.getControl("websiteurl").setVisible(false);
        }
    },

    OnChangePossuiFacebook: function () {
        if (FormContext.getAttribute("frt_possui_facebook").getValue()) {
            FormContext.getAttribute("frt_pagina_facebook").setRequiredLevel("required");
            FormContext.getControl("frt_pagina_facebook").setVisible(true);
        }
        else {
            FormContext.getAttribute("frt_pagina_facebook").setRequiredLevel("none");
            FormContext.getControl("frt_pagina_facebook").setVisible(false);
        }
    },
    ObrigatoriedadeQualificacao: function () {
        FormContext.getAttribute("frt_produtos").setRequiredLevel("required");
        FormContext.getAttribute("frt_tipo").setRequiredLevel("required");
        FormContext.getAttribute("frt_cnpj_cpf").setRequiredLevel("required");
        FormContext.getAttribute("companyname").setRequiredLevel("required");
        FormContext.getAttribute("mobilephone").setRequiredLevel("required");
    }
}