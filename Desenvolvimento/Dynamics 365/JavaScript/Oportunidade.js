///'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Oportunidade = {

    FormContext: null,

    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        FormContext.getAttribute("frt_status_fechamento").addOnChange(Fortics.Dyn365.Oportunidade.OnChangeStatusFechamento);
        FormContext.getAttribute("frt_tipo").addOnChange(Fortics.Dyn365.Oportunidade.OnChangeTipo);
        FormContext.getAttribute("frt_orientar_cliente").addOnChange(Fortics.Dyn365.Oportunidade.OnChange_frt_orientar_cliente);
        FormContext.getAttribute("frt_identificar_contatos_suporte").addOnChange(Fortics.Dyn365.Oportunidade.OnChange_frt_identificar_contatos_suporte);
        FormContext.getAttribute("parentaccountid").addOnChange(Fortics.Dyn365.Oportunidade.OnChangeEmpresa);
        FormContext.getAttribute("frt_bsp_desejados").addOnChange(Fortics.Dyn365.Oportunidade.OnChangeBspDesajados);

        

        Fortics.Dyn365.Oportunidade.SetFilterContato();
        Fortics.Dyn365.Oportunidade.PreencherTipoCliente(true);
        Fortics.Dyn365.Oportunidade.BloquearTipoVigente();
        Fortics.Dyn365.Oportunidade.VisibilidadeAbaAcrescimoReducao();
        Fortics.Dyn365.Oportunidade.VisibilidadeCampoAcrescimoReducao();
        Fortics.Dyn365.Oportunidade.SetBPF();
        Fortics.Dyn365.Oportunidade.RegrasOutroBspDesajados();        
    },

    OnChangeEmpresa: function () {
        Fortics.Dyn365.Oportunidade.SetFilterContato();
        Fortics.Dyn365.Oportunidade.PreencherTipoCliente(false);
    },

    PreencherTipoCliente: async (onLoad) => {
        return;
        var tipoCliente = FormContext.getAttribute("frt_pl_tipo_cliente").getValue();
        var empresa = FormContext.getAttribute("parentaccountid").getValue();

        if (onLoad && tipoCliente != null)
            return;

        tipoCliente = Fortics.Dyn365.OportunidadeEnum.TipoCliente.Novo;

        if (empresa != null) {
            var empresaId = (empresa[0].id).replace('{', '').replace('}', '');

            var resultOportunidadesGanhas = null;
            await Xrm.WebApi.online.retrieveMultipleRecords("opportunity", "?$select=_frt_oportunidadesid_value&$filter=_parentaccountid_value eq " + empresaId +
                " and statecode eq " + Fortics.Dyn365.OportunidadeEnum.StateCode.Ganha).then(
                    function success(results) {
                        resultOportunidadesGanhas = results;
                    },
                );
            if (resultOportunidadesGanhas != null && resultOportunidadesGanhas.entities != null && resultOportunidadesGanhas.entities.length > 0) {
                var canceladoEnum = 2;
                for (var i = 0; i < resultOportunidadesGanhas.entities.length; i++) {
                    if (resultOportunidadesGanhas.entities[i]._frt_oportunidadesid_value != null && resultOportunidadesGanhas.entities[i]._frt_oportunidadesid_value != "") {
                        var resultCancelamento = null;
                        await Xrm.WebApi.online.retrieveRecord("frt_cancelamentos", resultOportunidadesGanhas.entities[i]._frt_oportunidadesid_value, "?$select=statuscode").then(
                            function success(result) {
                                resultCancelamento = result;
                            },
                        );
                        if (resultCancelamento != null && resultCancelamento["statuscode"] != canceladoEnum) {
                            tipoCliente = Fortics.Dyn365.OportunidadeEnum.TipoCliente.Antigo;
                            break;
                        }
                    }
                    else {
                        tipoCliente = Fortics.Dyn365.OportunidadeEnum.TipoCliente.Antigo;
                        break;
                    }
                }
            }

            FormContext.getAttribute("frt_pl_tipo_cliente").setValue(tipoCliente);
        }
        else
            FormContext.getAttribute("frt_pl_tipo_cliente").setValue(null);
    },

    OnChangeStatusFechamento: function () {
        Fortics.Dyn365.Oportunidade.ValidarNovaVendaGanha();
    },

    ValidarNovaVendaGanha: async () => {
        
        var statusFechamento = FormContext.getAttribute("frt_status_fechamento").getValue();
        var empresa = FormContext.getAttribute("parentaccountid").getValue();
        var tipo = FormContext.getAttribute("frt_tipo").getValue();
        var novaVenda = 173180000;
        var obrigarCampos = false;
        var szChat = 173180000;
        var websiteurl = null;
        var produto = FormContext.getAttribute("frt_produtos").getValue();
        var ehProdutoSzChat = false;
        if (produto != null) {
            for (var i = 0; i < produto.length; i++) {
                if (produto[i] == szChat) {
                    ehProdutoSzChat = true;
                    break;
                }
            }
        }

        if (tipo == novaVenda && statusFechamento != null && statusFechamento[0].name.toUpperCase() == "GANHO" && ehProdutoSzChat) {
            var empresaParceiraId = null;
            var contatoPrimario = null;
            var qualificacao = null;
            var revenda = 173180001;

            await Xrm.WebApi.online.retrieveRecord("account", empresa[0].id, "?$select=_frt_empresa_parceira_value,_primarycontactid_value,frt_qualificacao,websiteurl").then(
                function success(result) {
                    empresaParceiraId = result["_frt_empresa_parceira_value"];
                    contatoPrimario = result["_primarycontactid_value"];
                    qualificacao = result["frt_qualificacao"];
                    websiteurl = result["websiteurl"];
                },
            );
            if (qualificacao != revenda) {
                if (empresaParceiraId != null && empresaParceiraId != "") {
                    var empresaParceiraQualificacao = null;
                    await Xrm.WebApi.online.retrieveRecord("account", empresaParceiraId, "?$select=frt_qualificacao").then(
                        function success(result) {
                            empresaParceiraQualificacao = result["frt_qualificacao"];
                        },
                    );

                    if (empresaParceiraQualificacao != revenda)
                        obrigarCampos = true;
                }
                else
                    obrigarCampos = true;
            }                       
        }

        if (obrigarCampos) {
            var permiteSuporte = false;
            await Xrm.WebApi.online.retrieveMultipleRecords("contact", "?$select=frt_permite_suporte&$filter=_parentcustomerid_value eq " + empresa[0].id + " and frt_permite_suporte eq true").then(
                function success(results) {
                    if (results.entities.length > 0)
                        permiteSuporte = true;
                },
            );

            if (!permiteSuporte && contatoPrimario != null) {
                await Xrm.WebApi.online.retrieveRecord("contact", contatoPrimario, "?$select=frt_permite_suporte").then(
                    function success(result) {
                        permiteSuporte = result["frt_permite_suporte"];
                    },
                );
            }
            if (!permiteSuporte) {
                FormContext.getAttribute("frt_status_fechamento").setValue(null);
                Xrm.Navigation.openAlertDialog({ title: "Erro ao fechar oportunidade", text: "NÃ£o Ã© possÃ­vel fechar a oportunidade como 'Ganho', pois nenhum contato estÃ¡ configurado para permitir suporte" });
            }

            FormContext.getAttribute("qualificationcomments").setRequiredLevel("required");
            FormContext.getAttribute("frt_canais_utilizados").setRequiredLevel("required");
            FormContext.getAttribute("frt_canais_desejados").setRequiredLevel("required");
            FormContext.getAttribute("frt_setor_utilizador").setRequiredLevel("required");
            FormContext.getAttribute("frt_modelo_ativacao").setRequiredLevel("required");
            FormContext.getAttribute("frt_responsavel_assinar").setRequiredLevel("required");
            FormContext.getAttribute("frt_responsavel_ativacao").setRequiredLevel("required");
            FormContext.getAttribute("frt_responsavel_financeiro").setRequiredLevel("required");

            if (!FormContext.getAttribute("frt_orientar_cliente").getValue()) {
                FormContext.getAttribute("frt_status_fechamento").setValue(null);
                Xrm.Navigation.openAlertDialog({ title: "Erro ao fechar oportunidade", text: "NÃ£o Ã© possÃ­vel fechar a oportunidade como 'Ganho', pois Ã© necessÃ¡rio marcar o campo 'Orientar quanto a Base de Conhecimento/FÃ³rum/Livro' como concluÃ­do." });
            }

            if (!FormContext.getAttribute("frt_identificar_contatos_suporte").getValue()) {
                FormContext.getAttribute("frt_status_fechamento").setValue(null);
                Xrm.Navigation.openAlertDialog({ title: "Erro ao fechar oportunidade", text: "NÃ£o Ã© possÃ­vel fechar a oportunidade como 'Ganho', pois Ã© necessÃ¡rio marcar o campo 'Identificar contatos para suporte' como concluÃ­do." });
            }

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
                if (websiteurl == null) {
                    Xrm.Navigation.openAlertDialog({ title: "Erro ao fechar oportunidade", text: "NÃ£o Ã© possÃ­vel fechar a oportunidade como 'Ganho', pois Ã© necessÃ¡rio preencher o Site da empresa." });
                    FormContext.getAttribute("frt_status_fechamento").setValue(null);
                }
                FormContext.getAttribute("frt_pagina_facebook").setRequiredLevel("required");
                FormContext.getAttribute("frt_facebook_business").setRequiredLevel("required");
                FormContext.getAttribute("frt_bsp_desejados").setRequiredLevel("required");
                FormContext.getAttribute("frt_numero_homologado").setRequiredLevel("required");
                FormContext.getAttribute("frt_numero_utilizado").setRequiredLevel("required");
            }
            else {
                FormContext.getAttribute("frt_pagina_facebook").setRequiredLevel("none");
                FormContext.getAttribute("frt_facebook_business").setRequiredLevel("none");
                FormContext.getAttribute("frt_bsp_desejados").setRequiredLevel("none");
                FormContext.getAttribute("frt_numero_homologado").setRequiredLevel("none");
                FormContext.getAttribute("frt_numero_utilizado").setRequiredLevel("none");
            }
        }
        else {
            FormContext.getAttribute("qualificationcomments").setRequiredLevel("none");
            FormContext.getAttribute("frt_canais_utilizados").setRequiredLevel("none");
            FormContext.getAttribute("frt_canais_desejados").setRequiredLevel("none");
            FormContext.getAttribute("frt_setor_utilizador").setRequiredLevel("none");
            FormContext.getAttribute("frt_modelo_ativacao").setRequiredLevel("none");
            FormContext.getAttribute("frt_responsavel_assinar").setRequiredLevel("none");
            FormContext.getAttribute("frt_responsavel_ativacao").setRequiredLevel("none");
            FormContext.getAttribute("frt_responsavel_financeiro").setRequiredLevel("none");

            FormContext.getControl("frt_orientar_cliente").clearNotification();
            FormContext.getControl("frt_identificar_contatos_suporte").clearNotification();
        }

    },

    OnChangeTipo: function () {
        Fortics.Dyn365.Oportunidade.ValidarNovaVendaGanha();
        Fortics.Dyn365.Oportunidade.VisibilidadeAbaAcrescimoReducao();
        Fortics.Dyn365.Oportunidade.VisibilidadeCampoAcrescimoReducao();
    },
    OnChange_frt_orientar_cliente: function () {
        if (FormContext.getAttribute("frt_orientar_cliente").getValue())
            FormContext.getControl("frt_orientar_cliente").clearNotification();
    },
    OnChange_frt_identificar_contatos_suporte: function () {
        if (FormContext.getAttribute("frt_identificar_contatos_suporte").getValue())
            FormContext.getControl("frt_identificar_contatos_suporte").clearNotification();
    },

    BloquearTipoVigente: function () {
        if (FormContext.getAttribute("frt_tipo").getValue() == Fortics.Dyn365.OportunidadeEnum.Tipo.Vigente)
            FormContext.getControl("frt_tipo").setDisabled(true);
        else
            FormContext.getControl("frt_tipo").removeOption(Fortics.Dyn365.OportunidadeEnum.Tipo.Vigente);
    },
    SetFilterContato: function () {
        var empresa = FormContext.getAttribute("parentaccountid").getValue();
        var accountId = "";
        if (empresa != null)
            accountId = empresa[0].id;

        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_responsavel_assinar");
        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "parentcontactid");
        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_responsavel_ativacao");
        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_responsavel_financeiro");
    },
    VisibilidadeAbaAcrescimoReducao: function () {
        if (FormContext.getAttribute("frt_tipo").getValue() == Fortics.Dyn365.OportunidadeEnum.Tipo.Vigente ||
            FormContext.getAttribute("frt_tipo").getValue() == Fortics.Dyn365.OportunidadeEnum.Tipo.Acrescimo ||
            FormContext.getAttribute("frt_tipo").getValue() == Fortics.Dyn365.OportunidadeEnum.Tipo.Reducao)
            FormContext.ui.tabs.get("tab_acrescimo_reducao").setVisible(true);
        else
            FormContext.ui.tabs.get("tab_acrescimo_reducao").setVisible(false);
    },

    SetBPF: function () {
        var processoVendasOportunidadeId = "3e8ebee6-a2bc-4451-9c5f-b146b085413a";
        var activeProcess = FormContext.data.process.getActiveProcess();
        var currProcessId = activeProcess.getId();
        if (currProcessId.toLowerCase() == processoVendasOportunidadeId)
            return;
        FormContext.data.process.setActiveProcess(processoVendasOportunidadeId, myCallBack);
        function myCallBack(response) {
            if (response == "success") {
                //alert("BPF changed!!!");
                //// Save the form
                //Xrm.Page.data.entity.save();
            }
            else {
                alert("Error changing BPF!!!");
            }
        }
    },

    VisibilidadeCampoAcrescimoReducao: function () {
        if (FormContext.getAttribute("frt_tipo").getValue() != Fortics.Dyn365.OportunidadeEnum.Tipo.Vigente) {
            FormContext.getControl("frt_mn_valor_acrescimo_reducao").setVisible(false);
            FormContext.getAttribute("frt_mn_valor_acrescimo_reducao").setRequiredLevel("none");
        }
        else {
            FormContext.getControl("frt_mn_valor_acrescimo_reducao").setVisible(true);
            FormContext.getAttribute("frt_mn_valor_acrescimo_reducao").setRequiredLevel("required");
        }

    },
    RegrasOutroBspDesajados: function () {
        var bspDesajados = FormContext.getAttribute("frt_bsp_desejados").getValue();
        var outros = false;
        var bspOutros = 173180007;
        if (bspDesajados != null) {
            for (var i = 0; i < bspDesajados.length; i++) {
                if (bspDesajados[i] == bspOutros) {
                    outros = true;
                    break;
                }
            }
        }
        if (outros) {
            FormContext.getControl("frt_outro_bsp_desejado").setVisible(true);
            FormContext.getAttribute("frt_outro_bsp_desejado").setRequiredLevel("required");
        }
        else {
            FormContext.getControl("frt_outro_bsp_desejado").setVisible(false);
            FormContext.getAttribute("frt_outro_bsp_desejado").setRequiredLevel("none");
        }
    },
    OnChangeBspDesajados: function () {
        Fortics.Dyn365.Oportunidade.RegrasOutroBspDesajados();
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
            if (!FormContext.getAttribute("frt_possui_facebook").getValue()) {
                FormContext.getAttribute("frt_possui_facebook").setValue(true);
                FormContext.getAttribute("frt_possui_facebook").fireOnChange()
            }

            FormContext.getAttribute("frt_bsp_desejados").setRequiredLevel("required");
            FormContext.getAttribute("frt_numero_homologado").setRequiredLevel("required");
            FormContext.getAttribute("frt_numero_utilizado").setRequiredLevel("required");
        }
        else {
            FormContext.getAttribute("frt_bsp_desejados").setRequiredLevel("none");
            FormContext.getAttribute("frt_numero_homologado").setRequiredLevel("none");
            FormContext.getAttribute("frt_numero_utilizado").setRequiredLevel("none");
        }
    },

}