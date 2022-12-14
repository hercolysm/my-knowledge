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

// Alterar o valor do input
document.getElementById("myInput").value = "novo valor";

// Alterar o texto de um elemento
document.getElementById("myElement").innerText = "novo texto";

// converter para URL
// decodeURI
// decodeURIComponent
// encodeURI
// encodeURIComponent

// Clonar elemento de uma lista 
var row_clone  = document.getElementById("row-clone").cloneNode(true);
row_clone.removeAttribute("id");
row_clone.classList.remove("hide");
row_clone.querySelector(".class_name").innerText = "novo texto";
document.getElementById("div-list").appendChild(row_clone);

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

// Função para converter datas
function formatDate(date) {
    return (
        date.getDate().toString().padStart(2, '0') +
        '/' +
        (date.getMonth()+1).toString().padStart(2, '0') +
        '/' +
        date.getFullYear() +
        ' ' +
        date.getHours().toString().padStart(2, '0') +
        ':' +
        date.getMinutes().toString().padStart(2, '0') +
        ':' +
        date.getSeconds().toString().padStart(2, '0')
    )
}

// Função para converter segundos em tempo hh:mm:ss
function formatTime(time) {
    let hh = Math.floor(time / 3600);
    let mm = Math.floor((time % 3600) / 60);
    let ss = Math.floor((time % 3600) % 60);
    hh = hh.toString().padStart(2, '0');
    mm = mm.toString().padStart(2, '0');
    ss = ss.toString().padStart(2, '0');
    return hh+':'+mm+':'+ss;
}

// Resto da divisão
11 % 2 // 1
