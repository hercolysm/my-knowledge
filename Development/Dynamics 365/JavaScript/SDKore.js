if (typeof SDKore == "undefined") { SDKore = {}; }

SDKore = {
    _parameterCheck: function (parametro, mensagem) {
        ///<summary>
        /// Funcao Private para checar se o parametro Ã© null ou undefined
        ///</summary>
        ///<param name="parametro" type="Object">
        /// O parÃ¢metro para checar;
        ///</param>
        ///<param name="mensagem" type="String">
        /// A mensagem que serÃ¡ enviada para o throw
        ///</param>
        if (typeof parametro === "undefined" || parametro === null) {
            throw new Error(mensagem);
        }
    },
    _stringParameterCheck: function (parametro, mensagem) {
        ///<summary>
        /// Funcao Private para checar se o parametro Ã© string
        ///</summary>
        ///<param name="parametro" type="String">
        /// O parametro para checar
        ///</param>
        ///<param name="mensagem" type="String">
        /// A mensagem que serÃ¡ enviada para o throw
        ///</param>
        if (typeof parametro != "string") {
            throw new Error(mensagem);
        }
    },
    _functionParameterCheck: function (functionParameter, mensagem) {
        ///<summary>
        /// Funcao Private para checar se o parametro Ã© Uma funcao ou undefined
        ///</summary>
        ///<param name="functionParameter" type="Function">
        /// A funcao para ser checada
        ///</param>
        ///<param name="mensagem" type="String">
        /// A mensagem que serÃ¡ enviada para o throw
        ///</param>
        if (typeof functionParameter != "function") {
            throw new Error(mensagem);
        }
    },
    _argumentosMaiorQue: function (argumentos, valor, mensagem) {
        ///<summary>
        /// Funcao Private para checar se o numero de argumentos Ã© maior que um valor
        ///</summary>
        ///<param name="argumentos" type="Array">
        /// Array de argumentos
        ///</param>
        ///<param name="valor" type="int">
        /// Valor que sera comparado
        ///</param>
        ///<param name="mensagem" type="string">
        /// A mensagem que serÃ¡ enviada para o throw
        ///</param>
        if (argumentos.length > valor)
            throw new Error(mensagem);
    },
    _argumentosMenorQue: function (argumentos, valor, mensagem) {
        ///<summary>
        /// Funcao Private para checar se o numero de argumentos Ã© menor que um valor
        ///</summary>
        ///<param name="argumentos" type="Array">
        /// Array de argumentos
        ///</param>
        ///<param name="valor" type="int">
        /// Valor que sera comparado
        ///</param>
        ///<param name="mensagem" type="string">
        /// A mensagem que serÃ¡ enviada para o throw
        ///</param>
        if (argumentos.length < valor)
            throw new Error(mensagem);
    },

    CallService: function (url, method) {
        /// <summary>Executa chamada ao mÃ©todo do WCF informado.</summary>
        /// <param name="url" type="string">A url do WCF.</param>
        /// <param name="method" type="string">O nome do mÃ©todo a ser executado.</param>
        /// <returns type="Objeto">O retorno oferecido pelo mÃ©todo executado.</returns>

        var servico = this;
        var parameter = "";
        var obj = new Object();
        obj.Success = true;
        obj.ReturnValue = null;

        servico.SetParameter = function (name, value) {
            parameter += '"' + name + '": "' + value + '",';
        };

        servico.Execute = function () {
            $.ajax({
                async: false,
                type: "POST",
                url: url + "/" + method,
                data: configureParameter(),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                processdata: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Accept", "application/json");
                },
                success: function (data, textStatus, XmlHttpRequest) {
                    obj.ReturnValue = data;
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert("Falha na chamada do mÃ©todo:" + method + textStatus + " erro : " + errorThrown);
                    obj.Success = false;

                }
            });
            return configureReturn(obj);
        };

        function configureReturn() {
            if (obj.ReturnValue == undefined || obj.ReturnValue == null)
                return obj;

            if (obj.ReturnValue.hasOwnProperty("d"))
                obj.ReturnValue = obj.ReturnValue.d;

            return obj;
        }

        function configureParameter() {
            parameter = parameter.length == 0 ? "," : parameter;
            return "{" + parameter.substr(0, parameter.length - 1) + "}";
        }
    },

    CreateLookup: function (id, name, type) {
        /// <summary>Cria objeto de Lookup.</summary>
        /// <param name="id" type="string">O guid do lookup a ser criado.</param>
        /// <param name="name" type="string">O nome do registro do lookup a ser criado.</param>
        /// <param name="type" type="string">O tipo (logical name) do objeto a ser criado.</param>
        /// <returns type="Objeto">Objeto Lookup.</returns>

        var value = new Array();
        value[0] = new Object();
        value[0].id = id;
        value[0].name = name;
        value[0].entityType = type;

        return value;
    },

    DisableAllFormFields: function (onOff) {
        /// <summary>Desabilita ou Habilita todos os campos do formulÃ¡rio.</summary>
        /// <param name="onOff" type="bool">'true' para desabilitar, 'false' para habilitar.</param>

        Xrm.Page.ui.controls.forEach(function (control, index) {
            if (SDKore.VerificaSeControleTemAtributos(control)) {
                control.setDisabled(onOff);
            }
        });
    },

    VerificaSeControleTemAtributos: function (controle) {
        var tipoDeControle = controle.getControlType();
        return tipoDeControle != "iframe" && tipoDeControle != "webresource" && tipoDeControle != "subgrid";
    },

    DesabilitarCampos: function (atributos, bloqueado) {
        /// <summary>Desabilita ou Habilita o campo do formulÃ¡rio.</summary>
        /// <param name="atributos" type="array">recebe um array com o nome dos atributos</param>
        /// <param name="bloqueado" type="bool">'true' para bloquear , 'false' para desbloquear.</param>
        for (var i = 0; i < atributos.length; i++) {
            if (bloqueado)
                Xrm.Page.ui.controls.get(atributos[i]).setDisabled(true);
            else
                Xrm.Page.ui.controls.get(atributos[i]).setDisabled(false);
        }
    },

    GetFormContext: function (executionContext) {
        var formContext = null;
        if (executionContext === null || typeof executionContext === "undefined") {
            Xrm.Navigation.openErrorDialog({ message: "Parametro 'ExecutionContext' nulo, favor contatar o administrador do sistema. " });
            return;
        }

        if (typeof executionContext.getAttribute === 'function') {
            formContext = executionContext; //most likely called from the ribbon.
        } else if (typeof executionContext.getFormContext === 'function'
            && typeof (executionContext.getFormContext()).getAttribute === 'function') {
            formContext = executionContext.getFormContext(); // most likely called from the form via a handler
        } else {
            throw 'formContext was not found'; //you could do formContext = Xrm.Page; if you like.
        }

        return formContext;
    },

    GetAPI: function (entidade, campos, filtro, expand = null, expandSelect = null) {

        var req = new XMLHttpRequest();
        if (expand == null || expandSelect == null)
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.0/" + entidade + "?$select=" + campos + "&$filter=" + filtro + "", false);
        else
            req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.0/" + entidade + "?$select=" + campos + "&$expand=" + expand + "($select=" + expandSelect + ")&$filter=" + filtro + "", false);

        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.send(null);
        var retrieved = JSON.parse(req.responseText).value;
        if (retrieved != null && retrieved.length > 0) {
            if (req.status == 200) {
                if (retrieved.length > 0) {
                    return retrieved;
                }
            }
            else
                return null;
        }
        else
            return null;
    },

    GetAPIRef: function (entidade, id, relacionamentoNtoN) {

        var req = new XMLHttpRequest();
        req.open("GET", Xrm.Page.context.getClientUrl() + "/api/data/v9.0/" + entidade + "(" + id + ")/" + relacionamentoNtoN + "/$ref", false);

        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.send(null);
        var retrieved = JSON.parse(req.responseText).value;
        if (retrieved != null && retrieved.length > 0) {
            if (req.status == 200) {
                if (retrieved.length > 0) {
                    return retrieved;
                }
            }
            else
                return null;
        }
        else
            return null;
    },

    DeleteAPI: function (entidade, id) {

        var req = new XMLHttpRequest();
        req.open("DELETE", Xrm.Page.context.getClientUrl() + "/api/data/v9.0/" + entidade + "(" + id + ")", false);

        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        req.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
        req.send(null);
        if (req.responseText == "") return null;

        var retrieved = JSON.parse(req.responseText).value;
        if (retrieved != null && retrieved.length > 0) {
            if (req.status == 200) {
                if (retrieved.length > 0) {
                    return retrieved;
                }
            }
            else
                return null;
        }
        else
            return null;
    },
    DisableAutoSave: function (executionContext) {
        executionContext.getEventArgs().preventDefault();
    }
};