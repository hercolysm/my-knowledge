if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

var formContext = null;

Client.Dyn365.Table = {
    formContext: null,

    Field: {
        Option1: 173180000,
        Option2: 173180001,
    },

    OnLoad: function (executionContext) {

        var formContext = executionContext.getFormContext(); 
    }
}
