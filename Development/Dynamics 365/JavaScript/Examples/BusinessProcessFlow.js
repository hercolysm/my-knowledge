if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

Client.Dyn365.BusinessProcessFlow = {
    
    SetBPF: function () {
        var processoVendasOportunidadeId = "3e8ebee6-a2bc-4451-9c5f-b146b085413a";
        var activeProcess = FormContext.data.process.getActiveProcess();
        var currProcessId = activeProcess.getId();
        
        if (currProcessId.toLowerCase() == processoVendasOportunidadeId)
            return;

        FormContext.data.process.setActiveProcess(processoVendasOportunidadeId, myCallBack);
        
        function myCallBack(response) {
            if (response == "success") {
                //alert("BPF changed!!!");
                //// Save the form
                //Xrm.Page.data.entity.save();
            }
            else {
                alert("Error changing BPF!!!");
            }
        }
    },
}
