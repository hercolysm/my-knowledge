// Funções de Formulário do Dynamics 365


/* Form Context */

// Get Form Context
var FormContext = executionContext.getFormContext();   

// Refresh form (ask about modifications) 
FormContext.data.refresh(false).then(null, null);
Xrm.Page.data.refresh(false).then(null, null);

// Refresh form (force save)
FormContext.data.refresh(true).then(null, null);
Xrm.Page.data.refresh(true).then(null, null);

// Refresh form with callbacks
FormContext.data.save(null).then(successCallback, errorCallback);


/* Get data */ 

// Get Id 
var Id = Xrm.Page.data.entity.getId().replace('{', '').replace('}', '');
var Id = FormContext.data.entity.getId().replace('{', '').replace('}', '');

// Get EntityName
var EntityName = Xrm.Page.data.entity.getEntityName();

// Get Id User
var userSettings = Xrm.Utility.getGlobalContext().userSettings
var IdUser = userSettings.userId.replace('{', '').replace('}', '');

// Get Roles current user
var currentUserRoles = Xrm.Utility.getGlobalContext().userSettings.securityRoles;

// Get URL 
Xrm.Utility.getGlobalContext().getClientUrl()


/* Fields */

// Get Field's Value
var Field_Name = Xrm.Page.getAttribute("Field_Name").getValue();
var Field_Name = FormContext.getAttribute("Field_Name").getValue();

// Set Field's Value 
FormContext.getAttribute("Field_Name").setValue(null);

// Add Required
FormContext.getAttribute("Field_Name").setRequiredLevel("required");

// Remove Required
FormContext.getAttribute("Field_Name").setRequiredLevel("none");

// Get Field control
var input = FormContext.getControl("input_name"); 

// Show/Hide Field
FormContext.getControl("Field_Name").setVisible(true/false);

// Remove Option
FormContext.getControl("Field_Name").removeOption(this.Field.Option1);


/* Sections */

// Show/Hide section
Xrm.Page.ui.tabs.get("Tab_Name").sections.get("Section_Name").setVisible(true/false); 


/* Tabs */

// Show/Hide tab
Xrm.Page.ui.tabs.get("Tab_Name").setVisible(true/false);

// Focus tab
Xrm.Page.ui.tabs.get("Tab_Name").setFocus();
FormContext.ui.tabs.get("Tab_Name").setFocus();


/* Header */

// Show/Hide header 
Xrm.Page.ui.headerSection.setBodyVisible(true);

// Show/Hide command bar 
Xrm.Page.ui.headerSection.setCommandBarVisible(false); 

// Show/Hide tab navigator 
Xrm.Page.ui.headerSection.setTabNavigatorVisible(false); 


/* Grids */

// Refresh grid 
var lookupOptions = {};
lookupOptions.entityType = "table_name";
Xrm.Utility.refreshParentGrid(lookupOptions);


/* Eventos */

// Add on change event
FormContext.getAttribute("Field_Name").addOnChange(FunctionName);

// Personalização do evento click em campos Lookup's
input.addOnLookupTagClick(function(data) {
  
  /* nova regra de negócio aqui... */ 
  
    var args = data._eventArgs; // impede que o registro seja aberto após o click
    args._preventDefault = true; // colocar como 'falso' para manter o comportamento padrão
});


/* App */

// Get current app name
var globalContext = parent.Xrm.Utility.getGlobalContext();
globalContext.getCurrentAppProperties().then(function successCallback(result) {

    if (result.uniqueName == "msdyn_Appname") {

    }
});


/* Ribbon Button */

// Get context in function
function functionName(primaryControl) {
    var formContext = primaryControl;
    var name = formContext.getAttribute("fly_name").getValue();
}


/* Form Notification */

// Show notification 
FormContext.ui.setFormNotification("Message here", "ERROR", "notification_id");
FormContext.ui.setFormNotification("Message here", "WARNING", "notification_id");
FormContext.ui.setFormNotification("Message here", "INFO", "notification_id");

// Hide notification 
FormContext.ui.clearFormNotification("notification_id");
