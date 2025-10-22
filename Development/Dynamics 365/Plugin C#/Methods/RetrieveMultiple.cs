// Define the query
QueryExpression query = new QueryExpression("account")
{
    TopCount = 5
};

// Add columns to query.ColumnSet
query.ColumnSet.AddColumns("name", "primarycontactid");

// Add conditions to query.Criteria
query.Criteria.AddCondition("address1_city", ConditionOperator.Equal, "Redmond");

// Add orders
query.AddOrder("name", OrderType.Ascending);

// Set NoLock to true to avoid locking the records during retrieval
query.NoLock = true;

// Send the request
EntityCollection results = service.RetrieveMultiple(query);

// Show the data
foreach (Entity record in results.Entities)
{
    Console.WriteLine($"name:{record.GetAttributeValue<string>("name")}");
}

// Example with multiple conditions
var entityCollection = service.RetrieveMultiple(new QueryExpression("table_name")
{
    ColumnSet = new ColumnSet("columnname"),
    Criteria = new FilterExpression
    {
        Conditions =
        {
            new ConditionExpression("columnname", ConditionOperator.Equal, "value"),
            new ConditionExpression("id", ConditionOperator.In, new object[]
            {
                new Guid("{00000000-0000-0000-0000-000000000000}"),
                new Guid("{00000000-0000-0000-0000-000000000000}")
            })
        }
    }
});
