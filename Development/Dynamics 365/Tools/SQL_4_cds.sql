/* Consultar log por correlationid */
select top 10 * from plugintracelog
where correlationid = '4a942006-826b-47ed-a005-aa334be549e1'
order by performanceexecutionstarttime

/* Consultar log pela action  */
select top 10 * from plugintracelog where messagename = 'new_PluginName'

/* Consultar log pelo plugin */
select top 10 messagename,primaryentity,performanceexecutionduration,correlationid,createdon,typename,messageblock,exceptiondetails, * from plugintracelog 
where messagename = 'Create' 
and primaryentity = 'incident' 
and typename = 'Fleury.CRM.Plugins.Incident.IncidentPostCreate, Fleury.CRM.Plugins, Version=1.0.0.0, Culture=neutral, PublicKeyToken=bcd3eafb1e43b5ff' 
and createdon between '2024-07-23 00:00:00.000' and '2024-07-23 23:59:59.000' 
and messageblock like '%000308405731%'
