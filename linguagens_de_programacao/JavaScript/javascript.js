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

// Ordenação de objetos
var pessoas = [ 
    { nome: 'Paulo', idade: 35},
    { nome: 'Ana', idade: 34},
    { nome: 'Leticia', idade: 15},
];

pessoas.sort(function(a,b) {
    return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
});

// Adicionar valor no array
array.push(new_value);

let texto = "ABC abc 123";

texto.toLowerCase(); // abc abc 123
texto.toUpperCase(); // ABC ABC 123

var str = "Hello World!";
var enc = btoa(str); // Encoded String: SGVsbG8gV29ybGQh
var dec = atob(enc); // Decoded String: Hello World!

// FUNÇÕES DE ARRAY
var data_mysql = "2017-10-02";
var data = data_mysql.split('-').reverse().join('/');
