[TestMethod]
public void TestPlugin()
{
    ParameterCollection inputParameters = new ParameterCollection();
    inputParameters.Add("Target", new Entity("table_name") { Id = new Guid("00000000-0000-0000-0000-000000000000") });
    
    EntityImageCollection preImageCollection = new EntityImageCollection();
    preImageCollection.Add("PreImage", new Entity("table_name") { Id = new Guid("00000000-0000-0000-0000-000000000000") });
    
    EntityImageCollection postImageCollection = new EntityImageCollection();
    postImageCollection.Add("PreImage", new Entity("table_name") { Id = new Guid("00000000-0000-0000-0000-000000000000") });
    
    XrmRealContext context = new XrmRealContext(service);
    XrmFakedPluginExecutionContext pluginContext = context.GetDefaultPluginContext();
    pluginContext.InputParameters = inputParameters;
    pluginContext.PreEntityImages = preImageCollection;
    pluginContext.PostEntityImages = postImageCollection;
    pluginContext.MessageName = "messageName"; // Create | Update | Delete | CustomMessage
    pluginContext.Mode = 1; // 1 - Sync | 0 - Async
    pluginContext.Stage = 40; // 10 - Pre Validation | 20 - Pre Operation | 40 - Post Operation
    pluginContext.UserId = new Guid("{00000000-0000-0000-0000-000000000000}");
    pluginContext.InitiatingUserId = new Guid("{00000000-0000-0000-0000-000000000000}");
    
    context.ExecutePluginWith<PluginName>(pluginContext);
}

[TestMethod]
[DataRow("value 1", "value 2")]
public void TestPluginWithVar(string var1, string var2)
{
    var context = new XrmRealContext(GetOrganizationService());
    var pluginContext = context.GetDefaultPluginContext();
    pluginContext.InputParameters.Add("var1", var1);
    pluginContext.InputParameters.Add("var2", var2);
    try
    {
        context.ExecutePluginWith<PluginName>(pluginContext);
    }
    catch (Exception ex)
    {
        Assert.Fail(ex.Message);
    }
}
