//'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Atividade = {
	OnLoad: function (executionContext) {
		Fortics.Dyn365.Atividade.PreencherDataInicialFinal(executionContext);
	},
	PreencherDataInicialFinal: function (executionContext) {
		var formContext = SDKore.GetFormContext(executionContext);

		if (formContext.getAttribute("statecode").getValue() != 0) //aberta
			return;

		if (formContext.getAttribute("actualstart").getValue() != "" && formContext.getAttribute("actualstart").getValue() != null)
			return;

		var dateTimeNow = new Date();
		formContext.getAttribute("actualstart").setValue(dateTimeNow);
		Fortics.Dyn365.Atividade.PreencherDataFinal(executionContext);
	},

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

	OnChangeDataInicial: function (executionContext) {
		Fortics.Dyn365.Atividade.PreencherDataFinal(executionContext);
	},

	OnChangeContato: function (executionContext) {
		Fortics.Dyn365.Atividade.PreencherEmpresa(executionContext);
	},
	PreencherEmpresa: function (executionContext) {
		var formContext = SDKore.GetFormContext(executionContext);
		var labelContato = Fortics.Dyn365.Atividade.GetLabelContato(executionContext);
		var contato = formContext.getAttribute(labelContato).getValue();

		if (contato == null || contato.length == 0 || contato[0].entityType != "contact")
			return;

		Xrm.WebApi.retrieveRecord("contact", contato[0].id, "?$select=_parentcustomerid_value").then(
			function success(result) {
				if (result._parentcustomerid_value != null) {
					var empresaLk = SDKore.CreateLookup(result._parentcustomerid_value, result["_parentcustomerid_value@OData.Community.Display.V1.FormattedValue"], "account");
					formContext.getAttribute("frt_empresa").setValue(empresaLk);
					Fortics.Dyn365.Atividade.SetContactFilter(executionContext);
				}
			},
			function (error) {
				console.log(error.message);
			}
		);
	},

	GetLabelContato: function (executionContext) {
		var formContext = SDKore.GetFormContext(executionContext);
		var entityName = formContext.data.entity.getEntityName();
		var labelContato = "";
		if (entityName == "task")
			labelContato = "frt_contato";
		else if (entityName == "phonecall")
			labelContato = "to";

		return labelContato;
	},
}