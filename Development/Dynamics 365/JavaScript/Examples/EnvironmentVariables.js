/**
 * Default Value - gera camada - é gerenciado 
 * Current Value - gera camada - não é gerenciado
 */
if (typeof Cliente == "undefined") { Cliente = {}; }
if (typeof Cliente.CRM == "undefined") { Cliente.CRM = {}; }

Cliente.CRM.EnvironmentVariables = {

    Type: {
        String: 100000000,
        Number: 100000001,
        Boolean: 100000002,
        JSON: 100000003,
    },

    GetValueOrDefault: async function (schema_name) {

        var variableDefinition = await Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", "?$select=environmentvariabledefinitionid,defaultvalue&$filter=schemaname eq '" + schema_name +"'").then(function (result) {
            return result;
        });

        if (variableDefinition.entities.length == 0) {
            return null;
        }

        var definitionId = variableDefinition.entities[0].environmentvariabledefinitionid;
		var defaultValue = variableDefinition.entities[0].defaultvalue;

        var variableValue = await Xrm.WebApi.retrieveMultipleRecords("environmentvariablevalue", "?$select=environmentvariablevalueid,value&$filter=_environmentvariabledefinitionid_value eq " + definitionId).then(function (result) {
            return result;
        });

        if (variableValue.entities.length > 0 && variableValue.entities[0].value !== null) {
            return variableValue.entities[0].value;
        }

        return defaultValue;
    },

    GetValue: async function (schema_name) {

        var variableValue = await Xrm.WebApi.retrieveMultipleRecords("environmentvariablevalue",
            "?$select=environmentvariablevalueid,value" +
            "&$expand=EnvironmentVariableDefinitionId($select=schemaname)" +
            "&$filter=EnvironmentVariableDefinitionId/schemaname eq '" + schema_name +"'"
        ).then(function (result) {
            return result;
        });

        if (variableValue.entities.length > 0) {
			return variableValue.entities[0].value;
        }

        return null;
    },

    GetObjectFromJSON: async function (schema_name) {
        var json = await Cliente.CRM.EnvironmentVariables.GetValueOrDefault(schema_name);
        try {
            return JSON.parse(json);
        } catch (e) {
            console.error("Erro ao fazer parse do JSON:", e);
            return null; 
        }
    },
}