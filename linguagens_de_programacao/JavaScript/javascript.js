/* JavaScript */

// cortar string
var str = "texto";
var str_cortada = str.substring(inicio, quantidade);

// Informações do browser
var txt = ""; 
txt += "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
txt += "<p>Browser Name: " + navigator.appName + "</p>";
txt += "<p>Browser Version: " + navigator.appVersion + "</p>";
txt += "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
txt += "<p>Browser Language: " + navigator.language + "</p>";
txt += "<p>Browser Online: " + navigator.onLine + "</p>";
txt += "<p>Platform: " + navigator.platform + "</p>";
txt += "<p>User-agent header: " + navigator.userAgent + "</p>";
alert(txt);

// Verificação se contem
var reg = new RegExp("Texto procurado", "ig");

if (reg.test("Texto completo")) {
  alert("Texto procurado foi encontrado");
}
