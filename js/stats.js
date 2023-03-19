 
 // creamos un arreglo de objetos vacio.
 let sortedEventsPast = []
 //vinculamos con el documento html la seccion1 de la tabla a ocupar.
 let tabla1 = document.getElementById('seccion1Table')
 // funcion async, aca traemos ala api mindhub y llamamos alas demas funciones que esperen (await)
async function getBestEvents() {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing')
    const data = await response.json()
    const ev = await data.events
    const currentDate = await data.currentDate
    //filtrar los eventos por eventos pasado del array
    const pastEvents = await ev.filter(e => e.date < currentDate)
    //filtrar los eventos por eventos futuros del array
    const upEvents = await ev.filter(e => e.date >= currentDate)
    //-------------------table 1
    // Ordenar los eventos por su capacidad de mayor a menor y traer los primeros 3
    sortedEventsPast = await (pastEvents.sort((a, b) => b.capacity - a.capacity)).slice(0, 3)
    // Ordenar los eventos por porcentaje de menor a mayor y trae los primeros 3
    let pastEventGrowing = await nameX(pastEvents).sort((a, b) => a.percentage - b.percentage).slice(0, 3)
    // Ordenar los eventos por porcentaje de ayor a menor y trae los primeros 3 (se aplico reverse ala linea anterior)
    let pastEventDecreasing = await nameX(pastEvents).sort((a, b) => a.percentage - b.percentage).reverse().slice(0, 3)
    //se pasan los tres arrays para la funcion de crear tabla1 que es la seccion 1 de la tabla.
    tabla1.innerHTML = await seccion1Tabla(pastEventDecreasing, pastEventGrowing, sortedEventsPast)
    //----Fin seccion1 de la tabla---
    
    // tabla2.innerHTML = await seccion1Tabla(up)

    let upCategoriesTable1 = await upEventsTable(upEvents).sort((a, b) => a.percentage - b.percentage).reverse().slice(0, 3)

  }
  //llamamos ala funcion
  getBestEvents()

  // aca creamos una funcion para pushear elementos en un nuevo array y tener percentage
  function nameX(array){
    let nameZ = []
    for (elemento of array) {
      nameZ.push({
        id:elemento._id,
        name:elemento.name,
        capacity:elemento.capacity,
        assistance:elemento.assistance,
        category:elemento.category,
        percentage:((elemento.assistance / elemento.capacity)* 100)
      })
    }
    return nameZ
  }
  // en esta funcion creamos el tbody de la tabla de la seccion 1
  function seccion1Tabla(array1, array2, array3) { 
    let tabla1 = '';
    for (let i = 0; i < 3; i++) {
        tabla1 += `
    <tr>
    <td> ${array1[i].name} ${array1[i].percentage} % </td>
    <td>${array2[i].name} ${array2[i].percentage} %  - </td>
    <td>${array3[i].name}- ${array3[i].capacity} personas </td>
    </tr>
`;
    }
    return tabla1;
}

// aca creamos una funcion para pushear elementos en un nuevo array y tener revenues
function upEventsTable(array){
  let tabla2 = []
  for (elemento of array) {
    tabla2.push({
      id:elemento._id,
      name:elemento.name,
      capacity:elemento.capacity,
      estimate:elemento.estimate,
      category:elemento.category,
      revenues:(elemento.price * elemento.assistance),
      percentage:((elemento.estimate / elemento.capacity)* 100)
    })
  }
  return tabla2
}

// en esta funcion creamos el tbody de la tabla de la seccion 2
function seccion1Tabla2(array1, array1, array1) { 
  let tabla2 = '';
  for (let i = 0; i < 3; i++) {
      tabla2 += `
  <tr>
  <td> ${array1[i].category}</td>
  <td>${array2[i].revenues}</td>
  <td>${array3[i].percentage} % </td>
  </tr>
`;
  }
  return tabla2;
}