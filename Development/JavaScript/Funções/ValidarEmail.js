function validarEmail(email) {

    if (!email) {
        return false;
    }

    if (email.split("@").length != 2) {
        return false;
    }

    let dominio = email.split("@")[1];

    if (dominio.split(".").length != 2 && dominio.split(".").length != 3) {
        return false;
    }

    return true;
}

// Exemplo de uso
var email = "exemplo@email.com";
console.log(validarEmail(email));    // true

var email = "exemplo@email.com.br";
console.log(validarEmail(email));    // true

var email = "exemplo@email";
console.log(validarEmail(email));    // false

var email = "a@b.c.d";
console.log(validarEmail(email));    // true

var email = "exemplo@email.com.br.br";
console.log(validarEmail(email));    // false 

var email = "exemplo@@email.com";
console.log(validarEmail(email));    // false

var email = "exemplo@exemplo@email.com";
console.log(validarEmail(email));    // false

var email = "exemploemail";
console.log(validarEmail(email));    // false

var email = "exemploemail.com";
console.log(validarEmail(email));    // false

var email = "exemploemail.com.br";
console.log(validarEmail(email));    // false

var email = "0@1.2";
console.log(validarEmail(email));    // true

var email = "0@1.2.3";
console.log(validarEmail(email));    // true
