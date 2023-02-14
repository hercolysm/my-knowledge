
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