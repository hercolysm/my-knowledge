if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

Client.Dyn365.APIReceitaWS = {

    ConsultarReceita: function () {
        var tipo = FormContext.getAttribute("frt_tipo").getValue();
        var cnpj = FormContext.getAttribute("frt_cnpj_cpf").getValue();

        if (tipo != Fortics_tipo_account.CNPJ || cnpj == "" || cnpj === null)
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
                        FormContext.getAttribute("name").setValue(empresa.name);
                        FormContext.getAttribute("frt_nome_fantasia").setValue(empresa.frt_nome_fantasia);
                        FormContext.getAttribute("telephone1").setValue(empresa.telephone1);
                        FormContext.getAttribute("emailaddress1").setValue(empresa.emailaddress1);
                        FormContext.getAttribute("emailaddress1").fireOnChange()
                        FormContext.getAttribute("address1_line1").setValue(empresa.address1_line1);
                        FormContext.getAttribute("address1_line2").setValue(empresa.address1_line2);
                        FormContext.getAttribute("address1_line3").setValue(empresa.address1_line3);
                        FormContext.getAttribute("address1_county").setValue(empresa.address1_county);
                        FormContext.getAttribute("address1_city").setValue(empresa.address1_city);
                        FormContext.getAttribute("address1_stateorprovince").setValue(empresa.address1_stateorprovince);
                        FormContext.getAttribute("address1_postalcode").setValue(empresa.address1_postalcode);
                        FormContext.getAttribute("address1_country").setValue("Brasil");
                        FormContext.getAttribute("marketcap").setValue(empresa.marketcap);
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
}