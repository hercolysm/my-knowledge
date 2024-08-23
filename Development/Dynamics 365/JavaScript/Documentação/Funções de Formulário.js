// Funções de Formulário do Dynamics 365


/* Form Context */

// Get Form Context
var formContext = executionContext.getFormContext();   
// Obs: Xrm.Page foi descontinuado, utilize FormContext no lugar

// Refresh form (ask about modifications) 
formContext.data.refresh(false).then(null, null);

// Refresh form (force save)
formContext.data.refresh(true).then(null, null);

// Refresh form with callbacks
formContext.data.save(null).then(successCallback, errorCallback);


/* Get data */ 

// Get Id 
var Id = formContext.data.entity.getId().replace('{', '').replace('}', '');

// Get EntityName
var EntityName = formContext.data.entity.getEntityName();

// Get Id User
var userSettings = Xrm.Utility.getGlobalContext().userSettings
var IdUser = userSettings.userId.replace('{', '').replace('}', '');

// Get Roles current user
var currentUserRoles = Xrm.Utility.getGlobalContext().userSettings.securityRoles;

// Get URL 
Xrm.Utility.getGlobalContext().getClientUrl()


/* Fields */

// Get Field's Value
var Field_Name = formContext.getAttribute("Field_Name").getValue();

// Get Lookup's Values
var Lookup = formContext.getAttribute("Lookup_Name").getValue();
var id = Lookup[0]['id'];
var name = Lookup[0]['name'];
var entityType = Lookup[0]['entityType'];

// Set Field's Value 
formContext.getAttribute("Field_Name").setValue(null);

// Fire Onchange Event
formContext.getAttribute("Field_Name").fireOnChange();

// Add Required
formContext.getAttribute("Field_Name").setRequiredLevel("required");

// Remove Required
formContext.getAttribute("Field_Name").setRequiredLevel("none");

// Change Submit Mode 
formContext.getAttribute("Field_Name").getSubmitMode();
formContext.getAttribute("Field_Name").setSubmitMode('never');
formContext.getAttribute("Field_Name").setSubmitMode('dirty');
formContext.getAttribute("Field_Name").setSubmitMode('always');

// Show/Hide Field
formContext.getControl("Field_Name").setVisible(true/false);

// Remove Option
formContext.getControl("Field_Name").removeOption(this.Field.Option1);

// Show Error Message
formContext.getControl("Field_Name").addNotification({ messages: [msgErro], notificationLevel: 'ERROR' });

// Clear Error Message
formContext.getControl("Field_Name").clearNotification();


/* Sections */

// Show/Hide section
formContext.ui.tabs.get("Tab_Name").sections.get("Section_Name").setVisible(true/false); 


/* Tabs */

// Show/Hide tab
formContext.ui.tabs.get("Tab_Name").setVisible(true/false);

// Focus tab
formContext.ui.tabs.get("Tab_Name").setFocus();


/* Header */

// Show/Hide header 
formContext.ui.headerSection.setBodyVisible(true);

// Show/Hide command bar 
formContext.ui.headerSection.setCommandBarVisible(false); 

// Show/Hide tab navigator 
formContext.ui.headerSection.setTabNavigatorVisible(false); 


/* Grids */

// Refresh grid 
var lookupOptions = {};
lookupOptions.entityType = "table_name";
Xrm.Utility.refreshParentGrid(lookupOptions);


/* Events */

// Add on change event
formContext.getAttribute("Field_Name").addOnChange(FunctionName);

// Personalização do evento click em campos Lookup's
input.addOnLookupTagClick(function(data) {
  
  /* nova regra de negócio aqui... */ 
  
    var args = data._eventArgs; // impede que o registro seja aberto após o click
    args._preventDefault = true; // colocar como 'falso' para manter o comportamento padrão
});

// Call a function from HTML web resource
formContext.getControl("WebResource_<NAME>").getObject().contentWindow.window.FunctionName();


/* App */

// Get current app name
var globalContext = parent.Xrm.Utility.getGlobalContext();
globalContext.getCurrentAppProperties().then(function successCallback(result) {

    if (result.uniqueName == "msdyn_Appname") {

    }
});

// Get Client URL 
Xrm.Utility.getGlobalContext().getClientUrl()

/* Ribbon Button */

// Get context in function
function functionName(primaryControl) {
    var formContext = primaryControl;
    var name = formContext.getAttribute("fly_name").getValue();
}


/* Form Notification */

// Show notification 
formContext.ui.setFormNotification("Message here", "ERROR", "notification_id");
formContext.ui.setFormNotification("Message here", "WARNING", "notification_id");
formContext.ui.setFormNotification("Message here", "INFO", "notification_id");

// Hide notification 
formContext.ui.clearFormNotification("notification_id");


/* Lookup */ 

// Add Custom View
var viewDisplayName = "Custom View Name";
var fetchXml =
    '<fetch>' +
        '<entity name="table_name">' +
        '<attribute name="field_name" />' +
        '<order attribute="field_name" />' +
        '<link-entity name="table_reference_name" from="field_name_table" to="field_name_table_reference" link-type="inner" alias="ref">' +
            '<filter type="and">' +
                '<condition attribute="field_name" operator="eq" value="'+id+'" />' +
            '</filter>' +
        '</link-entity>' +
        '</entity>' +
    '</fetch>';

var viewId = "00000000-0000-0000-0000-000000000001";
var layoutXml = "<grid name='resultset' object='10082' jump='new_name' select='1' icon='1' preview='1'><row name='result' id='table_name'><cell name='field_name' width='150'/><cell name='createdon' width='125' /></row></grid>";
var isDefault = true;

formContext.getControl("field_name").addCustomView(
    viewId,
    "table_name",
    viewDisplayName,
    fetchXml,
    layoutXml,
    isDefault
);

// Add Custom Filter
formContext.getControl("field_name").addPreSearch(function () {    
    var newFilter = "<filter type='and'><condition attribute='frt_produto' operator='eq' uiname='" + name + "' uitype='frt_whitelabel' value='" + id + "' /></filter>";
    formContext.getControl("field_name").addCustomFilter(newFilter);
});