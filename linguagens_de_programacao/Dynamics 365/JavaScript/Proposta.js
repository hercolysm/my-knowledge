//'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Proposta = {

    FormContext: null,

    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        this.MudarValorPropostaPrincipal();

        FormContext.getAttribute("frt_status_fechamento").addOnChange(Fortics.Dyn365.Proposta.OnChangeStatusFechamento);
        FormContext.getAttribute("customerid").addOnChange(Fortics.Dyn365.Proposta.OnChangeEmpresa);

        Fortics.Dyn365.Proposta.SetFilterContato();

    },
    OnChangeCpfTestemunha: function (executionContext) {
        Fortics.Dyn365.Proposta.CpfTestemunhaValido(executionContext);
    },
    CpfTestemunhaValido: function (executionContext) {
        var formContext = SDKore.GetFormContext(executionContext);
        var cpf = formContext.getAttribute("frt_cpf_testemunha").getValue();
        if (cpf == null || cpf == "")
            return true;

        if (!Fortics.Dyn365.Validacoes.VerificarCpf(cpf)) {
            Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", title: "CPF invÃ¡lido", text: "O CPF digitado Ã© invÃ¡lido." }, { height: 100, width: 300 });
            return false;
        }
        else {
            var cpfFormatado = Fortics.Dyn365.Validacoes.FormatarCpf(cpf);
            formContext.getAttribute("frt_cpf_testemunha").setValue(cpfFormatado);
            return true;
        }
    },
    OnSave: function (executionContext) {
        if (!Fortics.Dyn365.Proposta.CpfTestemunhaValido(executionContext))
            SDKore.DisableAutoSave(executionContext);
    },
    ValidarPropostaPrimÃ¡ria: function (executionContext) {
        var formContext = SDKore.GetFormContext(executionContext);
        var propostaPrincipal = formContext.getAttribute("frt_proposta_principal").getValue();
        if (!propostaPrincipal)
            return;

        var oportunidade = formContext.getAttribute("opportunityid").getValue();
        if (oportunidade == null) {
            formContext.getAttribute("frt_proposta_principal").setValue(false);
            Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", title: "Oportunindade vazia", text: "Favor preencher o campo Oportunidade" }, { height: 100, width: 300 }).then();
            return;
        }
        var propostaId = formContext.data.entity.getId();
        var filter = "?$filter=frt_proposta_principal eq true and  _opportunityid_value eq " + oportunidade[0].id;
        if (propostaId !== "")
            filter = filter + " and  quoteid ne " + propostaId;

        Xrm.WebApi.retrieveMultipleRecords("quote", filter).then(
            function success(result) {
                if (result.entities.length > 0) {
                    var confirmStrings = { confirmButtonLabel: "Confirmar", text: "Ao definir essa proposta como principal, a outra proposta serÃ¡ alterada para secundÃ¡ria. Tem certeza?", title: "Proposta Principal existente" };
                    Xrm.Navigation.openConfirmDialog(confirmStrings).then(
                        function (success) {
                            if (!success.confirmed)
                                formContext.getAttribute("frt_proposta_principal").setValue(false);
                        }
                    );
                }
            },
        );

    },

    OnChangePropostaPrimaria: function (executionContext) {
        Fortics.Dyn365.Proposta.ValidarPropostaPrimÃ¡ria(executionContext);
    },

    OnChangeOportunidade: function (executionContext) {
        Fortics.Dyn365.Proposta.ValidarPropostaPrimÃ¡ria(executionContext);
    },

    MudarValorPropostaPrincipal: function () {
        if (FormContext.getAttribute("frt_mudar_valor_proposta_principal").getValue() == null ||
            FormContext.getAttribute("frt_mudar_valor_proposta_principal").getValue()) {
            FormContext.getAttribute("frt_proposta_principal").setValue(true);
            FormContext.getAttribute("frt_mudar_valor_proposta_principal").setValue(false);
        }
    },

    OnChangeStatusFechamento: () => {
        Fortics.Dyn365.Proposta.ValidarNovaVendaGanha();
    },
    ValidarNovaVendaGanha: async () => {

        try {
            var statusFechamento = FormContext.getAttribute("frt_status_fechamento").getValue();
            var oportunidade = FormContext.getAttribute("opportunityid").getValue();
            var novaVenda = 173180000;
            var szChat = 173180000;
            var ehProdutoSzChat = false;
            var obrigarCampos = false;
            var empresaId = null;
            var frt_identificar_contatos_suporte = null;
            var frt_modelo_ativacao = null;
            var frt_numero_homologado = null;
            var frt_numero_utilizado = null;
            var frt_orientar_cliente = null;
            var _frt_responsavel_assinar_value = null;
            var _frt_responsavel_ativacao_value = null;
            var _frt_responsavel_financeiro_value = null;
            var frt_tipo = null;
            var qualificationcomments = null;
            var frt_canais_utilizados = null;
            var frt_canais_desejados = null;
            var frt_setor_utilizador = null;
            var frt_bsp_desejados = null;
            var frt_produtos = null;
            var websiteurl = null;
            var camposObrigatorios = "";
            var frt_possui_facebook = null;
            var frt_pagina_facebook = null;
            var frt_facebook_business = null;

            if (oportunidade == null)
                return;

            if (statusFechamento == null || statusFechamento[0].name.toUpperCase() != "GANHO")
                return;

            await Xrm.WebApi.online.retrieveRecord("opportunity", oportunidade[0].id, "?$select=_customerid_value,frt_identificar_contatos_suporte,frt_modelo_ativacao,frt_numero_homologado,frt_numero_utilizado,frt_orientar_cliente,_frt_responsavel_assinar_value,_frt_responsavel_ativacao_value,_frt_responsavel_financeiro_value,frt_tipo,qualificationcomments,frt_canais_utilizados,frt_canais_desejados,frt_setor_utilizador,frt_bsp_desejados,frt_produtos,frt_possui_facebook,frt_pagina_facebook, frt_facebook_business").then(
                function success(result) {
                    empresaId = result["_customerid_value"];
                    frt_identificar_contatos_suporte = result["frt_identificar_contatos_suporte"];
                    frt_modelo_ativacao = result["frt_modelo_ativacao"];
                    frt_numero_homologado = result["frt_numero_homologado"];
                    frt_numero_utilizado = result["frt_numero_utilizado"];
                    frt_orientar_cliente = result["frt_orientar_cliente"];
                    _frt_responsavel_assinar_value = result["_frt_responsavel_assinar_value"];
                    _frt_responsavel_ativacao_value = result["_frt_responsavel_ativacao_value"];
                    _frt_responsavel_financeiro_value = result["_frt_responsavel_financeiro_value"];
                    frt_tipo = result["frt_tipo"];
                    qualificationcomments = result["qualificationcomments"];
                    frt_canais_utilizados = result["frt_canais_utilizados"];
                    frt_canais_desejados = result["frt_canais_desejados"];
                    frt_setor_utilizador = result["frt_setor_utilizador"];
                    frt_bsp_desejados = result["frt_bsp_desejados"];
                    frt_produtos = result["frt_produtos"];
                    frt_possui_facebook = result["frt_possui_facebook"];
                    frt_pagina_facebook = result["frt_pagina_facebook"];
                    frt_facebook_business = result["frt_facebook_business"];
                },
            );

            if (frt_produtos != null && frt_produtos != "") {
                var produtos = frt_produtos.split(",");
                for (var i = 0; i < produtos.length; i++) {
                    if (produtos[i] == szChat) {
                        ehProdutoSzChat = true;
                        break;
                    }
                }
            }

            if (frt_tipo != novaVenda || !ehProdutoSzChat)
                return;


            var empresaParceiraId = null;
            var contatoPrimario = null;
            var qualificacao = null;
            var revenda = 173180001;

            await Xrm.WebApi.online.retrieveRecord("account", empresaId, "?$select=_frt_empresa_parceira_value,_primarycontactid_value,frt_qualificacao,websiteurl").then(
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

            if (!obrigarCampos)
                return;


            var permiteSuporte = false;
            await Xrm.WebApi.online.retrieveMultipleRecords("contact", "?$select=frt_permite_suporte&$filter=_parentcustomerid_value eq " + empresaId + " and frt_permite_suporte eq true").then(
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
            if (!permiteSuporte)
                camposObrigatorios = camposObrigatorios + "\nContato - Permitir Suporte";

            var whatsApp = false;
            if (frt_canais_desejados != null && frt_canais_desejados != "") {
                var canaisDesejados = frt_canais_desejados.split(',');
                var canalWhatsApp = "173180000";
                var canalWhatsAppBusinessAPI = "173180001";
                for (var i = 0; i < canaisDesejados.length; i++) {
                    if (canaisDesejados[i] == canalWhatsApp || canaisDesejados[i] == canalWhatsAppBusinessAPI) {
                        whatsApp = true;
                        break;
                    }
                }
            }
            if (whatsApp) {
                if (websiteurl == null)
                    camposObrigatorios = camposObrigatorios + "\nEmpresa - Site";
                if (frt_bsp_desejados == null)
                    camposObrigatorios = camposObrigatorios + "\nQual BSP serÃ¡ utilizado ?"
                if (frt_numero_homologado == null)
                    camposObrigatorios = camposObrigatorios + "\nNÃºmero homologado no BSP?"
                if (frt_numero_utilizado == null)
                    camposObrigatorios = camposObrigatorios + "\nQual NÃºmero SerÃ¡ Utilizado?"
                if (!frt_possui_facebook)
                    camposObrigatorios = camposObrigatorios + "\nPossui PÃ¡gina no Facebook?"
                if (frt_pagina_facebook == null)
                    camposObrigatorios = camposObrigatorios + "\nPÃ¡gina do Facebook"
                if (frt_facebook_business == null)
                    camposObrigatorios = camposObrigatorios + "\nPossui Conta no Facebook Business?"
            }

            if (!frt_identificar_contatos_suporte)
                camposObrigatorios = camposObrigatorios + "\nIdentificar contatos para suporte"
            if (!frt_orientar_cliente)
                camposObrigatorios = camposObrigatorios + "\nOrientar quanto a Base de Conhecimento/FÃ³rum/Livro"
            if (frt_modelo_ativacao == null)
                camposObrigatorios = camposObrigatorios + "\nModelo de AtivaÃ§Ã£o"            
            if (_frt_responsavel_assinar_value == null || _frt_responsavel_assinar_value == "")
                camposObrigatorios = camposObrigatorios + "\nResponsÃ¡vel por assinar"
            if (_frt_responsavel_ativacao_value == null || _frt_responsavel_ativacao_value == "")
                camposObrigatorios = camposObrigatorios + "\nResponsÃ¡vel pela AtivaÃ§Ã£o"
            if (_frt_responsavel_financeiro_value == null || _frt_responsavel_financeiro_value == "")
                camposObrigatorios = camposObrigatorios + "\nResponsÃ¡vel Financeiro"
            if (qualificationcomments == null || qualificationcomments == "")
                camposObrigatorios = camposObrigatorios + "\nQual a Entrega de Valor?"
            if (frt_canais_utilizados == null)
                camposObrigatorios = camposObrigatorios + "\nQuais Canais Utiliza?"
            if (frt_canais_desejados == null)
                camposObrigatorios = camposObrigatorios + "\nQuais Canais Deseja Utilizar ?"
            if (frt_setor_utilizador == null)
                camposObrigatorios = camposObrigatorios + "\nQuais Setores UtilizarÃ£o a SoluÃ§Ã£o?"

            if (camposObrigatorios != "") {
                FormContext.getAttribute("frt_status_fechamento").setValue(null);
                Xrm.Navigation.openAlertDialog({ title: "Erro ao fechar Proposta", text: "NÃ£o Ã© possÃ­vel fechar a Proposta como 'Ganho', pois existem campos obrigatÃ³rios a serem preenchidos na oportunidade:\n" + camposObrigatorios }, { height: 400, width: 400 });
            }
        }
        catch (e) {
            Xrm.Navigation.openErrorDialog({ details: JSON.stringify(e), message: 'MÃ©todo ValidarNovaVendaGanha' });
        }
    },
    SetFilterContato: function () {
        var empresa = FormContext.getAttribute("customerid").getValue();
        var accountId = "";
        if (empresa != null)
            accountId = empresa[0].id;

        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_contato");
        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_responsavel_assinar");
    },

    OnChangeEmpresa: function () {
        Fortics.Dyn365.Proposta.SetFilterContato();

    },

    GerarDocumentoSignature: function (template) {
        
        var propostaId = FormContext.data.entity.getId();
        if (propostaId == "") {
            Xrm.Navigation.openErrorDialog({ message: 'Para gerar o documento signature, primeiramente salve a proposta.' });
            return;
        }
        var parameters = {};
        parameters.propostaId = propostaId;
        parameters.templateId = template;

        var req = new XMLHttpRequest();
        req.open("POST", FormContext.context.getClientUrl() + "/api/data/v9.1/frt_gerar_documento_signature", false);
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.onreadystatechange = function () {
            if (this.readyState === 4) {
                req.onreadystatechange = null;
                if (this.status === 200) {
                    var results = JSON.parse(this.response);

                    if (results["documentoCriado"]) {
                        Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", title: "Documento Signature", text: results["mensagem"] }, { height: 100, width: 300 }).then(
                            function (success) {
                                let entityFormOptions = {
                                    entityName: "frt_documento_signature",
                                    entityId: results["documentoSignatureId"]
                                };
                                Xrm.Navigation.openForm(entityFormOptions);
                            }
                        );
                    }
                    else
                        Xrm.Navigation.openErrorDialog({ message: results["mensagem"] });
                } else
                    Xrm.Navigation.openErrorDialog({ message: this.statusText });
            }
        };
        req.send(JSON.stringify(parameters));

    },

    AbrirPopUpModelosProposta: function () {
        
        FormContext.data.save(null).then(successCallback, errorCallback);
        function successCallback() {
            var propostaId = FormContext.data.entity.getId();

            var windowOptions = { height: 200, width: 800 };
            Xrm.Navigation.openWebResource("frt_modelos_propostas_signature", windowOptions, propostaId);
        }
        function errorCallback() {
        }
    },
    EsconderBotaoAntigo: function(){
        return false;
    },
    AbrirPopUpModelosPropostaEnvioHSM: function () {

        FormContext.data.save(null).then(successCallback, errorCallback);
        function successCallback() {
            var propostaId = FormContext.data.entity.getId();

            var windowOptions = { height: 200, width: 800 };
            Xrm.Navigation.openWebResource("frt_proposta_envio_whatsapp", windowOptions, propostaId);
        }
        function errorCallback() {
        }
    },
}