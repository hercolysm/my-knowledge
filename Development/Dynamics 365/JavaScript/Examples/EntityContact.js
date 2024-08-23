if (typeof Client == "undefined") { Client = {}; }
if (typeof Client.Dyn365 == "undefined") { Client.Dyn365 = {}; }

Client.Dyn365.Contact = {
    
    ValidarFormatarNumTelefone: function (executionContext, celular) {
        var formContext = SDKore.GetFormContext(executionContext);
        if (formContext == null)
            return;
    
        var label = executionContext.getEventSource().getName();
        var numTel = executionContext.getEventSource().getValue();
    
        if (numTel === null || numTel === "") {
            formContext.getControl(label).clearNotification();
            return;
        }
    
        if (this.ValidarSeTelefoneInternacional(numTel)) {
            formContext.getControl(label).clearNotification();
            return;
        }
    
        numTel = numTel.replace(/[^\d]+/g, '');
    
        debugger;
        if (numTel.startsWith("0800")) {
            if (numTel.length != 11) {
                formContext.getControl(label).addNotification({ messages: ['Favor digitar um nÃºmero de telefone vÃ¡lido: 0800 123-4567'], notificationLevel: 'ERROR' });
                return;
            }
            numTel = numTel.substring(0, 4) + ' ' + numTel.substring(4, 7) + '-' + numTel.substring(7);
        }
        else {
            if (!this.ValidarDddTelefone(numTel)) {
                formContext.getControl(label).addNotification({ messages: ['O DDD informado Ã© invÃ¡lido.'], notificationLevel: 'ERROR' });
                return;
            }
            else
                formContext.getControl(label).clearNotification();
    
            if (celular) {
                if (numTel.length !== 11 || numTel.substring(2, 3) !== "9") {
                    formContext.getControl(label).addNotification({ messages: ['Favor digitar um numero de celular vÃ¡lido: (XX) 9xxxx-xxxx'], notificationLevel: 'ERROR' });
                    return;
                }
                else
                    formContext.getControl(label).clearNotification();
            }
    
            if (numTel.length === 10) {
                if (numTel.substring(2, 3) === "9") {
                    formContext.getControl(label).addNotification({ messages: ['Favor digitar um numero de telefone vÃ¡lido: (XX) 9xxxx-xxxx ou (XX) xxxx-xxxx'], notificationLevel: 'ERROR' });
                    return;
                } else {
                    numTel = '(' + numTel.substring(0, 2) + ') ' + numTel.substring(2, 6) + '-' + numTel.substring(6, 10);
                    formContext.getControl(label).clearNotification();
                }
            }
            else if (numTel.length === 11) {
                if (numTel.substring(2, 3) !== "9") {
                    formContext.getControl(label).addNotification({ messages: ['Favor digitar um numero de celular vÃ¡lido: (XX) 9xxxx-xxxx'], notificationLevel: 'ERROR' });
                    return;
                } else {
                    numTel = '(' + numTel.substring(0, 2) + ') ' + numTel.substring(2, 7) + '-' + numTel.substring(7, 11);
                    formContext.getControl(label).clearNotification();
                }
            }
            else {
                formContext.getControl(label).addNotification({ messages: ['Favor digitar um numero de telefone vÃ¡lido.'], notificationLevel: 'ERROR' });
                return;
            }
        }
        formContext.getControl(label).clearNotification();
        formContext.getAttribute(label).setValue(numTel);
    },
    
    ValidarSeTelefoneInternacional: function (numTel) {
        if (numTel === null || numTel === "")
            return false;
    
        if (numTel.startsWith("+") && !numTel.startsWith("+55"))
            return true;
        else
            return false;
    },
    
    ValidarDddTelefone: function (numTel) {
        var ddd = "11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99";
    
        if (numTel === null || numTel === "" || numTel.length < 2)
            return false;
    
        if (!ddd.includes(numTel.substring(0, 2)))
            return false;
        else
            return true;
    }
}
