// Add record to a queue 
Entity record = new Entity("account", new Guid("00000000-0000-0000-0000-000000000001")); 

EntityReference destinationQueueId = new EntityReference("team", new Guid("00000000-0000-0000-0000-000000000001")); 

AddToQueueRequest routeRequest = new AddToQueueRequest
{
    Target = record.ToEntityReference(),
    DestinationQueueId = destinationQueueId
};

service.Execute(routeRequest);
