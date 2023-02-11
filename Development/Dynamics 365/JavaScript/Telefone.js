///'..\Library\SDKore.js'
///'Validacoes.js'

if (typeof Fortics == "undefined") { Fortics = {}; }
if (typeof Fortics.Dyn365 == "undefined") { Fortics.Dyn365 = {}; }

Fortics.Dyn365.Telefone = {
    globalContext: null,
    FormContext: null,

    OnLoad: function (executionContext) {
        FormContext = SDKore.GetFormContext(executionContext);
        FormContext.getAttribute("frt_bt_internacional").addOnChange(Fortics.Dyn365.Telefone.OnChageInternacional);
        FormContext.getAttribute("frt_st_numero_telefone").addOnChange(Fortics.Dyn365.Telefone.OnChageInternacional);
        FormContext.getAttribute("frt_pl_tipo").addOnChange(Fortics.Dyn365.Telefone.OnChageInternacional);
    },
    OnChangeTipo: function (executionContext) {
        debugger;

        Fortics.Dyn365.Telefone.ValidarFormatarNumTelefone();
    },

    OnChageInternacional: function (executionContext) {
        debugger;

        Fortics.Dyn365.Telefone.ValidarFormatarNumTelefone();
    },

    ValidarFormatarNumTelefone: function () {
        debugger;
        var telInternacional = FormContext.getAttribute("frt_bt_internacional").getValue();
        var numTel = FormContext.getAttribute("frt_st_numero_telefone").getValue();
        var tipo = FormContext.getAttribute("frt_pl_tipo").getValue();

        if (telInternacional) {
            FormContext.getControl("frt_st_numero_telefone").clearNotification();
            return;
        }

        numTel = numTel.replace(/[^\d]+/g, '');

        if (!Fortics.Dyn365.Validacoes.ValidarDddTelefone(numTel)) {
            FormContext.getControl("frt_st_numero_telefone").addNotification({ messages: ['O DDD informado Ã© invÃ¡lido.'], notificationLevel: 'ERROR' });
            return;
        }
        else
            FormContext.getControl("frt_st_numero_telefone").clearNotification();

        if (tipo === TelefoneEnum.Tipo.Celular) {
            if (numTel.length !== 11 || numTel.substring(2, 3) !== "9") {
                FormContext.getControl("frt_st_numero_telefone").addNotification({ messages: ['Favor digitar um numero de celular vÃ¡lido: (XX) 9xxxx-xxxx'], notificationLevel: 'ERROR' });
                return;
            }
            else {
                FormContext.getControl("frt_st_numero_telefone").clearNotification();
                numTel = '(' + numTel.substring(0, 2) + ') ' + numTel.substring(2, 7) + '-' + numTel.substring(7, 11);
            }
        }
        else {
            if (numTel.length === 10) {
                if (numTel.substring(2, 3) === "9") {
                    FormContext.getControl("frt_st_numero_telefone").addNotification({ messages: ['Favor digitar um numero de telefone vÃ¡lido: (XX) 9xxxx-xxxx ou (XX) xxxx-xxxx'], notificationLevel: 'ERROR' });
                    return;
                } else {
                    numTel = '(' + numTel.substring(0, 2) + ') ' + numTel.substring(2, 6) + '-' + numTel.substring(6, 10);
                    FormContext.getControl("frt_st_numero_telefone").clearNotification();
                }
            }
            else {
                FormContext.getControl("frt_st_numero_telefone").addNotification({ messages: ['Favor digitar um numero de telefone vÃ¡lido.'], notificationLevel: 'ERROR' });
                return;
            }
        }

        FormContext.getControl("frt_st_numero_telefone").clearNotification();
        FormContext.getAttribute("frt_st_numero_telefone").setValue(numTel);
    }
}