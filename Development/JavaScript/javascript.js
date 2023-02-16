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
txt += "<p>User-agent Client Hints: " + navigator.userAgentData + "</p>";
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

// Selecionar elememento pelo id
var element = document.getElementById("myDIV");

// Selecionar elemento pela classe 
var elements = document.querySelector(".value_titulo");

// Selecionar elementos que contém a classe t1 E t2
var elements = document.querySelectorAll(".t1.t2");

// Selecionar elementos que contém a classe t1 OU t2
var elements = document.querySelectorAll(".t1, .t2");

// Selecionar elementos que contém a classe t1 e não contém a classe t2 
let elements = document.querySelectorAll(".t1:not(.t2)");

// Selecionar elementos
var input = document.querySelectorAll('[data-id="frt_st_senha_agente_szchat"]');
input[0].setAttribute("type", "password");

// Adicionar classe 
element.classList.add("mystyle");

// Remover classe 
element.classList.remove('hide');

// Capturar parametros da URL 
var query = location.search.slice(1);
var partes = query.split('&');
var data = {};
partes.forEach(function (parte) {
    var chaveValor = parte.split('=');
    var chave = chaveValor[0];
    var valor = chaveValor[1];
    data[chave] = decodeURIComponent(valor);
});

// converter para URL
let uri = "https://test.asp?name=ståle&car=saab";
let encoded = encodeURI(uri); // https://test.asp?name=st%C3%A5le&car=saab
let decoded = decodeURI(encoded); // https://test.asp?name=ståle&car=saab

let encoded = encodeURIComponent(uri); // https%3A%2F%2Ftest.asp%3Fname%3Dst%C3%A5le%26car%3Dsaab
let decoded = decodeURIComponent(encoded); // https://test.asp?name=ståle&car=saab

// Alterar o valor do input
document.getElementById("myInput").value = "novo valor";

// Alterar o texto de um elemento
document.getElementById("myElement").innerText = "novo texto";

// Substituir o elemento por um texto
document.getElementById("myElement").outerText = "novo texto";

// Alterar o HTML de um elemento
document.getElementById("myElement").innerHTML = "novo texto";

// Substituir o elemento por um HTML
document.getElementById("myElement").outerHTML = "novo texto";

// Clonar elemento de uma lista 
var row_clone  = document.getElementById("row-clone").cloneNode(true);
row_clone.removeAttribute("id");
row_clone.classList.remove("hide");
row_clone.querySelector(".class_name").innerText = "novo texto";
document.getElementById("div-list").appendChild(row_clone);

// Cria um link e insere em um elemento 
var a = document.createElement("a");
a.href = "https://www.google.com/"; 
a.innerText = 'Link do google';
a.target = "_blank";
document.getElementById("element").appendChild(a);

// Remover elemento 
document.getElementById("id-name").remove();

// Converter objeto para JSON 
let object = {key: 'value'};
let json = JSON.stringify(object);

// Converter JSON para objeto 
let json = "{\"key\":\"value\"}";
let object = JSON.parse(json);

// Alterar style
const note = document.querySelector('.note');
note.style.backgroundColor = 'yellow';
note.style.color = 'red';

// Resto da divisão
11 % 2 // 1
