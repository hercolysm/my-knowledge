// Abrir formulário para criação de um novo registro 
let entityFormOptions = {
    entityName: "table_name",
    entityId: null
};
Xrm.Navigation.openForm(entityFormOptions);

// Abrir um formulário para edição de um registro
let entityFormOptions = {
    entityName: "table_name",
    entityId: Id
};
Xrm.Navigation.openForm(entityFormOptions);

// Show alert
Xrm.Navigation.openAlertDialog({ confirmButtonLabel: "Ok", text: "Texto do alerta", title: "Titulo" });

// Show erro 
Xrm.Navigation.openErrorDialog({ message: "Ocorreu um erro :(" });

// Show loading 
Xrm.Utility.showProgressIndicator("Loading...");

// Hide loading
Xrm.Utility.closeProgressIndicator();
