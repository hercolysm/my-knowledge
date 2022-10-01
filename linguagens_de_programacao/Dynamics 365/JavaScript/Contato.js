///'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Contato = {
    globalContext: null,
    FormContext: null,

    OnLoad: (executionContext) => {
        Fortics.Dyn365.Contato.globalContext = executionContext;
        FormContext = SDKore.GetFormContext(executionContext);

        FormContext.getAttribute("mobilephone").addOnChange(Fortics.Dyn365.Contato.OnChange_mobilephone);
        FormContext.getAttribute("address2_telephone2").addOnChange(Fortics.Dyn365.Contato.OnChange_address2_telephone2);
        FormContext.getAttribute("address2_telephone3").addOnChange(Fortics.Dyn365.Contato.OnChange_address2_telephone3);
        FormContext.getAttribute("telephone1").addOnChange(Fortics.Dyn365.Contato.OnChange_telephone1);
        FormContext.getAttribute("telephone2").addOnChange(Fortics.Dyn365.Contato.OnChange_telephone2);
        FormContext.getAttribute("telephone3").addOnChange(Fortics.Dyn365.Contato.OnChange_telephone3);
        FormContext.getAttribute("frt_whatsapp").addOnChange(Fortics.Dyn365.Contato.OnChange_frt_whatsapp);
        FormContext.getAttribute("address1_telephone2").addOnChange(Fortics.Dyn365.Contato.OnChange_address1_telephone2);
        FormContext.getAttribute("address1_telephone3").addOnChange(Fortics.Dyn365.Contato.OnChange_address1_telephone3);

        Fortics.Dyn365.Contato.VisibilidadeTelefones();


        if (top.MscrmControls.FieldControls.PhoneNumberControl)
            top.MscrmControls.FieldControls.PhoneNumberControl.prototype.action = function () {
                Fortics.Dyn365.Click2Call.DiscarAsync(Fortics.Dyn365.Contato.globalContext, this._value);
            };
    },

    OnChange_Postalcode(executionContext) {
        var FormContext = SDKore.GetFormContext(executionContext);
        var label = executionContext.getEventSource().getName();

        if (label == undefined || label == null || label != "address1_postalcode")
            return;

        var cep = FormContext.getAttribute("address1_postalcode").getValue();

        if (cep === "" || cep === null) {
            Fortics.Dyn365.Contato.LimpaCamposEndereco();
            return;
        }

        cep = cep.replace(/[^\d]+/g, '');

        if (cep.length !== 8) {
            Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "OK", text: "CEP " + cep + " InvÃ¡lido" }, { height: 100, width: 300 }).then(
                function success(result) {
                    Fortics.Dyn365.Contato.LimpaCamposEndereco();
                }
            );
        }
        else {
            Fortics.Dyn365.Contato.ObterCep(cep);
        }
    },

    ObterCep: function (cep) {

        Fortics.Dyn365.ViacepLibrary.ObterCepInfo(cep, Fortics.Dyn365.Contato.AtualizaCamposEnderecoCallback);
    },

    AtualizaCamposEnderecoCallback(retornoCallback) {

        if (retornoCallback == undefined || retornoCallback == null) {
            alert("Erro na consulta CEP");
            Fortics.Dyn365.Contato.LimpaCamposEndereco();
            return;
        }

        if (retornoCallback.success == false) {
            alert(retornoCallback.errorMessage);
            Fortics.Dyn365.Contato.LimpaCamposEndereco();
            return;
        }

        if (retornoCallback.endereco == undefined) {
            alert("Erro na consulta CEP. NÃ£o hÃ¡ endereÃ§o.");
            Fortics.Dyn365.Contato.LimpaCamposEndereco();
            return;
        }

        var endereco = retornoCallback.endereco;

        var FormContext = SDKore.GetFormContext(Fortics.Dyn365.Contato.globalContext);

        // AtualizaCampos
        if (endereco.cep != undefined && endereco.cep != null)
            FormContext.getAttribute("address1_postalcode").setValue(endereco.cep);

        if (endereco.logradouro != undefined && endereco.logradouro != null)
            FormContext.getAttribute("address1_line1").setValue(endereco.logradouro);

        if (endereco.complemento != undefined && endereco.complemento != null)
            FormContext.getAttribute("address1_line3").setValue(endereco.complemento);

        if (endereco.bairro != undefined && endereco.bairro != null)
            FormContext.getAttribute("address1_county").setValue(endereco.bairro);

        if (endereco.localidade != undefined && endereco.localidade != null)
            FormContext.getAttribute("address1_city").setValue(endereco.localidade);

        if (endereco.uf != endereco && endereco.uf != null)
            FormContext.getAttribute("address1_stateorprovince").setValue(endereco.uf);

        if (endereco.pais != endereco && endereco.pais != null)
            FormContext.getAttribute("address1_country").setValue(endereco.pais);
    },

    LimpaCamposEndereco: function () {
        var FormContext = SDKore.GetFormContext(Fortics.Dyn365.Contato.globalContext);

        FormContext.getAttribute("address1_postalcode").setValue("");

        FormContext.getAttribute("address1_line1").setValue("");

        FormContext.getAttribute("address1_line3").setValue("");

        FormContext.getAttribute("address1_county").setValue("");

        FormContext.getAttribute("address1_city").setValue("");

        FormContext.getAttribute("address1_stateorprovince").setValue("");

        FormContext.getAttribute("address1_country").setValue("");
    },

    OnChangeCpf: function (executionContext) {
        var FormContext = SDKore.GetFormContext(executionContext);
        var cpf = FormContext.getAttribute("frt_cpf").getValue();
        cpf = Fortics.Dyn365.Validacoes.RemoverCaracteresEspeciais(cpf);

        if (cpf === null || cpf === "") 
            FormContext.getControl("frt_cpf").clearNotification();

        if (!Fortics.Dyn365.Validacoes.VerificarCpf(cpf)) {
            FormContext.getControl("frt_cpf").addNotification({ messages: ['O CPF digitado Ã© invÃ¡lido'], notificationLevel: 'ERROR' });
            return;
        }
        else 
            FormContext.getControl("frt_cpf").clearNotification();

        var cpfFormatado = Fortics.Dyn365.Validacoes.FormatarCpf(cpf);
        FormContext.getAttribute("frt_cpf").setValue(cpfFormatado);

        var contactId = FormContext.data.entity.getId();
        var filter = "";
        if (contactId !== "")
            filter = "contactid ne " + contactId + " and ";

        filter = filter + "frt_cpf eq '" + cpfFormatado + "'";
        var contatos = SDKore.GetAPI("contacts", "frt_cpf", filter);
        if (contatos != null) {
            FormContext.getControl("frt_cpf").addNotification({ messages: ['CPF jÃ¡ cadastrado'], notificationLevel: 'ERROR' });
            return;
        }
        else
            FormContext.getControl("frt_cpf").clearNotification();
    },
    //Telefone celular
    OnChange_mobilephone: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, true);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
    },

    //Telefone celular2
    OnChange_address2_telephone2: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, true);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
    },

    //Telefone celular3
    OnChange_address2_telephone3: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, true);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
    },

    //Telefone comercial
    OnChange_telephone1: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
    },

    //Telefone comercial 2
    OnChange_telephone2: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
    },

    //Telefone comercial 3
    OnChange_telephone3: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
    },

    //Whatsapp
    OnChange_frt_whatsapp: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
    },

    //Whatsapp 2
    OnChange_address1_telephone2: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
    },

    //Whatsapp 3
    OnChange_address1_telephone3: function (executionContext) {
        Fortics.Dyn365.Validacoes.ValidarFormatarNumTelefone(executionContext, false);
        Fortics.Dyn365.Contato.VisibilidadeTelefones();
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
    }
}