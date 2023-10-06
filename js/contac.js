const botonModo = document.getElementById("modo");
botonModo.addEventListener("click", cambiarModo);

// Obtener el estado del modo del almacenamiento local
if (localStorage.getItem('modo') === 'noche') {
    document.querySelector('body').classList.add('noche');
}

function cambiarModo() {
    const body = document.querySelector("body");

    body.classList.toggle("dia");
    body.classList.toggle("noche");
    if (localStorage.getItem('modo') === 'dia') {
        localStorage.setItem('modo', 'noche');
    } else {
        localStorage.setItem('modo', 'dia');

    }

}
