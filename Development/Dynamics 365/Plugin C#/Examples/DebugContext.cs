using System;
using System.ServiceModel;
using Microsoft.Xrm.Sdk;

namespace PowerApps.Samples
{
    /// <summary>
    /// The plug-in creates a task activity after a new account is created. The activity reminds the user to
    /// follow-up with the new account customer one week after the account was created.
    /// </summary>
    /// <remarks>Register this plug-in on the Create message, account entity, and asynchronous mode.
    /// </remarks>
    public class DebugContext : IPlugin  // Implements the IPlugin interface
    {
        /// <summary>
        /// Execute method that is required by the IPlugin interface.
        /// </summary>
        /// <param name="serviceProvider">The service provider from which you can obtain the
        /// tracing service, plug-in execution context, organization service, and more.</param>
        public void Execute(IServiceProvider serviceProvider)
        {
            //Extract the tracing service for use in debugging sandboxed plug-ins.
            ITracingService tracingService =
                (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // Obtain the execution context from the service provider.
            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

            // Show all properties of the context
            foreach (var prop in context.GetType().GetProperties())
            {
                tracingService.Trace($"Property: {prop.Name} = {prop.GetValue(context)}");
            }

            // Show all input parameters
            foreach (var param in context.InputParameters)
            {
                tracingService.Trace($"InputParameter: {param.Key} = {param.Value}");
            }

            // Show all output parameters
            foreach (var param in context.OutputParameters)
            {
                tracingService.Trace($"OutputParameter: {param.Key} = {param.Value}");
            }

            // Show all shared variables
            foreach (var param in context.SharedVariables)
            {
                tracingService.Trace($"SharedVariable: {param.Key} = {param.Value}");
            }

            // Show all pre-entity images
            foreach (var img in context.PreEntityImages)
            {
                tracingService.Trace($"PreEntityImage: {img.Key} = {img.Value}");
            }

            // Show all post-entity images
            foreach (var img in context.PostEntityImages)
            {
                tracingService.Trace($"PostEntityImage: {img.Key} = {img.Value}");
            }  
        }
    }
}