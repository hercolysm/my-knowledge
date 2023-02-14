// Personalizar o Customer Service workspace

// Set session title
const session = Microsoft.Apm.getFocusedSession();
session.title = "New Session Title";

// Set tab title
const tab= Microsoft.Apm.getFocusedSession().getFocusedTab();
tab.title = "New Tab Title";

// Desativar o diálogo de encerramento de sessão
Xrm.Utility.getGlobalContext().saveSettingValue("msdyn_SuppressSessionCloseWarning",true);
