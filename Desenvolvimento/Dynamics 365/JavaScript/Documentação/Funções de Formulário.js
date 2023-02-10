// Funções de Formulário do Dynamics 365

// Capturar o contexto de execução
var formContext = executionContext.getFormContext();   

// Capturar o campo
var input = formContext.getControl("input_name"); 

// Eventos 

// Personalização do evento click em campos Lookup's
input.addOnLookupTagClick(function(data) {
  
  /* nova regra de negócio aqui... */ 
  
    var args = data._eventArgs; // impede que o registro seja aberto após o click
    args._preventDefault = true; // colocar como 'falso' para manter o comportamento padrão
});
