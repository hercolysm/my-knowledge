
function onClick(event) {
    // Evita que o click seja disparado nos elementos containers
    event.stopPropagation();
}

function is_shift_key_pressed(event) {
    // Verifica se a tecla Shift está pressionada
    if (event.getModifierState("Shift") == true) {
        // faz algo
    }
}

# add message
var f = function (message) {
    console.log(message);
}
window.parent.addEventListener("message", f);

# remove message
window.parent.removeEventListener("message", f, false);

# send message
window.parent.postMessage(
     {
          name: 'Texto',
     },
     'https://url_origin.com'
)
