///'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Servidor = {
    ListarDadosDoServicoAsync: async (nomeServico) => {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();

            xhr.withCredentials = true;
            
            xhr.open("GET", `${window.location.origin}/api/data/v9.1/frt_servidors?$filter=frt_name eq '${nomeServico}'`);

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };

            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
            xhr.send();
        });
    }
}