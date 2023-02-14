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

/* 

Query data using the Web API

Link: https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api

Listar todas as tabelas
    GET [Organization URI]/api/data/v9.2/

Estrutura da URL
    GET [Organization URI]/api/data/v9.2/accounts?$select=name,revenue

    %20 -> espaço na URL 

    $top=3 -> define a quantidade de registros 

    $select=column1,column2 -> seleciona as colunas da consulta

    $filter=column eq 'value'
        any 
        all 

    $expand= 

    $orderby=column

Exemplos 
    GET [Organization URI]/api/data/v9.2/teammemberships?$top=3&$select=systemuserid,teamid&$filter=systemuserid%20eq%20669093F1-C98D-ED11-81AE-002248381498

    GET [Organization URI]/api/data/v9.2/fly_atividadeouvidorias?$select=_owningteam_value&$filter=_regardingobjectid_value eq A3AD9681-CFA7-ED11-AAD1-002248381785 and _owningteam_value ne null

    GET [Organization URI]/api/data/v9.2/teammemberships?$select=systemuserid,teamid&$filter=systemuserid eq 669093F1-C98D-ED11-81AE-002248381498 and (false or teamid eq 71976207-1EC4-E911-A980-000D3AC009CC or teamid eq ECAB8DFC-5428-ED11-9DB1-00224837E68F)
*/
