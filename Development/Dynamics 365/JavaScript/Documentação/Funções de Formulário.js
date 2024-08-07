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

// Get Lookup's Values
var Lookup = FormContext.getAttribute("Lookup_Name").getValue();
var id = Lookup[0]['id'];
var name = Lookup[0]['name'];
var entityType = Lookup[0]['entityType'];

// Set Field's Value 
FormContext.getAttribute("Field_Name").setValue(null);

// Fire Onchange Event
FormContext.getAttribute("Field_Name").fireOnChange();

// Add Required
FormContext.getAttribute("Field_Name").setRequiredLevel("required");

// Remove Required
FormContext.getAttribute("Field_Name").setRequiredLevel("none");

// Change Submit Mode 
Xrm.Page.getAttribute("Field_Name").getSubmitMode();
Xrm.Page.getAttribute("Field_Name").setSubmitMode('never');
Xrm.Page.getAttribute("Field_Name").setSubmitMode('dirty');
Xrm.Page.getAttribute("Field_Name").setSubmitMode('always');

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


/* Events */

// Add on change event
FormContext.getAttribute("Field_Name").addOnChange(FunctionName);

// Personalização do evento click em campos Lookup's
input.addOnLookupTagClick(function(data) {
  
  /* nova regra de negócio aqui... */ 
  
    var args = data._eventArgs; // impede que o registro seja aberto após o click
    args._preventDefault = true; // colocar como 'falso' para manter o comportamento padrão
});

// Call a function from HTML web resource
Xrm.Page.getControl("WebResource_<NAME>").getObject().contentWindow.window.FunctionName();


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

