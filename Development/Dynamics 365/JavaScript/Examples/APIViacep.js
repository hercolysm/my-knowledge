if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

Client.Dyn365.APIViacep = {

    callback: null,

    ObterCepInfo(cep, callback) {

        Client.Dyn365.APIViacep.callback = callback;

        //var url = "viacep.com.br/ws/05419000/json/?callback=callback_name";

        var viacepUrl = "https://viacep.com.br/ws/{cep}/json/?callback=jsonCallback";
        viacepUrl = viacepUrl.replace("{cep}", cep);

        try {

            $.ajax({
                url: viacepUrl,
                dataType: "jsonp",
                jsonpCallback: "Client.Dyn365.APIViacep.jsonCallback"
            });

        } catch (e) {

            debugger;

            var resposta = {};
            resposta.success = false;
            resposta.errorMessage = "Falha ao consultar CEP [{cep}]. " + e.message;
            resposta.errorMessage = resposta.errorMessage.replace("{cep}", cep);

            if (Client.Dyn365.APIViacep.callback != null)
                Client.Dyn365.APIViacep.callback(resposta);

            return;
        }
    },

    jsonCallback: function (json) {

        var resposta = {};
        resposta.success = false;
        resposta.errorMessage = "";
        resposta.endereco = {};

        if (json == undefined || json == null) {
            resposta.success = false;
            resposta.errorMessage = "Falha ao consultar CEP";

            if (Client.Dyn365.APIViacep.callback != null)
                Client.Dyn365.APIViacep.callback(resposta);

            return;
        }
        console.log(json);

        if (json.erro != undefined && json.erro == true) {
            resposta.success = false;
            resposta.errorMessage = "CEP não encontrado";

            if (Client.Dyn365.APIViacep.callback != null)
                Client.Dyn365.APIViacep.callback(resposta);

            return;
        }

        resposta.endereco.cep = "";
        resposta.endereco.pais = "";
        if (json.cep != undefined && json.cep != null) {
            resposta.endereco.cep = json.cep;
            resposta.endereco.pais = "Brasil";
        }

        resposta.endereco.logradouro = "";
        if (json.logradouro != undefined && json.logradouro != null)
            resposta.endereco.logradouro = json.logradouro;

        resposta.endereco.complemento = "";
        if (json.complemento != undefined && json.complemento != null)
            resposta.endereco.complemento = json.complemento;

        resposta.endereco.bairro = "";
        if (json.bairro != undefined && json.bairro != null)
            resposta.endereco.bairro = json.bairro;

        resposta.endereco.localidade = "";
        if (json.localidade != undefined && json.localidade != null)
            resposta.endereco.localidade = json.localidade;

        resposta.endereco.uf = "";
        if (json.uf != undefined && json.uf != null)
            resposta.endereco.uf = json.uf;

        resposta.endereco.ibge = "";
        if (json.ibge != undefined && json.ibge != null)
            resposta.endereco.ibge = json.ibge;

        resposta.endereco.gia = "";
        if (json.gia != undefined && json.gia != null)
            resposta.endereco.gia = json.gia;

        resposta.endereco.ddd = "";
        if (json.ddd != undefined && json.ddd != null)
            resposta.endereco.ddd = json.ddd;

        resposta.endereco.siafi = "";
        if (json.siafi != undefined && json.siafi != null)
            resposta.endereco.siafi = json.siafi;

        resposta.success = true;
        resposta.errorMessage = "";

        if (Client.Dyn365.APIViacep.callback != null)
            Client.Dyn365.APIViacep.callback(resposta);
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
}