if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

var FormContext = null;

Fortics.Dyn365.MensagemSZchat = {
    FormContext: null,

    OnLoad: function (executionContext) {
        FormContext = executionContext.getFormContext();    
        
        var tipo = FormContext.getAttribute("frt_tipo").getValue();

        switch(tipo) {
            case 'files':
            case 'images':
            case 'sounds':
            case 'videos':
                FormContext.getControl("frt_message").setVisible(false);
                FormContext.getControl("frt_mime_type").setVisible(true);
                FormContext.getControl("WebResource_popup_midias_szchat").setVisible(true);
        }
    }
}