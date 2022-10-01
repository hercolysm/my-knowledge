///'..\Library\SDKore.js'
///'Validacoes.js'
///'LicencaEnum.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Licenca = {

    globalContext: null,
    FormContext: null,

    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        FormContext.getAttribute("frt_pl_tipo_licenca").addOnChange(Fortics.Dyn365.Licenca.OnChangeTipoLicenca);
        FormContext.getAttribute("frt_agendar_desativacao").addOnChange(Fortics.Dyn365.Licenca.OnChangeAgendarDesativacao);
        FormContext.getAttribute("frt_st_erro_agendamento_desativacao").addOnChange(Fortics.Dyn365.Licenca.OnChangeErroAgendamentoDesativacao);
        FormContext.getAttribute("frt_empresa").addOnChange(Fortics.Dyn365.Licenca.OnChangeEmpresa);
        FormContext.getAttribute("frt_tipo_plano_signature").addOnChange(Fortics.Dyn365.Licenca.OnChangeTipoPlanoSignature);

        this.VisibilidadePorProduto(executionContext);
        this.EnviarServidorObrigatoriedade();
        this.AgendarDesativacao();
        this.RemoverOptionTipoContrato();
        this.SetWhiteLabelFilter();
        this.VisibilidadeLeadEmpresa();
        //this.VisibilidadeErroAgendamento();
        Fortics.Dyn365.Licenca.VisibilidadeContato();
        Fortics.Dyn365.Licenca.SetFilterContato();
        Fortics.Dyn365.Licenca.RegrasDataExpiracao();

    },

    OnSave: function (executionContext) {
        this.ApagarCamposIntegracao();
    },

    OnChangeHost: function (executionContext) {
        this.ValidarHost(executionContext);
    },

    OnChangeProduto: function (executionContext) {
        this.VisibilidadePorProduto(executionContext);
        this.EnviarServidorObrigatoriedade();
        this.PreencherSzChat4Status();
        this.RemoverOptionTipoContrato();
        this.PreencherFusoHorario();
        this.SetWhiteLabelFilter();
        Fortics.Dyn365.Licenca.VisibilidadeContato();
        Fortics.Dyn365.Licenca.RegrasDataExpiracao();
    },

    OnChangeMsgRetornoIntegracao: function (executionContext) {
        this.MensagemIntegracaqo(executionContext);
    },

    OnChangeEnviarServidor: function () {
        this.EnviarServidorObrigatoriedade();
    },

    OnChangeStatusSzChat4: function () {
        this.EnviarServidorObrigatoriedade();
    },

    OnChangeAgendarDesativacao: function () {
        FormContext.getAttribute("frt_motivo_desativacao").setValue(null);
        FormContext.getAttribute("frt_data_desativacao").setValue(null);
        if (FormContext.getAttribute("frt_agendar_desativacao").getValue())
            FormContext.getAttribute("frt_st_erro_agendamento_desativacao").setValue(null);
        Fortics.Dyn365.Licenca.AgendarDesativacao();
        Fortics.Dyn365.Licenca.EnviarServidorObrigatoriedade();
        //Fortics.Dyn365.Licenca.VisibilidadeErroAgendamento();
    },

    OnChageTipoContrato: function () {
        FormContext.getAttribute("frt_motivo_desativacao").setValue(null);
        FormContext.getAttribute("frt_data_desativacao").setValue(null);
        this.AgendarDesativacao();        
        this.PreencherSzChat4Status();
        this.RemoverOptionTipoContrato();
        Fortics.Dyn365.Licenca.RegrasDataExpiracao();


    },

    OnChageWhiteLabel: function () {
        this.SzChat4ObrigatoriedadeDominio();
    },
    OnChangeFusoHorario: function () {
        this.NotificarFusoHorario();
    },

    SzChat4ObrigatoriedadeDominio: function () {
        var enviarServidor = FormContext.getAttribute("frt_enviar_servidor").getValue();
        var agendarDesativacao = FormContext.getAttribute("frt_agendar_desativacao").getValue();
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null || produto[0].name.toUpperCase() != "SZ.CHAT 4")
            return;

        if (!enviarServidor && !agendarDesativacao) {
            FormContext.getAttribute("frt_dominio").setRequiredLevel("none");
            return;
        }

        var whiteLabel = FormContext.getAttribute("frt_white_label").getValue();
        if (whiteLabel != null) {
            Xrm.WebApi.online.retrieveRecord("frt_whitelabel", whiteLabel[0].id, "?$select=frt_dominio").then(
                function success(result) {
                    if (result["frt_dominio"] != "" && result["frt_dominio"] != null)
                        FormContext.getAttribute("frt_dominio").setRequiredLevel("none");
                    else
                        FormContext.getAttribute("frt_dominio").setRequiredLevel("required");
                }
            );
        }
        else
            FormContext.getAttribute("frt_dominio").setRequiredLevel("required");
    },

    ApagarCamposIntegracao: function () {
        if (FormContext.getAttribute("frt_enviar_servidor").getValue()) {
            //NecessÃ¡rio apagar os valores dos campos abaixo para que quando a integraÃ§Ã£o seja chamada novamente, esses campos serÃ£o preenchidos de novo e o onchange serÃ¡ disparado.
            FormContext.getAttribute("frt_st_msg_retorno_integracao").setValue("");
            FormContext.getAttribute("frt_bt_erro_integracao").setValue(false);
        }
    },

    ValidarHost: function (executionContext) {
        FormContext.getControl("frt_host").clearNotification();
        var host = FormContext.getAttribute("frt_host").getValue();
        if (host == "" || host == null)
            return;

        host = host.toLowerCase().replaceAll(" ", "");
        FormContext.getAttribute("frt_host").setValue(host);
        //Permitir o uso dos caracteres ".", "-" e "_"
        var validacaoHost = host.replaceAll(".", "").replaceAll("_", "");

        var alphaExp = /^[a-zA-Z-0-9]+$/;
        if (!validacaoHost.match(alphaExp)) {
            Xrm.Navigation.openAlertDialog({
                title: "Host invÃ¡lido!", text: "O campo host nÃ£o pode conter os seguintes valores:" +
                    "\n- EspaÃ§os" +
                    "\n- AcentuaÃ§Ã£o" +
                    "\n- Caracteres especiais" +
                    "\n- Letras maiÃºsculas"
            }, { height: 400, width: 300 });
            FormContext.getControl("frt_host").addNotification({ messages: ['Host com caractÃ©res invÃ¡lidos'], notificationLevel: 'ERROR' });
            return;
        }

        var tipoContratoDesativado = 173180004;
        var licencaId = FormContext.data.entity.getId();
        var filter = "";
        if (licencaId != "")
            filter = " and frt_licencaid ne '" + licencaId + "'";
        var licencas = SDKore.GetAPI("frt_licencas", "frt_name", "frt_host eq '" + host + "' and frt_tipo_contrato ne " + tipoContratoDesativado + filter);

        if (licencas != null) {
            Xrm.Navigation.openAlertDialog({ title: "Host invÃ¡lido!", text: "Host jÃ¡ estÃ¡ em uso pela LicenÃ§a \n'" + licencas[0].frt_name + "'" }, { height: 300, width: 300 });
            FormContext.getControl("frt_host").addNotification({ messages: ['Host jÃ¡ estÃ¡ em uso'], notificationLevel: 'ERROR' });
            return;
        }
    },

    VisibilidadePorProduto: function (executionContext) {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null)
            return;

        FormContext.getControl("frt_dt_ultima_integracao").setVisible(true);
        FormContext.getControl("frt_st_msg_retorno_integracao").setVisible(true);
        FormContext.getControl("frt_bt_erro_integracao").setVisible(true);


        switch (produto[0].name.toUpperCase()) {
            case "ANALYZER":
                FormContext.getControl("frt_operadoras").setVisible(true);
                FormContext.getControl("frt_ativacao").setVisible(true);
                FormContext.getControl("frt_chave").setVisible(true);
                FormContext.getControl("frt_login").setVisible(true);
                FormContext.getControl("frt_senha").setVisible(true);
                FormContext.getControl("frt_email_licenca").setVisible(true);
                FormContext.getControl("frt_quantidade_linhas").setVisible(true);
                FormContext.getControl("frt_recursos").setVisible(true);
                FormContext.getControl("frt_mes").setVisible(true);
                FormContext.getControl("frt_ano").setVisible(true);
                FormContext.getControl("frt_versao").setVisible(true);
                FormContext.getControl("frt_enviar_servidor").setVisible(true);




                FormContext.getAttribute("frt_ativacao").setRequiredLevel("required");
                FormContext.getAttribute("frt_login").setRequiredLevel("required");
                FormContext.getAttribute("frt_senha").setRequiredLevel("required");
                FormContext.getAttribute("frt_email_licenca").setRequiredLevel("required");
                FormContext.getAttribute("frt_quantidade_linhas").setRequiredLevel("required");
                FormContext.getAttribute("frt_recursos").setRequiredLevel("required");
                FormContext.getAttribute("frt_mes").setRequiredLevel("required");
                FormContext.getAttribute("frt_ano").setRequiredLevel("required");
                FormContext.getAttribute("frt_versao").setRequiredLevel("required");
                FormContext.getAttribute("frt_operadoras").setRequiredLevel("required");

                break;
            case "PBX":
                FormContext.getControl("frt_modulos").setVisible(true);
                FormContext.getControl("frt_ativacao").setVisible(true);
                FormContext.getControl("frt_chave").setVisible(true);
                FormContext.getControl("frt_email_auditoria").setVisible(true);
                FormContext.getControl("frt_categoria_licenca").setVisible(true);
                FormContext.getControl("frt_quantidade_ramais").setVisible(true);
                FormContext.getControl("frt_quantidade_agentes").setVisible(true);
                FormContext.getControl("frt_quantidadede_canais").setVisible(true);
                FormContext.getControl("frt_quantidadede_canais_sip").setVisible(true);
                FormContext.getControl("frt_quantidadede_canais_bridge").setVisible(true);
                FormContext.getControl("frt_quantidadede_agentes_simultaneos").setVisible(true);
                FormContext.getControl("frt_quantidadede_ramais_cloudsoftphone").setVisible(true);
                FormContext.getControl("frt_versao_pbx").setVisible(true);
                FormContext.getControl("frt_st_senha_licenca_cloudsoftphone").setVisible(true);
                FormContext.getControl("frt_white_label_pbx").setVisible(true);
                FormContext.getControl("frt_enviar_servidor").setVisible(true);

                FormContext.getAttribute("frt_ativacao").setRequiredLevel("required");
                //FormContext.getAttribute("frt_quantidade_ramais").setRequiredLevel("required");
                FormContext.getAttribute("frt_versao_pbx").setRequiredLevel("required");

                break;

            case "MONITOR":
                FormContext.getControl("frt_ativacao").setVisible(true);
                FormContext.getControl("frt_chave").setVisible(true);
                FormContext.getControl("frt_email_auditoria").setVisible(true);
                FormContext.getControl("frt_categoria_licenca").setVisible(true);
                FormContext.getControl("frt_quantidade_ramais").setVisible(true);

                FormContext.getAttribute("frt_ativacao").setRequiredLevel("required");
                FormContext.getAttribute("frt_quantidade_ramais").setRequiredLevel("required");

                break;

            case "SMS":
                FormContext.getControl("frt_ativacao").setVisible(true);
                FormContext.getControl("frt_chave").setVisible(true);
                FormContext.getControl("frt_email_auditoria").setVisible(true);
                FormContext.getControl("frt_categoria_licenca").setVisible(true);
                FormContext.getControl("frt_qtd_modens").setVisible(true);

                FormContext.getAttribute("frt_ativacao").setRequiredLevel("required");
                FormContext.getAttribute("frt_qtd_modens").setRequiredLevel("required");

                break;

            case "BLOCKBIT":
                FormContext.getControl("frt_chave").setVisible(true);
                FormContext.getControl("frt_email_auditoria").setVisible(true);
                FormContext.getControl("frt_categoria_licenca").setVisible(true);
                FormContext.getControl("frt_permite_update").setVisible(true);
                FormContext.getControl("frt_locacao").setVisible(true);
                FormContext.getControl("frt_renovacao_automatica").setVisible(true);
                FormContext.getControl("frt_bloqueado").setVisible(true);
                FormContext.getControl("frt_quantidade_licencas").setVisible(true);
                FormContext.getControl("frt_produto_blockbit").setVisible(true);

                FormContext.getAttribute("frt_quantidade_licencas").setRequiredLevel("required");
                FormContext.getAttribute("frt_produto_blockbit").setRequiredLevel("required");

                break;

            case "SZ.CHAT 3":
                FormContext.getControl("frt_ativacao").setVisible(true);
                FormContext.getControl("frt_login").setVisible(true);
                FormContext.getControl("frt_senha").setVisible(true);
                FormContext.getControl("frt_email_licenca").setVisible(true);
                FormContext.getControl("frt_quantidade_linhas").setVisible(true);
                FormContext.getControl("frt_quantidade_agentes").setVisible(true);
                FormContext.getControl("frt_servidor").setVisible(true);
                FormContext.getControl("frt_limite_mensagem").setVisible(true);
                FormContext.getControl("frt_avisar_bloqueio").setVisible(true);
                FormContext.getControl("frt_enviar_servidor").setVisible(true);

                FormContext.getControl("frt_bt_erro_integracao").setVisible(true);
                FormContext.getControl("frt_st_msg_retorno_integracao").setVisible(true);


                FormContext.getAttribute("frt_login").setRequiredLevel("required");
                FormContext.getAttribute("frt_senha").setRequiredLevel("required");
                FormContext.getAttribute("frt_email_licenca").setRequiredLevel("required");
                FormContext.getAttribute("frt_quantidade_linhas").setRequiredLevel("required");
                FormContext.getAttribute("frt_servidor").setRequiredLevel("required");
                FormContext.getAttribute("frt_limite_mensagem").setRequiredLevel("required");

                break;

            case "PORTABILIDADE":
                FormContext.getControl("frt_login").setVisible(true);
                FormContext.getControl("frt_senha").setVisible(true);
                FormContext.getControl("frt_limite").setVisible(true);
                FormContext.getControl("frt_bloqueado").setVisible(true);

                FormContext.getAttribute("frt_login").setRequiredLevel("required");
                FormContext.getAttribute("frt_senha").setRequiredLevel("required");
                FormContext.getAttribute("frt_limite").setRequiredLevel("required");

                break;

            case "SZ.CHAT 4":
                FormContext.getControl("frt_servidor").setVisible(true);
                FormContext.getControl("frt_enviar_servidor").setVisible(true);
                FormContext.getControl("frt_enviar_informacoes_acesso").setVisible(true);
                FormContext.getControl("frt_revenda").setVisible(true);
                FormContext.getControl("frt_canais_simultaneos").setVisible(true);
                FormContext.getControl("frt_agentes_simultaneos").setVisible(true);
                FormContext.getControl("frt_id_erp").setVisible(true);
                FormContext.getControl("frt_host").setVisible(true);
                FormContext.getControl("frt_email_licenca").setVisible(true);
                FormContext.getControl("frt_idioma").setVisible(true);
                FormContext.getControl("frt_nome_banco_dados").setVisible(true);
                FormContext.getControl("frt_tipo_banco_dados").setVisible(true);
                FormContext.getControl("frt_envio_lote_ilimitado").setVisible(true);
                FormContext.getControl("frt_qtd_mensagem_mensal").setVisible(true);
                FormContext.getControl("frt_qtd_mensagem_avulsa").setVisible(true);
                FormContext.getControl("frt_qtd_mensagem_ilimitado").setVisible(true);
                FormContext.getControl("frt_limite_mensagem").setVisible(true);
                FormContext.getControl("frt_armazenamento_sistema_ilimitado").setVisible(true);
                FormContext.getControl("frt_gigabytes").setVisible(true);
                FormContext.getControl("frt_notificacoes_porcentagem").setVisible(true);
                FormContext.getControl("frt_fuso_horario").setVisible(true);
                FormContext.getControl("frt_white_label").setVisible(true);
                FormContext.getControl("frt_dominio").setVisible(true);
                FormContext.getControl("frt_enviar_licenca_cliente").setVisible(true);
                FormContext.getControl("frt_tipo_licenciamento").setVisible(true);
                FormContext.getControl("frt_agentes_bonificados").setVisible(true);
                FormContext.getControl("frt_st_email_recuperacao_senha").setVisible(true);
                FormContext.getControl("frt_pl_status").setVisible(true);
                FormContext.getControl("frt_pl_tipo_licenca").setVisible(true);

                FormContext.getAttribute("frt_servidor").setRequiredLevel("required");
                FormContext.getAttribute("frt_canais_simultaneos").setRequiredLevel("required");
                FormContext.getAttribute("frt_agentes_simultaneos").setRequiredLevel("required");
                FormContext.getAttribute("frt_idioma").setRequiredLevel("required");
                FormContext.getAttribute("frt_tipo_banco_dados").setRequiredLevel("required");
                //FormContext.getAttribute("frt_fuso_horario").setRequiredLevel("required"); 
                FormContext.getAttribute("frt_tipo_licenciamento").setRequiredLevel("required");
                FormContext.getAttribute("frt_st_email_recuperacao_senha").setRequiredLevel("required");
                FormContext.getAttribute("frt_pl_status").setRequiredLevel("required");
                FormContext.getAttribute("frt_pl_tipo_licenca").setRequiredLevel("required");

                this.VisibilidadeEnviarLicenca();

                break;

            case "SIGNATURE":
                FormContext.getControl("frt_enviar_servidor").setVisible(true);
                FormContext.getControl("frt_tipo_plano_signature").setVisible(true);
                FormContext.getAttribute("frt_tipo_plano_signature").setRequiredLevel("required");
                Fortics.Dyn365.Licenca.VisibilidadePorTipoDoPlano();

                break;
            default:
        }
    },

    MensagemIntegracaqo: function (executionContext) {
        var msg = FormContext.getAttribute("frt_st_msg_retorno_integracao").getValue();
        if (msg == "" || msg == null)
            return;

        var erroIntegracao = FormContext.getAttribute("frt_bt_erro_integracao").getValue();
        var titulo = erroIntegracao ? "Erro ao realizar integraÃ§Ã£o!" : "IntegraÃ§Ã£o realizada com sucesso!";
        Xrm.Navigation.openAlertDialog({ title: titulo, text: msg });
    },

    EnviarServidorObrigatoriedade: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null)
            return;

        var enviarServidor = FormContext.getAttribute("frt_enviar_servidor").getValue();
        var agendarDesativacao = FormContext.getAttribute("frt_agendar_desativacao").getValue();

        switch (produto[0].name.toUpperCase()) {
            case "SZ.CHAT 4":

                if (enviarServidor || agendarDesativacao) {
                    FormContext.getAttribute("frt_email_licenca").setRequiredLevel("required");
                    FormContext.getAttribute("frt_st_email_recuperacao_senha").setRequiredLevel("required");
                    FormContext.getAttribute("frt_host").setRequiredLevel("required");
                    FormContext.getAttribute("frt_pl_status").setRequiredLevel("required");
                    FormContext.getAttribute("frt_armazenamento_sistema_ilimitado").setRequiredLevel("required");
                    FormContext.getAttribute("frt_envio_lote_ilimitado").setRequiredLevel("required");
                    FormContext.getAttribute("frt_notificacoes_porcentagem").setRequiredLevel("required");
                    FormContext.getAttribute("frt_qtd_mensagem_mensal").setRequiredLevel("required");
                }
                else {
                    FormContext.getAttribute("frt_email_licenca").setRequiredLevel("none");
                    FormContext.getAttribute("frt_st_email_recuperacao_senha").setRequiredLevel("none");
                    FormContext.getAttribute("frt_host").setRequiredLevel("none");
                    FormContext.getAttribute("frt_pl_status").setRequiredLevel("none");
                    FormContext.getAttribute("frt_armazenamento_sistema_ilimitado").setRequiredLevel("none");
                    FormContext.getAttribute("frt_envio_lote_ilimitado").setRequiredLevel("none");
                    FormContext.getAttribute("frt_notificacoes_porcentagem").setRequiredLevel("none");
                    FormContext.getAttribute("frt_qtd_mensagem_mensal").setRequiredLevel("none");
                }

                this.SzChat4ObrigatoriedadeDominio();

                break;

            case "SZ.CHAT 3":
                if (enviarServidor || agendarDesativacao)
                    FormContext.getAttribute("frt_quantidade_agentes").setRequiredLevel("required");
                else
                    FormContext.getAttribute("frt_quantidade_agentes").setRequiredLevel("none");
                break;

            case "PBX":
                if (enviarServidor || agendarDesativacao) {
                    FormContext.getAttribute("frt_modulos").setRequiredLevel("required");
                    FormContext.getAttribute("frt_quantidade_ramais").setRequiredLevel("required");
                }
                else {
                    FormContext.getAttribute("frt_modulos").setRequiredLevel("none");
                    FormContext.getAttribute("frt_quantidade_ramais").setRequiredLevel("none");
                }
                break;
        }
    },

    AgendarDesativacao: function () {
        var stateCodeInativo = 1;
        if (FormContext.getAttribute("statecode").getValue() == stateCodeInativo) {
            FormContext.getControl("frt_motivo_desativacao").setVisible(true);
            FormContext.getControl("frt_data_desativacao").setVisible(true);
        }
        else {
            var agendarDesativacao = FormContext.getAttribute("frt_agendar_desativacao").getValue();
            var tipoContrato = FormContext.getAttribute("frt_tipo_contrato").getValue();
            var desativado = 173180004;
            if (tipoContrato == desativado) {
                FormContext.getAttribute("frt_agendar_desativacao").setValue(false);
                FormContext.getControl("frt_agendar_desativacao").setDisabled(true);

                FormContext.getAttribute("frt_motivo_desativacao").setRequiredLevel("required");
                FormContext.getAttribute("frt_data_desativacao").setRequiredLevel("none");

                FormContext.getControl("frt_motivo_desativacao").setVisible(true);
                FormContext.getControl("frt_data_desativacao").setVisible(true);

                FormContext.getControl("frt_data_desativacao").setDisabled(true);
            }
            else {
                if (agendarDesativacao) {
                    FormContext.getAttribute("frt_motivo_desativacao").setRequiredLevel("required");
                    FormContext.getAttribute("frt_data_desativacao").setRequiredLevel("required");

                    FormContext.getControl("frt_motivo_desativacao").setVisible(true);
                    FormContext.getControl("frt_data_desativacao").setVisible(true);

                    FormContext.getControl("frt_data_desativacao").setDisabled(false);
                }
                else {
                    FormContext.getAttribute("frt_data_desativacao").setRequiredLevel("none");
                    FormContext.getControl("frt_data_desativacao").setVisible(false);
                    FormContext.getControl("frt_data_desativacao").setDisabled(false);

                    FormContext.getControl("frt_agendar_desativacao").setDisabled(false);

                    FormContext.getAttribute("frt_motivo_desativacao").setRequiredLevel("none");
                    FormContext.getControl("frt_motivo_desativacao").setVisible(false);
                }
            }
        }
    },

    PreencherSzChat4Status: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        var tipoContrato = FormContext.getAttribute("frt_tipo_contrato").getValue();

        if (produto == null || produto[0].name.toUpperCase() != "SZ.CHAT 4" || tipoContrato == null)
            return;


        switch (tipoContrato) {
            case LicencaEnum.TipoContrato.ContratoCompleto:
                FormContext.getAttribute("frt_pl_status").setValue(LicencaEnum.StatusSzChat4.Ativo);
                break;

            case LicencaEnum.TipoContrato.ContratoSimples:
                FormContext.getAttribute("frt_pl_status").setValue(LicencaEnum.StatusSzChat4.Ativo);
                break;

            case LicencaEnum.TipoContrato.Demo:
                FormContext.getAttribute("frt_pl_status").setValue(LicencaEnum.StatusSzChat4.POC);
                break;

            case LicencaEnum.TipoContrato.Desativado:
                FormContext.getAttribute("frt_pl_status").setValue(LicencaEnum.StatusSzChat4.Bloqueado);
                break;

            default:
                FormContext.getAttribute("frt_pl_status").setValue(null);
                break;
        }
    },
    RemoverOptionTipoContrato: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        var tipoContrato = FormContext.getAttribute("frt_tipo_contrato").getValue();

        if (produto == null || produto[0].name.toUpperCase() != "SZ.CHAT 4")
            return;

        if (tipoContrato == LicencaEnum.TipoContrato.SemContrato)
            FormContext.getAttribute("frt_tipo_contrato").setValue(null);

        FormContext.getControl("frt_tipo_contrato").removeOption(LicencaEnum.TipoContrato.SemContrato);
    },
    PreencherFusoHorario: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null || produto[0].name.toUpperCase() != "SZ.CHAT 4")
            return;

        Xrm.WebApi.online.retrieveMultipleRecords("frt_fusohorrio", "?$select=frt_name&$filter=frt_name eq 'America%2FSao_Paulo'&$top=1").then(
            function success(results) {
                if (results.entities.length == 1) {
                    var fusoId = results.entities[0]["frt_fusohorrioid"];
                    var fusoName = results.entities[0]["frt_name"];
                    var fusoLk = SDKore.CreateLookup(fusoId, fusoName, "frt_fusohorrio");
                    FormContext.getAttribute("frt_fuso_horario").setValue(fusoLk);
                }
                else
                    Xrm.Navigation.openAlertDialog({ title: "Erro ao preencher campo 'Fuso HorÃ¡rio'", text: "NÃ£o foi possÃ­vel localizar o fuso horÃ¡rio 'America/Sao_Paulo'. \nContate o administrador do sistema." });
            });
    },
    NotificarFusoHorario: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null || produto[0].name.toUpperCase() != "SZ.CHAT 4")
            return;

        if (FormContext.getAttribute("frt_fuso_horario").getValue() == null)
            FormContext.getControl("frt_fuso_horario").addNotification({ messages: ["Campo obrigatÃ³rio, valor padrÃ£o 'America/Sao_Paulo'"], notificationLevel: 'ERROR' });
        else
            FormContext.getControl("frt_fuso_horario").clearNotification();
    },
    VersaoPBX: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null || produto[0].name.toUpperCase() != "PBX")
            return;

        var versaoPbx = FormContext.getAttribute("frt_versao_pbx").getValue();
        if (versaoPbx == null)
            return;
        else if (versaoPbx != LicencaEnum.VersaoPbx.ForticsPbx3) {
            FormContext.getControl("frt_enviar_servidor").setDisabled(true);
            FormContext.getAttribute("frt_enviar_servidor").getValue(false);
        }
        else
            FormContext.getControl("frt_enviar_servidor").setDisabled(false);
    },
    FilterWhiteLabel: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null) return;

        var label = Fortics.Dyn365.Licenca.GetLabelWhiteLabel(produto);
        if (label == "") return;

        var whiteLabelFilter = "<filter type='and'><condition attribute='frt_produto' operator='eq' uiname='" + produto[0].name + "' uitype='frt_whitelabel' value='" + produto[0].id + "' /></filter>";
        FormContext.getControl(label).addCustomFilter(whiteLabelFilter);
    },

    SetWhiteLabelFilter: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null) return;

        var label = this.GetLabelWhiteLabel(produto);
        if (label == "") return;

        FormContext.getControl(label).addPreSearch(Fortics.Dyn365.Licenca.FilterWhiteLabel);
    },

    GetLabelWhiteLabel: function (produto) {
        var label = "";

        if (produto[0].name == "PBX")
            label = "frt_white_label_pbx";
        else if (produto[0].name == "SZ.CHAT 4")
            label = "frt_white_label";

        return label;
    },
    VisibilidadeLeadEmpresa: function () {
        var empresa = FormContext.getAttribute("frt_empresa").getValue();
        var lead = FormContext.getAttribute("frt_lk_lead").getValue();

        if (empresa == null && lead == null) {
            FormContext.getAttribute("frt_empresa").setRequiredLevel("required");
            FormContext.getControl("frt_empresa").setVisible(true);

            FormContext.getAttribute("frt_lk_lead").setRequiredLevel("required");
            FormContext.getControl("frt_lk_lead").setVisible(true);
        }
        else if (empresa != null) {
            FormContext.getAttribute("frt_empresa").setRequiredLevel("required");
            FormContext.getControl("frt_empresa").setVisible(true);

            FormContext.getAttribute("frt_lk_lead").setRequiredLevel("none");
            FormContext.getControl("frt_lk_lead").setVisible(false);
        }
        else if (lead != null) {
            FormContext.getAttribute("frt_empresa").setRequiredLevel("none");
            FormContext.getControl("frt_empresa").setVisible(false);

            FormContext.getAttribute("frt_lk_lead").setRequiredLevel("required");
            FormContext.getControl("frt_lk_lead").setVisible(true);
        }
    },
    OnChangeEmpresa: function () {
        Fortics.Dyn365.Licenca.VisibilidadeLeadEmpresa();
        Fortics.Dyn365.Licenca.VisibilidadeContato();
        Fortics.Dyn365.Licenca.SetFilterContato();
    },
    OnChangeLead: function () {
        Fortics.Dyn365.Licenca.VisibilidadeLeadEmpresa();
    },
    VisibilidadeEnviarLicenca: function () {
        if (FormContext.getAttribute("frt_pl_tipo_licenca").getValue() != null && FormContext.getAttribute("frt_pl_tipo_licenca").getValue() == LicencaEnum.TipoLicenca.Parceiro)
            FormContext.getControl("frt_bt_enviar_licencas").setVisible(true);
        else
            FormContext.getControl("frt_bt_enviar_licencas").setVisible(false);
    },
    OnChangeTipoLicenca: function () {
        Fortics.Dyn365.Licenca.VisibilidadeEnviarLicenca();
    },
    OnChangeErroAgendamentoDesativacao: function () {
        var agendarDesativacao = FormContext.getAttribute("frt_agendar_desativacao").getValue();
        var msg = FormContext.getAttribute("frt_st_erro_agendamento_desativacao").getValue();

        if (!agendarDesativacao && msg != null)
            Xrm.Navigation.openAlertDialog({ title: "Erro ao agendar a desativaÃ§Ã£o", text: msg });
    },
    VisibilidadeErroAgendamento: function () {
        var msg = FormContext.getAttribute("frt_st_erro_agendamento_desativacao").getValue();
        if (msg != null)
            FormContext.getControl("frt_st_erro_agendamento_desativacao").setVisible(true);
        else
            FormContext.getControl("frt_st_erro_agendamento_desativacao").setVisible(false);
    },
    SetFilterContato: function () {
        var empresa = FormContext.getAttribute("frt_empresa").getValue();
        var accountId = "";
        if (empresa != null)
            accountId = empresa[0].id;

        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_contato");
    },
    VisibilidadeContato: function () {
        var mostrarContato = false;
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto != null) {
            var nomeProduto = produto[0].name.toUpperCase();
            if (nomeProduto == "SIGNATURE" || nomeProduto == "SZ.CHAT 4") {
                if (FormContext.getAttribute("frt_empresa").getValue() != null)
                    mostrarContato = true;
            }
        }

        if (mostrarContato) {
            FormContext.getControl("frt_contato").setVisible(true);
            FormContext.getAttribute("frt_contato").setRequiredLevel("required");
        }
        else {
            FormContext.getControl("frt_contato").setVisible(false);
            FormContext.getAttribute("frt_contato").setRequiredLevel("none");
        }
    },
    VisibilidadePorTipoDoPlano: function () {
        var tipoPlano = FormContext.getAttribute("frt_tipo_plano_signature").getValue();
        if (tipoPlano == LicencaEnum.TipoPlano.UsarPlanoExistente) {
            FormContext.getControl("frt_plano_signature").setVisible(true);
            FormContext.getAttribute("frt_plano_signature").setRequiredLevel("required");

            FormContext.getControl("frt_limite_plano_signature").setVisible(false);
            FormContext.getAttribute("frt_limite_plano_signature").setRequiredLevel("none");

            FormContext.getControl("frt_nome_plano_signature").setVisible(false);
            FormContext.getAttribute("frt_nome_plano_signature").setRequiredLevel("none");
        }
        else if (tipoPlano == LicencaEnum.TipoPlano.CriarNovoPlano) {
            FormContext.getControl("frt_plano_signature").setVisible(false);
            FormContext.getAttribute("frt_plano_signature").setRequiredLevel("none");

            FormContext.getControl("frt_limite_plano_signature").setVisible(true);
            FormContext.getAttribute("frt_limite_plano_signature").setRequiredLevel("required");

            FormContext.getControl("frt_nome_plano_signature").setVisible(true);
            FormContext.getAttribute("frt_nome_plano_signature").setRequiredLevel("required");
        }        
    },
    OnChangeTipoPlanoSignature: function () {
        Fortics.Dyn365.Licenca.VisibilidadePorTipoDoPlano();
    },
    RegrasDataExpiracao: function () {
        var produto = FormContext.getAttribute("frt_produto").getValue();
        if (produto == null)
            return;

        if (produto[0].name.toUpperCase() == "SIGNATURE") {
            if (FormContext.getAttribute("frt_id_signature").getValue() != null && FormContext.getAttribute("frt_id_signature").getValue() != "")
                FormContext.getAttribute("frt_data_expiracao").setRequiredLevel("none");
            else
                FormContext.getAttribute("frt_data_expiracao").setRequiredLevel("required");
        }
        else {
            
            var tipoContrato = FormContext.getAttribute("frt_tipo_contrato").getValue();
            if (tipoContrato == LicencaEnum.TipoContrato.ContratoCompleto || tipoContrato == LicencaEnum.TipoContrato.ContratoSimples) {
                FormContext.getAttribute("frt_data_expiracao").setValue(null);
                FormContext.getControl("frt_data_expiracao").setDisabled(true);
            }
            else
                FormContext.getControl("frt_data_expiracao").setDisabled(false);

            if (tipoContrato == LicencaEnum.TipoContrato.Demo)
                FormContext.getAttribute("frt_data_expiracao").setRequiredLevel("required");
            else
                FormContext.getAttribute("frt_data_expiracao").setRequiredLevel("none");
        }
    }, 
}