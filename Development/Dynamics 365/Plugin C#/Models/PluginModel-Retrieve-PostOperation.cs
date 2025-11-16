using Microsoft.Xrm.Sdk;

namespace MyPlugins
{
    public class MyPlugin : IPlugin  
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            #region Context and Services
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);            
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            #endregion 

            try
            {
                if (!context.Mode.Equals(0)) // sincrono
                    return;

                if (!context.Stage.Equals(40)) // post-operation
                    return;

                if (context.MessageName.Equals("Retrieve"))
                {
                    if (context.OutputParameters.Contains("BusinessEntity") &&
                        context.OutputParameters["BusinessEntity"] is Entity)
                    {
                        Entity entity = (Entity)context.OutputParameters["BusinessEntity"];

                        if (entity.LogicalName != "contact")
                            return;

                        tracingService.Trace("Contact Retrieve");

                        // lógica do plugin
                        if (entity.Attributes.Contains("new_fieldname"))
                        {
                            entity["new_fieldname"] = "0123";
                        }
                    }
                }
                else if (context.MessageName.Equals("RetrieveMultiple"))
                {
                    if (context.OutputParameters.Contains("BusinessEntityCollection") &&
                        context.OutputParameters["BusinessEntityCollection"] is EntityCollection)
                    {
                        EntityCollection entityCollection = (EntityCollection)context.OutputParameters["BusinessEntityCollection"];

                        if (entityCollection.EntityName != "contact")
                            return;

                        tracingService.Trace("Contact RetrieveMultiple");

                        foreach (var entity in entityCollection.Entities)
                        {
                            // lógica do plugin
                            if (entity.Attributes.Contains("new_fieldname"))
                            {
                                entity["new_fieldname"] = "0123";
                            }
                        }
                    }
                }
            }
            catch (FaultException<OrganizationServiceFault> ex)
            {
                throw new InvalidPluginExecutionException("An error occurred in the plug-in.", ex);
            }
            catch (Exception ex)
            {
                tracingService.Trace("Plugin: {0}", ex.ToString());
                throw;
            }
        }
    }
}

/*
 References: 
 https://learn.microsoft.com/en-us/power-apps/developer/data-platform/write-plug-in?tabs=iplugin 
 https://learn.microsoft.com/en-us/power-apps/developer/data-platform/tutorial-write-plug-in
 https://learn.microsoft.com/pt-br/training/modules/extend-plug-ins/exercise
 */
