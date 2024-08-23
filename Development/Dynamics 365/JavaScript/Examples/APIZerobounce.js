if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

Client.Dyn365.APIZerobounce = {

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
}