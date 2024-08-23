if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

Client.Dyn365.Task = {
    
    PreencherDataFinal: function (executionContext) {
        var formContext = SDKore.GetFormContext(executionContext);
    
        var dataInicial = formContext.getAttribute("actualstart").getValue();
    
        if (dataInicial == "" || dataInicial == null) {
            formContext.getAttribute("actualend").setValue(null);
            return;
        }
    
        var dateTimeEnd = dataInicial;
        dateTimeEnd.setMinutes(dateTimeEnd.getMinutes() + 5);
        formContext.getAttribute("actualend").setValue(dateTimeEnd);
    },
}
