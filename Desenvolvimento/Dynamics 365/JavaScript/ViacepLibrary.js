if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.ViacepLibrary = {

    callback: null,

    ObterCepInfo(cep, callback) {

        Fortics.Dyn365.ViacepLibrary.callback = callback;

        //var url = "viacep.com.br/ws/05419000/json/?callback=callback_name";

        var viacepUrl = "https://viacep.com.br/ws/{cep}/json/?callback=jsonCallback";
        viacepUrl = viacepUrl.replace("{cep}", cep);

        try {

            $.ajax({
                url: viacepUrl,
                dataType: "jsonp",
                jsonpCallback: "Fortics.Dyn365.ViacepLibrary.jsonCallback"
            });

        } catch (e) {

            debugger;

            var resposta = {};
            resposta.success = false;
            resposta.errorMessage = "Falha ao consultar CEP [{cep}]. " + e.message;
            resposta.errorMessage = resposta.errorMessage.replace("{cep}", cep);

            if (Fortics.Dyn365.ViacepLibrary.callback != null)
                Fortics.Dyn365.ViacepLibrary.callback(resposta);

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

            if (Fortics.Dyn365.ViacepLibrary.callback != null)
                Fortics.Dyn365.ViacepLibrary.callback(resposta);

            return;
        }
        console.log(json);

        if (json.erro != undefined && json.erro == true) {
            resposta.success = false;
            resposta.errorMessage = "CEP não encontrado";

            if (Fortics.Dyn365.ViacepLibrary.callback != null)
                Fortics.Dyn365.ViacepLibrary.callback(resposta);

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

        if (Fortics.Dyn365.ViacepLibrary.callback != null)
            Fortics.Dyn365.ViacepLibrary.callback(resposta);
    }
}