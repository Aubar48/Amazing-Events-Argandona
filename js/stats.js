let eventStatics = document.getElementById("eventStatics");
let upcomingStatics = document.getElementById("upcomingStatics");
let pastsStatics = document.getElementById("pastsStatics");

const urlApi = "https://mindhub-xj03.onrender.com/api/amazing";

let allEvents;

let currentDate;

async function traerDatos() {

    try {
        const datos = await fetch(urlApi)
            .then(response => response.json())
            .then(data => data);

        allEvents = datos.events;
        currentDate = datos.currentDate;
        statsInitializer();

    } catch (error) {
        console.log(error);
    }
}
traerDatos();
function statsInitializer() {


    let sortEventByPercentageOfAttendance = allEvents.filter(e => e.assistance != undefined).sort((a, b) => (b.assistance / b.capacity) - (a.assistance / a.capacity));
    let sortEventByPercentageOfEstimate = allEvents.filter(e => e.estimate != undefined).sort((a, b) => (a.estimate / a.capacity) - (b.estimate / b.capacity));
    let sortEventByCapacity = allEvents.filter(e => e.assistance != undefined).sort((a, b) => b.capacity - a.capacity);

    let pastArray = [];
    sortEventByPercentageOfAttendance.map(ev => {
        if (!pastArray.some((item) => ev.category == item.category)) {
            pastArray.push({
                category: ev.category,
                revenues: ev.price * ev.assistance,
                capacity: ev.capacity,
                assistance: ev.assistance
            });
        } else if (pastArray.some((item) => ev.category == item.category)) {
            pastArray.map(e => {
                if (e.category == ev.category) {
                    e.capacity += ev.capacity;
                    e.revenues += ev.price * ev.assistance;
                    e.assistance += ev.assistance;
                }
            })
        }
    });

    let upcomingArray = [];
    sortEventByPercentageOfEstimate.map(ev => {
        if (!upcomingArray.some((item) => ev.category == item.category)) {
            upcomingArray.push({
                category: ev.category,
                revenues: ev.price * ev.estimate,
                capacity: ev.capacity,
                estimate: ev.estimate
            });
        } else if (upcomingArray.some((item) => ev.category == item.category)) {
            upcomingArray.map(e => {
                if (e.category == ev.category) {
                    e.capacity += ev.capacity;
                    e.revenues += ev.price * ev.estimate;
                    e.estimate += ev.estimate;
                }
            })
        }
    });

    eventStatics.innerHTML = eventStaticsShow(sortEventByPercentageOfAttendance, sortEventByCapacity);
    pastsStatics.innerHTML = pastStaticsShow(pastArray);
    upcomingStatics.innerHTML = updateStaticsShow(upcomingArray);

    function eventStaticsShow(eventsAttendance, eventsCapacity) {
        let rows = '';

        rows = `<tr>
                    <td class="bg-secondary">Events with the highest percentage of attendance</td>
                    <td class="bg-secondary">Events with the lowest percentage of attendance</td>
                    <td class="bg-secondary">Event with larger capacity</td>
                </tr>
                `;
        for (let i = 0; i < 3; i++) {
            rows += `<tr>
                    <td>${eventsAttendance[i].name} : ${((eventsAttendance[i].assistance / eventsAttendance[i].capacity) * 100).toFixed(2)} %</td >
                    <td>${eventsAttendance[eventsAttendance.length - i - 1].name} : ${((eventsAttendance[eventsAttendance.length - i - 1].assistance / eventsAttendance[eventsAttendance.length - i - 1].capacity) * 100).toFixed(2)} %</td >
                    <td>${eventsCapacity[i].name} : ${eventsCapacity[i].capacity}</td >
                </tr>`;
        }

        return rows;
    }

    function updateStaticsShow(array) {
        let rows = `<tr>
                        <td class="bg-secondary">Categories</td>
                        <td class="bg-secondary">Revenues</td>
                        <td class="bg-secondary">Percentage of estimate</td>
                    </tr>`;

        for (const item of array) {
            rows += `<tr>
                        <td>${item.category}</td>
                        <td>$${item.revenues}</td>
                        <td>${((item.estimate) / (item.capacity) * 100).toFixed(2)} %</td>
                    </tr>`
        }
        return rows;
    }

    function pastStaticsShow(array) {
        let rows = `<tr>
                        <td class="bg-secondary">Categories</td>
                        <td class="bg-secondary">Revenues</td>
                        <td class="bg-secondary">Percentage of attendance</td>
                    </tr>`;

        for (const item of array) {
            rows += `<tr>
                        <td>${item.category}</td>
                        <td>$${item.revenues}</td>
                        <td>${((item.assistance) / (item.capacity) * 100).toFixed(2)} %</td>
                    </tr>`
        }
        return rows;
    }
}



const botonModo = document.getElementById("modo");
botonModo.addEventListener("click", cambiarModo);

// Obtener el estado del modo del almacenamiento local
if (localStorage.getItem('modo') === 'noche') {
    document.querySelector('body').classList.add('noche');
}

function cambiarModo() {
    const body = document.querySelector("body");
    if (body.classList.contains("dia")) {
        body.classList.remove("dia");
        body.classList.add("noche");
        // Guardar el estado del modo en el almacenamiento local
        localStorage.setItem('modo', 'noche');
    } else {
        body.classList.remove("noche");
        body.classList.add("dia");
        // Guardar el estado del modo en el almacenamiento local
        localStorage.setItem('modo', 'dia');
    }
}