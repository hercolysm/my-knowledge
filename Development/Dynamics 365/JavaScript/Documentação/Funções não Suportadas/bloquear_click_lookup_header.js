if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

var formContext = null;

Client.Dyn365.SystemUser = {
    formContext: null,

    OnLoad: function (executionContext) {
        'use strict';
        debugger;

        var formContext = executionContext.getFormContext(); 
        
        Client.Dyn365.SystemUser.bloquearClickLookupHeader(window.parent.document, "systemuser");
        
        formContext.getAttribute("ownerid").addOnChange(this.OnChangebloquearClickLookupHeader);
    },
    OnChangebloquearClickLookupHeader: function () {
        Client.Dyn365.SystemUser.bloquearClickLookupHeader(window.parent.document, "systemuser");
    },
    bloquearClickLookupHeader: function (_document_, table_name) {
        
        // Aguarda 0,5 segundo para a renderização dos elementos
        setTimeout(function() {
            let headerBodyContainer = _document_.getElementById("headerBodyContainer");
            
            if (headerBodyContainer) {

                let nodeList = headerBodyContainer.querySelectorAll("*");
                
                nodeList.forEach(function(elementObj) {
                    if (elementObj.tagName == "A") {
                        let href = elementObj.getAttribute("href");
                        
                        // Verifica se o elemento <a> possui um link de entidade
                        let arr = href.split("&pagetype=entityrecord&etn="+table_name+"&id=");

                        if (arr.length == 2) {
                            // oculta o elemento nativo 
                            elementObj.style.display = "none";
                            
                            // gera um elemento clone sem link 
                            let a = _document_.createElement("a");
                            a.href = "javascript:void(0)"; 
                            a.setAttribute("aria-label", elementObj.innerHTML);
                            a.innerText = elementObj.innerHTML;
                            a.classList = elementObj.classList;
                            elementObj.parentNode.insertBefore(a, null);
                        }
                        
                        // Verifica se é um elemento clone e remove 
                        let arr2 = href.split("javascript:void(0)");
                        
                        if (arr2.length == 2) {
                            elementObj.remove(); 
                        }
                    }
                });
            }
        }, 500);
    }
}
