using FakeXrmEasy;
using Microsoft.Xrm.Sdk;

[TestMethod]
public void TestPluginEntity()
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
public void TestPluginService()
{
    var table_name = service.Retrieve(
        "table_name", new Guid("{00000000-0000-0000-0000-000000000000}"),
        new ColumnSet("columnname"));

    Entity record = new Entity("record");
    record["text"] = "Name teste";
    record["table_ref"] = new EntityReference(table_name.LogicalName, table_name.Id);
    record["boolean"] = false;
    service.Create(record);

    ParameterCollection inputParameters = new ParameterCollection();
    inputParameters.Add("Target", record);

    XrmRealContext context = new XrmRealContext(service);
    XrmFakedPluginExecutionContext pluginContext = context.GetDefaultPluginContext();
    pluginContext.InputParameters = inputParameters;
    pluginContext.MessageName = "Create";
    pluginContext.Mode = 1; //1 - Sync | 0 - Async
    pluginContext.Stage = 20; //40 - Post Operation, 20 - Pre Operation, 10 - Pre Validation
    pluginContext.UserId = Guid.Parse("{00000000-0000-0000-0000-000000000000}");

    context.ExecutePluginWith<EnvioPluginName>(pluginContext);
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

[TestMethod]
public void TestFunctionWithTrace()
{
    XrmRealContext context = new XrmRealContext(service);
    var trace = context.GetFakeTracingService();

    ClassName _object = new ClassName(service);
    var agendamentos = _object.FunctionName(service, trace, "var 1");
}

