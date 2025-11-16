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
                if (context.InputParameters.Contains("Target") &&
                    context.InputParameters["Target"] is Entity)
                {
                    Entity entity = (Entity)context.InputParameters["Target"];

                    if (entity.LogicalName != "account")
                        return;
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
