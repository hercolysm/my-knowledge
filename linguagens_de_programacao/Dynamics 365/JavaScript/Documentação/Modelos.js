if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

var formContext = null;

Client.Dyn365.SystemUser = {
    formContext: null,

    OnLoad: function (executionContext) {

        var formContext = executionContext.getFormContext(); 
    }
}
