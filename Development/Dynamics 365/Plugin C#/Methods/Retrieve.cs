Entity systemuser = service.Retrieve(
    "systemuser",
    new Guid(systemuserId),
    new ColumnSet("name", "statuscode")
);
