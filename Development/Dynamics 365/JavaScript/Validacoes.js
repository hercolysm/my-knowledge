if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var formContext = null;

Fortics.Dyn365.Validacoes = {

    //parametro: executionContext e "cnpjsemformatacao" campo cnpj que aciona o evento nos formularios de conta, contato e cliente potencial
    //funcao: validar se o cnpj Ã© valido e adiciona uma mascara
    ValidarCNPJ: function (executionContext) {
        if (executionContext === null)
            return;

        formContext = executionContext.getFormContext();

        var cnpj = executionContext.getEventSource().getValue();
        var label = executionContext.getEventSource().getName();

        var isValid = true;
        if (cnpj !== null & cnpj !== "") {
            cnpj = cnpj.replace(/[^\d]+/g, '');
            if (cnpj.length !== 14 ||
                cnpj === "00000000000000" ||
                cnpj === "11111111111111" ||
                cnpj === "22222222222222" ||
                cnpj === "33333333333333" ||
                cnpj === "44444444444444" ||
                cnpj === "55555555555555" ||
                cnpj === "66666666666666" ||
                cnpj === "77777777777777" ||
                cnpj === "88888888888888" ||
                cnpj === "99999999999999") {
                isValid = false;
            }

            var tamanho = cnpj.length - 2;
            var numeros = cnpj.substring(0, tamanho);
            digitos = cnpj.substring(tamanho);
            var soma = 0;
            var pos = tamanho - 7;

            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }

            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado.toString() !== digitos.charAt(0)) {
                isValid = false;
            }

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado.toString() !== digitos.charAt(1)) {
                isValid = false;
            }
        }
        else {
            isValid = false;
        }

        if (isValid) {
            cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2, 5) + '.' + cnpj.substring(5, 8) + '/' + cnpj.substring(8, 12) + '-' + cnpj.substring(12);
            cnpj = formContext.getAttribute(label).setValue(cnpj);
        } else {
            Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "CNPJ " + cnpj + " InvÃ¡lido" }, { height: 100, width: 300 }).then(
                function success(result) {
                    cnpj = formContext.getAttribute(label).setValue("");
                }
            );
        }
    },

    //parametro: executionContext e "cnpjsemformatacao" campo cnpj que aciona o evento nos formularios de conta, contato e cliente potencial
    //funcao: remover mascara de cnpj
    RemoverCaracteresCNPJ: function (executionContext, campoSemFormatacao) {
        'use strict';

        var formContext = executionContext.getFormContext();

        var cnpj = executionContext.getEventSource().getValue();

        if (cnpj) {
            cnpj = cnpj.replace(/[^\d]+/g, '');
        }
        formContext.getAttribute(campoSemFormatacao).setValue(cnpj);
    },

    //parametro: executionContext campo cpf que aciona o evento nos formularios de conta, contato e cliente potencial
    //funcao: validar se o cpf Ã© valido e adiciona uma mascara
    ValidarCPF: function (executionContext) {
        if (executionContext === null)
            return;

        var formContext = executionContext.getFormContext();

        var cpf = executionContext.getEventSource().getValue();
        var label = executionContext.getEventSource().getName();
        isValid = true;

        if (cpf !== null && cpf !== "") {
            cpf = cpf.replace(/[^\d]+/g, '');
            var Soma;
            var Resto;
            Soma = 0;
            if (cpf.length !== 11 ||
                cpf === "00000000000" ||
                cpf === "11111111111" ||
                cpf === "22222222222" ||
                cpf === "33333333333" ||
                cpf === "44444444444" ||
                cpf === "55555555555" ||
                cpf === "66666666666" ||
                cpf === "77777777777" ||
                cpf === "88888888888" ||
                cpf === "99999999999") {
                isValid = false;
            }

            for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto === 10) || (Resto === 11)) Resto = 0;
            if (Resto !== parseInt(cpf.substring(9, 10))) {
                isValid = false;
            }

            Soma = 0;
            for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if ((Resto === 10) || (Resto === 11)) { Resto = 0; }
            if (Resto !== parseInt(cpf.substring(10, 11))) {
                isValid = false;
            }
        }
        else {
            isValid = false;
        }

        if (isValid) {
            cpf = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
            cpf = formContext.getAttribute(label).setValue(cpf);
        } else {
            Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "CPF " + cpf + " InvÃ¡lido" }, { height: 100, width: 300 }).then(
                function success(result) {
                    cpf = formContext.getAttribute(label).setValue("");
                }
            );
        }
    },

    //parametro: executionContext campo address1_postalcode que aciona o evento nos formularios de conta, contato e cliente potencial
    //funcao: Valida o cep e adiciona a mascara.
    ValidarCEP: function (executionContext) {
        if (executionContext === null)
            return;

        var formContext = executionContext.getFormContext();

        var label = executionContext.getEventSource().getName();
        var cep = executionContext.getEventSource().getValue();

        if (cep === "" || cep === null)
            return;

        cep = cep.replace(/[^\d]+/g, '');

        if (cep.length !== 8) {
            Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "CEP " + cep + " InvÃ¡lido" }, { height: 100, width: 300 }).then(
                function success(result) {
                    //formContext.getAttribute(label).setValue("");
                    formContext.getAttribute(label).setValue(cep);
                }
            );
        }
        else {
            cep = cep.substring(0, 5) + "-" + cep.substring(5);
            formContext.getAttribute(label).setValue(cep);
        }
    },

    //parametro: executionContext os campos telephone1 & telephone2 que acionan o evento nos formularios de conta, contato e cliente potencial
    //funcao ABSOLETA. Nova funÃ§Ã£o para usar ValidarFormatarNumTelefone(): Valida os telefones tanto de celular quanto de fixo, e adiciona uma mascara
    ValidarTelefone: function (executionContext) {
        if (executionContext === null)
            return;

        var formContext = executionContext.getFormContext();

        var label = executionContext.getEventSource().getName();
        var telefone = executionContext.getEventSource().getValue();

        if (telefone === null || telefone === "")
            return;

        if (telefone.startsWith("+") && !telefone.startsWith("+55"))
            return;

        var ddd = "11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99";

        telefone = telefone.replace(/[^\d]+/g, '');
        var codigoDaEntidade = formContext.context.getQueryStringParameters().etc;

        if (telefone.length === 10 || telefone.length === 11) {
            // Valida DDD digitado
            if (!ddd.includes(telefone.substring(0, 2))) {

                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "Verifique o DDD digitado." }, { height: 100, width: 365 }).then(
                    onCloseCallback
                );
                return;
            }
        }

        if (telefone.length === 10 && label !== "mobilephone")
            telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2, 6) + '-' + telefone.substring(6);
        else if (telefone.length === 11 && telefone.substring(2, 3) === "9")
            telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2, 7) + '-' + telefone.substring(7);
        else {
            if (label === "mobilephone") {
                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "Favor digitar um numero de telefone valido (XX) 90000-0000" }, { height: 100, width: 365 }).then(
                    onCloseCallback
                );
            }
            else if (label === "frt_whatsapp") {
                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "Favor digitar um numero de telefone valido (XX) 90000-0000" }, { height: 100, width: 365 }).then(
                    onCloseCallback
                );
            }
            else {
                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "Favor digitar um numero de telefone valido (XX) 0000-0000 ou (XX) 90000-0000" }, { height: 100, width: 365 }).then(
                    onCloseCallback
                );
            }

            return;
        }

        function onCloseCallback() { formContext.getAttribute(label).setValue(""); }

        formContext.getAttribute(label).setValue(telefone);
    },

    //parametro: executionContext os campos inscricaoestadual & inscricaomunicipal que acionan o evento nos formularios de conta e cliente potencial
    //funcao: Valida o numero de caracteres nos campos acima e checa se no campos sÃ£o apenas caracteres numericos
    ValidarInscricao: function (executionContext) {
        if (executionContext === null)
            return;
        var inscricao = executionContext.getEventSource().getValue();

        if (inscricao === "" || inscricao === null)
            return;

        if (inscricao.toLowerCase() !== "isento") {
            ValidarCampoNumerico(executionContext);
        }
    },

    //parametro: executionContext pode ser chamado de outra funcao ou dos campos do CRM
    //valida se os caracteres no campo sÃ£o apenas numericos.
    ValidarCampoNumerico: function (executionContext) {
        if (executionContext === null)
            return;

        var formContext = executionContext.getFormContext();

        var label = executionContext.getEventSource().getName();
        var campo = executionContext.getEventSource().getValue();
        var min = 0;
        var max = 0;

        if (campo === "" || campo === null)
            return;

        campo = campo.replace(/[^\d]+/g, '');

        switch (label) {
            case "address1_fax":
                min = 1; max = 12;
                break;

            case "inscricaoestadual":
            case "inscricaomunicipal":
                min = 7; max = 12;
                break;

            case "employeeid":
                min = 5; max = 11;
                break;
        }

        if (min !== 0 && max !== 0) {
            if (campo.length < min || campo.length > max) {
                Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "Valor Invalido" }, { height: 100, width: 300 }).then(
                    function success(result) {
                        formContext.getAttribute(label).setValue("");
                    }
                );
            }
            else {
                formContext.getAttribute(label).setValue(campo);
            }
        }
    },

    RetornarEndereco: function (executionContext, campoRua, campoNum, campoBairro, campoComplemento, campoCidade, campoEstado, campoPais, campoRegiao) {

        var formContext = executionContext.getFormContext();

        var cep = executionContext.getEventSource().getValue();

        if (cep) {
            cep = cep.replace(/\D/g, '');

            if (formContext.getAttribute(campoRua) != null)
                formContext.getAttribute(campoRua).setValue(null);

            if (formContext.getAttribute(campoNum) != null)
                formContext.getAttribute(campoNum).setValue(null);

            if (formContext.getAttribute(campoBairro) != null)
                formContext.getAttribute(campoBairro).setValue(null);

            if (formContext.getAttribute(campoComplemento) != null)
                formContext.getAttribute(campoComplemento).setValue(null);

            if (formContext.getAttribute(campoCidade) != null)
                formContext.getAttribute(campoCidade).setValue(null);

            if (formContext.getAttribute(campoEstado) != null)
                formContext.getAttribute(campoEstado).setValue(null);

            if (formContext.getAttribute(campoPais) != null)
                formContext.getAttribute(campoPais).setValue(null);

            //
            var parameters = {
                "cep": cep
            };
            //Create request
            var req = new XMLHttpRequest();
            req.open("POST", executionContext.getContext().getClientUrl() + "/api/data/v9.1/Action_RetornarEndereco", true);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.onreadystatechange = function () {
                if (this.readyState === 4 /* complete */) {
                    req.onreadystatechange = null;
                    if (this.status === 200 || this.status === 204) {
                        var retorno = JSON.parse(this.response);
                        console.log(this.response);
                        var endereco = JSON.parse(atob(retorno.endereco));
                        Xrm.WebApi.retrieveMultipleRecords("estado", "?$select=estadoid,nome_estado,regiao,pais&$filter=sigla eq '" + endereco.uf + "'", 10).then(function (response) {

                            if (formContext.getAttribute(campoRua) != null)
                                formContext.getAttribute(campoRua).setValue(endereco.logradouro.substring(0, 35));

                            if (formContext.getAttribute(campoBairro) != null)
                                formContext.getAttribute(campoBairro).setValue(endereco.bairro.substring(0, 35));

                            if (formContext.getAttribute(campoCidade) != null)
                                formContext.getAttribute(campoCidade).setValue(endereco.localidade.substring(0, 25));

                            if (formContext.getAttribute(campoEstado) != null)
                                formContext.getAttribute(campoEstado).setValue(endereco.uf.substring(0, 3));

                            if (response.entities.length > 0 && response.entities[0].estadoid !== null) {

                                if (response.entities[0].regiao != null && formContext.getAttribute(campoRegiao) != null)
                                    formContext.getAttribute(campoRegiao).setValue(response.entities[0].regiao);

                                if (response.entities[0].pais != null) {
                                    if (formContext.getAttribute(campoPais) != null)
                                        formContext.getAttribute(campoPais).setValue(response.entities[0].pais);
                                }
                                else if (formContext.getAttribute(campoPais) != null)
                                    formContext.getAttribute(campoPais).setValue("BRA");
                            }
                            else if (formContext.getAttribute(campoPais) != null)
                                formContext.getAttribute(campoPais).setValue("BRA");

                        }, function (error) {
                            console.log(error.message);
                        });
                    }
                    else {
                        console.log(JSON.parse(this.response).error.message);
                    }
                }
            };
            req.send(JSON.stringify(parameters));
        }
    },

    VerificarCnpj: function (cnpj) {
        if (cnpj === null || cnpj === "")
            return false;

        cnpj = cnpj.replace(/[^\d]+/g, '');
        if (cnpj.length !== 14 ||
            cnpj === "00000000000000" ||
            cnpj === "11111111111111" ||
            cnpj === "22222222222222" ||
            cnpj === "33333333333333" ||
            cnpj === "44444444444444" ||
            cnpj === "55555555555555" ||
            cnpj === "66666666666666" ||
            cnpj === "77777777777777" ||
            cnpj === "88888888888888" ||
            cnpj === "99999999999999") {
            return false;
        }

        var tamanho = cnpj.length - 2;
        var numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        var soma = 0;
        var pos = tamanho - 7;

        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(0)) {
            return false;
        }

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado.toString() !== digitos.charAt(1)) {
            return false;
        }

        return true;

    },

    FormatarCnpj: function (cnpj) {
        cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2, 5) + '.' + cnpj.substring(5, 8) + '/' + cnpj.substring(8, 12) + '-' + cnpj.substring(12);
        return cnpj;
    },

    VerificarCpf: function (cpf) {

        if (cpf === null || cpf === "") return false;

        cpf = cpf.replace(/[^\d]+/g, '');
        var Soma;
        var Resto;
        Soma = 0;
        if (cpf.length !== 11 ||
            cpf === "00000000000" ||
            cpf === "11111111111" ||
            cpf === "22222222222" ||
            cpf === "33333333333" ||
            cpf === "44444444444" ||
            cpf === "55555555555" ||
            cpf === "66666666666" ||
            cpf === "77777777777" ||
            cpf === "88888888888" ||
            cpf === "99999999999") {
            return false;
        }

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(cpf.substring(9, 10))) {
            return false;
        }

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) { Resto = 0; }
        if (Resto !== parseInt(cpf.substring(10, 11))) {
            return false;
        }

        return true;
    },

    RemoverCaracteresEspeciais: function (cnpj) {
        if (cnpj) {
            cnpj = cnpj.replace(/[^\d]+/g, '');
        }
        return cnpj;
    },

    FormatarCpf: function (cpf) {
        cpf = Fortics.Dyn365.Validacoes.RemoverCaracteresEspeciais(cpf);
        cpf = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9);
        return cpf;
    },

    ValidarEmailApi: function (executionContext) {
        var formContext = executionContext.getFormContext();
        var emailValue = executionContext.getEventSource().getValue();
        var emailName = executionContext.getEventSource().getName();
        var emailLabel = formContext.getControl(emailName).getLabel();
        var statusEmailLabel = "";

        if (emailName == "emailaddress1")
            statusEmailLabel = "frt_status_email";
        else
            statusEmailLabel = "frt_status_email_secundario";

        if (emailValue == null || emailValue == "") {
            formContext.getAttribute(statusEmailLabel).setValue(null);
            return;
        }
        var config = SDKore.GetAPI("frt_configuracoeses", "frt_zerobounceapikey", "frt_zerobounceapikey ne null");

        if (config == null) {
            Xrm.Navigation.openAlertDialog({ title: "Erro de configuraÃ§Ã£o", text: "NÃ£o foi possÃ­vel encontrar a chave para validar o e-mail." }).then();
            return;
        }
        var apiKey = config[0].frt_zerobounceapikey;
        var url = "https://api.zerobounce.net/v2/validate?api_key=" + apiKey + "&email=" + emailValue;

        jQuery.ajaxSetup({ async: false });
        var settings = {
            "url": url,
            "method": "GET",
            "timeout": 0,
            "mode": "no-cors",
        };

        $.ajax(settings).done(function (response) {

            switch (response.status) {
                case 'abuse':
                    formContext.getAttribute(statusEmailLabel).setValue(173180000);
                    break;

                case 'catch-all':
                    formContext.getAttribute(statusEmailLabel).setValue(173180001);
                    break;

                case 'do_not_mail':
                    formContext.getAttribute(statusEmailLabel).setValue(173180002);
                    break;

                case 'invalid':
                    formContext.getAttribute(statusEmailLabel).setValue(173180003);
                    break;

                case 'unknown':
                    formContext.getAttribute(statusEmailLabel).setValue(173180004);
                    break;

                case 'valid':
                    formContext.getAttribute(statusEmailLabel).setValue(173180005);
                    break;

                case 'spamtrap':
                    formContext.getAttribute(statusEmailLabel).setValue(173180006);
                    break;

                default:
                    formContext.getAttribute(statusEmailLabel).setValue(null);
                    Xrm.Navigation.openAlertDialog({ title: "Erro ao realizar integraÃ§Ã£o", text: "NÃ£o foi possÃ­vel validar o " + emailLabel + "." });
            }
        });
    },

    ValidarFormatarNumTelefone: function (executionContext, celular) {
        var formContext = SDKore.GetFormContext(executionContext);
        if (formContext == null)
            return;

        var label = executionContext.getEventSource().getName();
        var numTel = executionContext.getEventSource().getValue();

        if (numTel === null || numTel === "") {
            formContext.getControl(label).clearNotification();
            return;
        }

        if (this.ValidarSeTelefoneInternacional(numTel)) {
            formContext.getControl(label).clearNotification();
            return;
        }

        numTel = numTel.replace(/[^\d]+/g, '');

        debugger;
        if (numTel.startsWith("0800")) {
            if (numTel.length != 11) {
                formContext.getControl(label).addNotification({ messages: ['Favor digitar um nÃºmero de telefone vÃ¡lido: 0800 123-4567'], notificationLevel: 'ERROR' });
                return;
            }
            numTel = numTel.substring(0, 4) + ' ' + numTel.substring(4, 7) + '-' + numTel.substring(7);
        }
        else {
            if (!this.ValidarDddTelefone(numTel)) {
                formContext.getControl(label).addNotification({ messages: ['O DDD informado Ã© invÃ¡lido.'], notificationLevel: 'ERROR' });
                return;
            }
            else
                formContext.getControl(label).clearNotification();

            if (celular) {
                if (numTel.length !== 11 || numTel.substring(2, 3) !== "9") {
                    formContext.getControl(label).addNotification({ messages: ['Favor digitar um numero de celular vÃ¡lido: (XX) 9xxxx-xxxx'], notificationLevel: 'ERROR' });
                    return;
                }
                else
                    formContext.getControl(label).clearNotification();
            }

            if (numTel.length === 10) {
                if (numTel.substring(2, 3) === "9") {
                    formContext.getControl(label).addNotification({ messages: ['Favor digitar um numero de telefone vÃ¡lido: (XX) 9xxxx-xxxx ou (XX) xxxx-xxxx'], notificationLevel: 'ERROR' });
                    return;
                } else {
                    numTel = '(' + numTel.substring(0, 2) + ') ' + numTel.substring(2, 6) + '-' + numTel.substring(6, 10);
                    formContext.getControl(label).clearNotification();
                }
            }
            else if (numTel.length === 11) {
                if (numTel.substring(2, 3) !== "9") {
                    formContext.getControl(label).addNotification({ messages: ['Favor digitar um numero de celular vÃ¡lido: (XX) 9xxxx-xxxx'], notificationLevel: 'ERROR' });
                    return;
                } else {
                    numTel = '(' + numTel.substring(0, 2) + ') ' + numTel.substring(2, 7) + '-' + numTel.substring(7, 11);
                    formContext.getControl(label).clearNotification();
                }
            }
            else {
                formContext.getControl(label).addNotification({ messages: ['Favor digitar um numero de telefone vÃ¡lido.'], notificationLevel: 'ERROR' });
                return;
            }
        }
        formContext.getControl(label).clearNotification();
        formContext.getAttribute(label).setValue(numTel);
    },
    ValidarSeTelefoneInternacional: function (numTel) {
        if (numTel === null || numTel === "")
            return false;

        if (numTel.startsWith("+") && !numTel.startsWith("+55"))
            return true;
        else
            return false;
    },

    ValidarDddTelefone: function (numTel) {
        var ddd = "11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99";

        if (numTel === null || numTel === "" || numTel.length < 2)
            return false;

        if (!ddd.includes(numTel.substring(0, 2)))
            return false;
        else
            return true;
    }
}