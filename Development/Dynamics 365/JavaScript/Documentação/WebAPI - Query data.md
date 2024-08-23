Query data using the Web API

Link: [https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api](https://learn.microsoft.com/en-us/power-apps/developer/data-platform/webapi/query-data-web-api)

Listar todas as tabelas
```
GET [Organization URI]/api/data/v9.2/
```

Estrutura da URL
```
GET [Organization URI]/api/data/v9.2/accounts?$select=name,revenue
```

- `%20` -> espaço na URL 

- `$top=3` -> define a quantidade de registros 

- `$select=column1,column2` -> seleciona colunas 

- `$filter=column eq 'value'` -> aplica filtros 
    - `any` 
    - `all` 

- `$expand=column1($select=column1,column2)` -> seleciona colunas do lookup

- `$orderby=column1 asc, column2 desc` -> ordena a consulta

Exemplos 
```
GET [Organization URI]/api/data/v9.2/teammemberships?$top=3&$select=systemuserid,teamid&$filter=systemuserid%20eq%20669093F1-C98D-ED11-81AE-002248381498
```

```
GET [Organization URI]/api/data/v9.2/fly_atividadeouvidorias?$select=_owningteam_value&$filter=_regardingobjectid_value eq A3AD9681-CFA7-ED11-AAD1-002248381785 and _owningteam_value ne null
```

```
GET [Organization URI]/api/data/v9.2/teammemberships?$select=systemuserid,teamid&$filter=systemuserid eq 669093F1-C98D-ED11-81AE-002248381498 and (false or teamid eq 71976207-1EC4-E911-A980-000D3AC009CC or teamid eq ECAB8DFC-5428-ED11-9DB1-00224837E68F)
```
