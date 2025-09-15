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

                if (!context.Stage.Equals(20)) // pre-operation
                    return;

                if (context.MessageName.Equals("RetrieveMultiple"))
                {
                    if (context.InputParameters.Contains("Query") &&
                        context.InputParameters["Query"] is FetchExpression)
                    {
                        FetchExpression query = (FetchExpression)context.InputParameters["Query"];
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

