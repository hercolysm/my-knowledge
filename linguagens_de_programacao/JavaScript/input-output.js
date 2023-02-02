// Funções de Input e Output do Javascript

// Exibe um alerta na tela
alert("Exibe um alerta na tela");

// Exibe uma mensagem no console
console.log("Exibe uma mensagem no console");

// Exibe um objeto no formato de tabela no console
console.table({'Nome': 'Fulano', 'Idade': 45});

// Recebe um valor digitado 
var number = parseInt(prompt("Digite um número:"));

// Ativa alerta ao tentar sair da página
window.onbeforeunload = function() {
    return "Bye now?";
};

// Desativa alerta ao tentar sair da página
window.onbeforeunload = null;
