// Personalizar o Customer Service workspace

// Set session title
const session = Microsoft.Apm.getFocusedSession();
session.title = "New Session Title";

// Set tab title
const tab= Microsoft.Apm.getFocusedSession().getFocusedTab();
tab.title = "New Tab Title";

// Desativar o diálogo de encerramento de sessão
Xrm.Utility.getGlobalContext().saveSettingValue("msdyn_SuppressSessionCloseWarning",true);

// Create tab for edit form 
let AppTabInput = {
    templateName: "msdyn_entityrecord",
    appContext: new Map().set("entityName", "account").set("entityId", "3AAC6936-CC17-EB11-A813-000D3AC1413B"),
    isFocused: true,
};
Microsoft.Apm.createTab(AppTabInput);

/**
 * Create a new row
 * App: Centro de administração do Customer Service
 * Entity: Modelo de Guia de Aplicativo (msdyn_applicationtabtemplate)
 * Column: Nome Exclusivo (msdyn_uniquename)
 */
let templateName = "templateName";

// Create tab for open other website
let uri = "https://google.com/";
let AppTabInput = {
  templateName: templateName,
  appContext: new Map().set("url", encodeURI(uri)),
  isFocused: true,
};
Microsoft.Apm.createTab(AppTabInput);

// Close tab
let sessao = Microsoft.Apm.getFocusedSession();
sessao.getAllTabsForTemplate(templateName).then(function sucess(result) {
  if (result.length > 0) {
    let tab = result[0];
    Microsoft.Apm.closeTab(tab);
  }
});

// Create tab for open a URL (using native web resource)
var tabInput = {
  options: {
      canBeClosed: true,
      isFocused: true,
      title: "title"
  },
  pageInput: {
      pageType:"webresource",
      data:"cif_thirdpartyurl" + uri,
      webresourceName:"msdyn_CECExternalWebPageContainer.html"
  }
}
var focusedSession = window.parent.Xrm.App.sessions.getFocusedSession().sessionId;
window.parent.Xrm.App.sessions.getSession(focusedSession).tabs.createTab(tabInput).then(x => console.log("focused tab creation " + x));

// Create tab to open a Custom Page 
var tabInput = {
  options: {
      canBeClosed: true,
      isFocused: true,
      title: "title"
  },
  pageInput: {
      pageType: "custom",
      name: "custompagename",
      recordId: uri
  }
}
var focusedSession = window.parent.Xrm.App.sessions.getFocusedSession().sessionId;
window.parent.Xrm.App.sessions.getSession(focusedSession).tabs.createTab(tabInput).then(x => console.log("focused tab creation " + x));
