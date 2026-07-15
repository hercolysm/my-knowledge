/* Consultar log pela action  */
select top 50 plugintracelogid,createdon,correlationid,primaryentity,messagename,mode,modename,depth,operationtype,operationtypename,performanceexecutionduration,pluginstepid,typename,messageblock,exceptiondetails
from plugintracelog 
where messagename = 'new_PluginName'

/* Consultar log pelo plugin */
select top 50 plugintracelogid,createdon,correlationid,primaryentity,messagename,mode,modename,depth,operationtype,operationtypename,performanceexecutionduration,pluginstepid,typename,messageblock,exceptiondetails
from plugintracelog 
where messagename = 'Create' 
and primaryentity = 'incident' 
and typename = 'Cliente.CRM.Plugins.Incident.IncidentPostCreate, Cliente.CRM.Plugins, Version=1.0.0.0, Culture=neutral, PublicKeyToken=bcd3eafb1e43b5ff' 
and createdon between '2024-07-23 00:00:00.000' and '2024-07-23 23:59:59.000' 
and messageblock like '%000308405731%'

/* Consultar log por correlationid */
select top 50 plugintracelogid,createdon,correlationid,primaryentity,messagename,mode,modename,depth,operationtype,operationtypename,performanceexecutionduration,pluginstepid,typename,messageblock,exceptiondetails
from plugintracelog 
where correlationid = '4a942006-826b-47ed-a005-aa334be549e1'
order by performanceexecutionstarttime

/* Consultar log de auditoria */ 
SELECT TOP 1000 * FROM audit 
WHERE 
    operationname = 'Acesso' 
    AND createdon BETWEEN '2026-02-01 00:00:00.00' AND '2026-02-09 23:59:59.00'