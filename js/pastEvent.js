const url = "https://mindhub-xj03.onrender.com/api/amazing";
const contenedorTarjetas = document.getElementById('contenedor')
const checkboxes = document.querySelectorAll('input[name="categoria"]');
async function fetchEvents() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const ev = data.events;
        const currentDate = data.currentDate
        const events = ev.filter(e => e.date < currentDate)

        function crearTarjetas(arrayData) {
            let tarjetas = ''
            for (const event of arrayData) {

                tarjetas += `
            <div class="col" id="event-${event._id}">
                <div class="card h-100 shadow p-3 mb-5 bg-body-tertiary rounded">
                    <img src="${event.image}" class="card-img-top" alt="card">
                    <div class="card-body">
                        <h4 class="card-title">${event.name}</h4>
                        <p class="card-text">${event.description}</p>
                        <h5 class ="card-category">Category: ${event.category}<h5>
                        <h5 class="date"> Date: ${event.date} </h5>
                        <h5 class="card-stock">Tickets: Off stock</h5>
                    </div>
                    <div class="card-footer d-inline-flex justify-content-around">
                        <div class="d-flex align-items-center">
                            <h5>Price: ${event.price}$</h5>
                        </div>
                        <a class="btn btn-pink2 text-dark" href="../html/details.html?id=${event._id}">More Info</a>
                    </div>
                </div>
            </div>
        `
            }



            return tarjetas
        }
        contenedorTarjetas.innerHTML = crearTarjetas(events)

        function filtrarPorCategoria(eventos, categorias) {
            if (categorias.length === 0) {
                return eventos;
            } else {
                const eventosFiltrados = eventos.filter((evento) => categorias.includes(evento.category));
                return eventosFiltrados;
            }
        }

        function actualizarTarjetas() {

            const categoriasSeleccionadas = Array.from(checkboxes)
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.id);
            const eventosFiltrados = filtrarPorCategoria(events, categoriasSeleccionadas);
            if (eventosFiltrados.length > 0) {
                contenedorTarjetas.innerHTML = crearTarjetas(eventosFiltrados);
            } else {
                contenedorTarjetas.innerHTML =
                    `
        <div class="home w-100">
        <p class="mt-4 fs-1 fw-bold">Not Found</p>
        <img class="inline-block" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDNiOWEyOTNkMTdhNjNiN2Q2MGRmYjhlOWMxNzM5YTc4NzQ5MGZiOSZjdD1n/a93jwI0wkWTQs/giphy.gif">
        </div>  
        `;
                console.log("entra en el else");
            }
        }

        function buscarEvento() {
            const inputBuscador = document.getElementById('buscador');
            const busqueda = inputBuscador.value.toLowerCase();
            const tarjetas = document.getElementsByClassName('col');
            let resultadosEncontrados = 0;
            for (const tarjeta of tarjetas) {
                const titulo = tarjeta.querySelector('.card-title').textContent.toLowerCase();
                const descripcion = tarjeta.querySelector('.card-text').textContent.toLowerCase();
                const categoria = tarjeta.querySelector('.card-category').textContent.toLowerCase();
                if (titulo.includes(busqueda) || descripcion.includes(busqueda) || categoria.includes(busqueda)) {
                    tarjeta.style.display = 'block';
                    resultadosEncontrados++;
                } else {
                    tarjeta.style.display = 'none';
                }
            }

            if (resultadosEncontrados === 0) {
                const contenedorTarjetas = document.getElementById('contenedor');
                contenedorTarjetas.innerHTML =
                    `
        <div class="home w-100">
        <p class="mt-4 fs-1 fw-bold">Not Found</p>
        <img class="inline-block" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDNiOWEyOTNkMTdhNjNiN2Q2MGRmYjhlOWMxNzM5YTc4NzQ5MGZiOSZjdD1n/a93jwI0wkWTQs/giphy.gif">
        
        </div>
        
        `;
            }
        }

        checkboxes.forEach((checkbox) => {
            checkbox.addEventListener('change', actualizarTarjetas);
        });
        btnBuscar.addEventListener('click', buscarEvento);

        const botonModo = document.getElementById("modo");
        botonModo.addEventListener("click", cambiarModo);

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

    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
};
fetchEvents();