// Client API reference 

// Link: https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/xrm-webapi/

// Retrieve Record 
Xrm.WebApi.retrieveRecord("account", "131f7ee2-8879-ed11-81ad-00224836fdb9", "?$select=name&$expand=primarycontactid($select=contactid,fullname)").then(
    function success(result) {
        console.log("Retrieved values: Name: " + result.name + ", Primary Contact ID: " + result.primarycontactid.contactid +
                ", Primary Contact Name: " + result.primarycontactid.fullname);
        // perform operations on record retrieval
        console.log(result);
        /*
            {
                "@odata.context": "https://org3be35802.crm2.dynamics.com/api/data/v9.0/$metadata#accounts(name,primarycontactid(contactid,fullname))/$entity",
                "@odata.etag": "W/\"1053392\"",
                "name": "A. Datum Corporation (exemplo)",
                "statecode@OData.Community.Display.V1.FormattedValue": "Ativa",
                "statecode": 0,
                "accountid": "131f7ee2-8879-ed11-81ad-00224836fdb9",
                "merged@OData.Community.Display.V1.FormattedValue": "Não",
                "merged": false,
                "primarycontactid": {
                    "@odata.etag": "W/\"1053023\"",
                    "contactid": "271f7ee2-8879-ed11-81ad-00224836fdb9",
                    "fullname": "Andrade (exemplo), Diogo"
                }
            }
        */ 
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);

// Retrieve Multiple Records
Xrm.WebApi.online.retrieveMultipleRecords("table_name", "?$select=Field_Name&$filter=Field_Name eq " + Value).then(
    function success(results) {
        for (var i = 0; i < result.entities.length; i++) {
            console.log(result.entities[i]);
        }                    
        // perform additional operations on retrieved records
        console.log(results);
        /*
            {
                "entities": [
                    {
                        "@odata.etag": "W/\"1299990\"",
                        "firstname": "Luis",
                        "contactid": "231f7ee2-8879-ed11-81ad-00224836fdb9"
                    }
                ]
            }
        */ 
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);

// Retrieve current user with FetchXML 
var fetchXmlUser = "?fetchXml=<fetch mapping='logical'><entity name='systemuser'><filter type='and'><condition attribute='systemuserid' operator='eq-userid' /></filter></entity></fetch>"

Xrm.WebApi.retrieveMultipleRecords("systemuser", fetchXmlUser).then(
    function success(parametros) {
        if (parametros.entities.length > 0) {
            let idusuario = parametros.entities[0].systemuserid;
            console.log(idusuario);
        }
    }
)

var entity = {
    "name": "Updated Sample Account ",
    "creditonhold": true,
    "address1_latitude": 47.639583,
    "description": "This is the updated description of the sample account",
    "revenue": 6000000,
    "accountcategorycode": 2,
    "relationship_name@odata.bind": "/accounts(5531d753-95af-e711-a94e-000d3a11e605)",
    "opendeals_date": new Date("2024-02-03T00:00:00Z")
}

// Create a record
Xrm.WebApi.createRecord("account", entity).then(
    function success(result) {
        let entityFormOptions = {
            entityName: "account",
            entityId: result.id
        };
        Xrm.Navigation.openForm(entityFormOptions);
    },
    function (error) {
        Xrm.Navigation.openErrorDialog({ message: error.message });
    }
);

// Update a record
Xrm.WebApi.updateRecord("account", "5531d753-95af-e711-a94e-000d3a11e605", entity).then(
    function success(result) {
        console.log("Account updated");
        // perform operations on record update
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);


