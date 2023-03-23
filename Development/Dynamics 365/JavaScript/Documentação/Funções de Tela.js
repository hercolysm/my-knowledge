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
Xrm.Navigation.openErrorDialog({ message: "Ocorreu um erro :(", details: "Detalhes do erro para o arquivo de log." });

// Show loading 
Xrm.Utility.showProgressIndicator("Loading...");

// Hide loading
Xrm.Utility.closeProgressIndicator();

// Create a side pane
let panelId = "sidePanel-id";
var getPane = Xrm.App.sidePanes.getPane(panelId)
if (getPane !== undefined) {
    getPane.close();
}
setTimeout(function() {
    Xrm.App.sidePanes.createPane({
        paneId: panelId,
        title: "Pane Title",
        hideHeader: false,
        canClose: true,
        isSelected: true,
        width: 400,
        alwaysRender: false, 
        keepBadgeOnSelect: true,
        hidden: false,
    }).then((pane) => {
        pane.navigate({
            pageType: "custom",
            name: "page_name",
            recordId: "id",
        })
    });
}, 500);

// Show pane 
Xrm.App.sidePanes.state = 1;

// Hide pane
Xrm.App.sidePanes.state = 0;

// Get all panes
var allPanes = Xrm.App.sidePanes.getAllPanes();

// Get pane by id 
var getPane = Xrm.App.sidePanes.getPane(panelId);

// Get current pane 
var getPane = Xrm.App.sidePanes.getSelectedPane();

// Change width's pane
getPane.width = 600;

// Close pane
getPane.close();

// Show/Hide cont
getPane.badge = null; 
getPane.badge = 2; 

// Open a side dialog
var pageInput = {
    pageType: "custom",
    name: "page_name",
    recordId: "id",
};
var navigationOptions = {
    target: 2, 
    position: 2,
    width: {value: 400, unit: "px"},
    title: "Dialog Title"
};
Xrm.Navigation.navigateTo(pageInput, navigationOptions)
    .then(
        function () {
            // Called when the dialog closes
        }
    ).catch(
        function (error) {
            // Handle error
        }
    );
