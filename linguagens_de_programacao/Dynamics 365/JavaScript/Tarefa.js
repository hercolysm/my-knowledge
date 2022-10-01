if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Tarefa = {

    FormContext: null,

    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        FormContext.getAttribute("frt_empresa").addOnChange(Fortics.Dyn365.Tarefa.OnChangeEmpresa);
        Fortics.Dyn365.Tarefa.SetFilterContato();
    },

    SetFilterContato: function () {
        var empresa = FormContext.getAttribute("frt_empresa").getValue();
        var accountId = "";
        if (empresa != null)
            accountId = empresa[0].id;

        Fortics.Dyn365.SetLookUpFilter.SetContactFilter(FormContext, accountId, "frt_contato");
    },

    OnChangeEmpresa: function () {
        Fortics.Dyn365.Tarefa.SetFilterContato();

    },
}