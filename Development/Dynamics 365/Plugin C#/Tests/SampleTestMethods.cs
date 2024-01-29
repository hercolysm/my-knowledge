[TestMethod]
public void TestPlugin()
{
    ParameterCollection inputParameters = new ParameterCollection();
    inputParameters.Add("Target", new Entity("table_name") { Id = new Guid("00000000-0000-0000-0000-000000000000") });

    XrmRealContext context = new XrmRealContext(service);
    XrmFakedPluginExecutionContext pluginContext = context.GetDefaultPluginContext();
    pluginContext.InputParameters = inputParameters;
    pluginContext.MessageName = "messageName"; // Create | Update | Delete | CustomMessage
    pluginContext.Mode = 1; // 1 - Sync | 0 - Async
    pluginContext.Stage = 40; // 10 - Pre Validation | 20 - Pre Operation | 40 - Post Operation
    pluginContext.UserId = new Guid("{00000000-0000-0000-0000-000000000000}");
    pluginContext.InitiatingUserId = new Guid("{00000000-0000-0000-0000-000000000000}");

    context.ExecutePluginWith<PluginName>(pluginContext);
}
