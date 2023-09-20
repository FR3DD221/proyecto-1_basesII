const btnCli = document.getElementById("modCli");
const btnProv = document.getElementById("modProv");
const btnInv = document.getElementById("modInv");
const btnVen = document.getElementById("modVen");
const btnEst = document.getElementById("modEst");
const btnBack = document.getElementById("goBack");

const btnM = document.getElementById("closeModal");

//=========================================================================
const cont1 = document.getElementById("cont1");
const inpCli0 = document.getElementById("filterCli0");
const inpCli1 = document.getElementById("filterCli1");
const inpCli2 = document.getElementById("filterCli2");
const tableC = document.getElementById("tableClient");
const btnConC = document.getElementById("consultC");

//=========================================================================
const cont2 = document.getElementById("cont2");
const inpPro0 = document.getElementById("filterPro0");
const inpPro1 = document.getElementById("filterPro1");
const inpPro2 = document.getElementById("filterPro2");
const tableP = document.getElementById("tableProv");
const btnConP = document.getElementById("consultP");

//=========================================================================
const cont3 = document.getElementById("cont3");
const inpInv0 = document.getElementById("filterInv0");
const inpInv1 = document.getElementById("filterInv1");
const inpInv2 = document.getElementById("filterInv2");
const tableI = document.getElementById("tableInv");
const btnConI = document.getElementById("consultI");


btnM.addEventListener("click", function () {
  const x = document.getElementById("pop-it");
  x.close()
});


//Variables para guardar datos de las consultas
let tempC;
let tempP;
let tempI;

//Sección de funcionalidad del menu pricipal
btnCli.addEventListener("click", function () {
  btnCli.style.display = "none";
  btnProv.style.display = "none";
  btnInv.style.display = "none";
  btnVen.style.display = "none";
  btnEst.style.display = "none";
  btnBack.style.display = "block";
  cont1.style.display = "block";
});

btnProv.addEventListener("click", function () {
  btnCli.style.display = "none";
  btnProv.style.display = "none";
  btnInv.style.display = "none";
  btnVen.style.display = "none";
  btnEst.style.display = "none";
  btnBack.style.display = "block";
  cont2.style.display = "block";
});

btnInv.addEventListener("click", function () {
  btnCli.style.display = "none";
  btnProv.style.display = "none";
  btnInv.style.display = "none";
  btnVen.style.display = "none";
  btnEst.style.display = "none";
  btnBack.style.display = "block";
  cont3.style.display = "block";
});

btnVen.addEventListener("click", function () {
  btnCli.style.display = "none";
  btnProv.style.display = "none";
  btnInv.style.display = "none";
  btnVen.style.display = "none";
  btnEst.style.display = "none";
  btnBack.style.display = "block";
});

btnEst.addEventListener("click", function () {
  btnCli.style.display = "none";
  btnProv.style.display = "none";
  btnInv.style.display = "none";
  btnVen.style.display = "none";
  btnEst.style.display = "none";
  btnBack.style.display = "block";
});

btnBack.addEventListener("click", function () {
  btnCli.style.display = "block";
  btnProv.style.display = "block";
  btnInv.style.display = "block";
  btnVen.style.display = "block";
  btnEst.style.display = "block";
  btnBack.style.display = "none";
  cont1.style.display = "none";
  cont2.style.display = "none";
  cont3.style.display = "none";
  blanquearTabla("tableClient");
  blanquearTabla("tableProv");
  blanquearTabla("tableInv");
});

function blanquearTabla(nameTable) {
  const tabla = document.getElementById(nameTable);
  const tbody = tabla.querySelector("tbody");

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

//Modulo cliente boton
btnConC.addEventListener("click", function () { 
    var textData = {
        filtro1: inpCli0.value,
        filtro2: inpCli1.value,
        filtro3: inpCli2.value,
    };

    const url1 = "http://localhost:8000/cli";

    fetch(url1, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(textData),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud fetch no tuvo éxito');
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      // Consultar los datos de la respuesta de la API

      blanquearTabla("tableClient");
      tempC = data.resultado;
      fillTableC(data.resultado);
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });


});

function fillTableC(clientData) {
  for (x = 0; x < clientData.length; x++) {
    var fila = document.createElement("tr");
    var nombreCliente = document.createElement("td");
    nombreCliente.textContent = clientData[x].NombreCliente;
    var categoria = document.createElement("td");
    categoria.textContent = clientData[x].categoria;
    var metodoEntrega = document.createElement("td");
    metodoEntrega.textContent = clientData[x].DeliveryMethod;

    var boton = document.createElement("td");
    var botonElement = document.createElement("button");
    botonElement.textContent = "Detalles";
    botonElement.classList.add("button-80");
    botonElement.id = x;

    botonElement.addEventListener("click", function (event) {
      showDetailsC(event.currentTarget.id);
    });

    boton.appendChild(botonElement);

    fila.appendChild(nombreCliente);
    fila.appendChild(categoria);
    fila.appendChild(metodoEntrega);
    fila.appendChild(boton);

    tableC.querySelector("tbody").appendChild(fila);
  }
}

function showDetailsC(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.querySelector('#mapCon').innerHTML = "";
  
  var textos = [
    "Nombre del cliente: " + tempC[id].NombreCliente,
    "Categoría: " + tempC[id].categoria,
    "Grupo de compra: " + tempC[id].grupoCompra,
    "Contacto primario: " + tempC[id].contactoPrimario,
    "Contacto secundario: " + tempC[id].contactoAlter,
    "Cliente a facturar: " + tempC[id].clienteFacturar,
    "Metodo de entrega: " + tempC[id].DeliveryMethod,
    "Ciudad de entrega: " + tempC[id].direccion,
    "Codigo postal: " + tempC[id].codigoPostal[0],
    "Número de telefono: " + tempC[id].telefono,
    "Número de fax: " + tempC[id].fax,
    "Días de gracia para pagar: "+ tempC[id].diasP.toString(),
    "",
    "Dirección",
    "",
    "Dirección: " + tempC[id].direccionDelivery,
    "Codigo postal: "+ tempC[id].codigoPostal[1]
  ];

  for (var i = 0; i < textos.length; i++) {
    var nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = textos[i];
    dialog.querySelector('#mapCon').appendChild(nuevoParrafo);
  }
  
  link = document.createElement("a");
  link.textContent = "Más información";
  link.href = tempC[id].pagina;
  dialog.querySelector('#mapCon').appendChild(link);
  var nuevoParrafo = document.createElement("p");
  nuevoParrafo.textContent = "Ubicación en maps"
  dialog.querySelector('#mapCon').appendChild(nuevoParrafo);

  
  latitud = tempC[id].DeliveryLocation.points[0].x;
  longitud = tempC[id].DeliveryLocation.points[0].y;

  var existingMapContainer = document.getElementById('map');
  if (existingMapContainer) {
      existingMapContainer.remove();
  }

  var mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  mapContainer.style.width = '100%';
  mapContainer.style.height = '400px';

  document.getElementById('mapCon').appendChild(mapContainer);

  var map = L.map('map').setView([latitud, longitud], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([latitud, longitud]).addTo(map);
  
  dialog.showModal();
}


//Modulo cliente proveedor
btnConP.addEventListener("click", function () { 
  var textData = {
      filtro1: inpPro0.value,
      filtro2: inpPro1.value,
      filtro3: inpPro2.value,
  };

  const url1 = "http://localhost:8000/prov";

  fetch(url1, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(textData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('La solicitud fetch no tuvo éxito');
    }
    return response.json(); // Convertir la respuesta a JSON
  })
  .then((data) => {
    // Consultar los datos de la respuesta de la API

    blanquearTabla("tableProv");
    tempP = data.resultado;
    fillTableP(data.resultado);
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });
});

function fillTableP(clientProv) {
  for (x = 0; x < clientProv.length; x++) {
    var fila = document.createElement("tr");
    var nombreCliente = document.createElement("td");
    nombreCliente.textContent = clientProv[x].supplierName;
    var categoria = document.createElement("td");
    categoria.textContent = clientProv[x].categoryName;
    var metodoEntrega = document.createElement("td");
    metodoEntrega.textContent = clientProv[x].metodoEntrega;

    var boton = document.createElement("td");
    var botonElement = document.createElement("button");
    botonElement.textContent = "Detalles";
    botonElement.classList.add("button-80");
    botonElement.id = x;

    botonElement.addEventListener("click", function (event) {
      showDetailsP(event.currentTarget.id);
    });

    boton.appendChild(botonElement);

    fila.appendChild(nombreCliente);
    fila.appendChild(categoria);
    fila.appendChild(metodoEntrega);
    fila.appendChild(boton);

    tableP.querySelector("tbody").appendChild(fila);
  }
}

function showDetailsP(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.querySelector('#mapCon').innerHTML = "";

  var textos = [
    "Codigo del proveedor: " + tempP[id].reference,
    "Nombre del proveedor: " + tempP[id].supplierName,
    "Categoria: " + tempP[id].categoryName,
    "Contacto primario: " + tempP[id].contactoPrimario,
    "Contacto secundario: " + tempP[id].contactoSec,
    "Metodo de entrega: " + tempP[id].metodoEntrega,
    "Ciudad de entrega: " + tempP[id].ciudad,
    "Codigo postal de entrega: " + tempP[id].codigoPostal,
    "Número de telefono: " + tempP[id].telefono,
    "Número de fax: " + tempP[id].fax,
    "Nombre del banco: " + tempP[id].bank,
    "Numero de cuenta corriente: " + tempP[id].bankNumber,
    "Días de gracia para pagar: " + tempP[id].dias.toString(),
    "",
    "Dirección",
    "Direccion de entrega: " + tempP[id].direccionDelivery,
    "Codigo postal de entrega: " + tempP[id].deliveryPostal, 
    "",
  ];

  for (var i = 0; i < textos.length; i++) {
    var nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = textos[i];
    dialog.querySelector('#mapCon').appendChild(nuevoParrafo);
  }
  
  link = document.createElement("a");
  link.textContent = "Más información";
  link.href = tempP[id].pagina;
  dialog.querySelector('#mapCon').appendChild(link);
  var nuevoParrafo = document.createElement("p");
  nuevoParrafo.textContent = "Ubicación en maps"
  dialog.querySelector('#mapCon').appendChild(nuevoParrafo);

  
  latitud = tempP[id].deliveryLocation.points[0].x;
  longitud = tempP[id].deliveryLocation.points[0].y;

  var existingMapContainer = document.getElementById('map');
  if (existingMapContainer) {
      existingMapContainer.remove();
  }

  var mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  mapContainer.style.width = '100%';
  mapContainer.style.height = '400px';

  document.getElementById('mapCon').appendChild(mapContainer);

  var map = L.map('map').setView([latitud, longitud], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([latitud, longitud]).addTo(map);
  

  dialog.showModal();
}


//Modulo cliente inventario
btnConI.addEventListener("click", function () { 
  var textData = {
      filtro1: inpInv0.value,
      filtro2: inpInv1.value,
      filtro3: inpInv2.value,
  };

  const url1 = "http://localhost:8000/inv";

  fetch(url1, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(textData),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('La solicitud fetch no tuvo éxito');
    }
    return response.json(); // Convertir la respuesta a JSON
  })
  .then((data) => {
    // Consultar los datos de la respuesta de la API

    blanquearTabla("tableInv");
    tempI = data.resultado;
    fillTableI(data.resultado);
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });
});

function fillTableI(clientInv) {
  
  for (x = 0; x < clientInv.length; x++) {
    var fila = document.createElement("tr");
    var nombreCliente = document.createElement("td");
    nombreCliente.textContent = clientInv[x].StockItemName;
    var categoria = document.createElement("td");
    categoria.textContent = clientInv[x].SuppliernName;
    var metodoEntrega = document.createElement("td");
    metodoEntrega.textContent = clientInv[x].cantidad;

    var boton = document.createElement("td");
    var botonElement = document.createElement("button");
    botonElement.textContent = "Detalles";
    botonElement.classList.add("button-80");
    botonElement.id = x;

    botonElement.addEventListener("click", function (event) {
      showDetailsI(event.currentTarget.id);
    });

    boton.appendChild(botonElement);

    fila.appendChild(nombreCliente);
    fila.appendChild(categoria);
    fila.appendChild(metodoEntrega);
    fila.appendChild(boton);

    tableI.querySelector("tbody").appendChild(fila);
  }
}

function showDetailsI(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.querySelector('#mapCon').innerHTML = "";

  var textos = [
    "Nombre del producto: " + tempI[id].StockItemName,
    "Nombre del proveedor: " + tempI[id].SuppliernName,
    "Color: " + tempI[id].color,
    "Unidad de empaquetamiento: " + tempI[id].UnitPackage,
    "Empaquetamiento: " + tempI[id].outerPackage,
    "Precio venta: " + tempI[id].precio,
    "Peso: " + tempI[id].peso,
    "Palabras claves: " + tempI[id].palabrasClave,
    "Cantidad de empaquetamiento : " + tempI[id].cantidad,
    "Marca: " + tempI[id].Marca,
    "Tallas / tamaño : " + tempI[id].talla,
    "Impuesto: " + tempI[id].Tax,
    "Precio unitario: " + tempI[id].precioUnitario,
    "Cantidad disponible: " + tempI[id].cantidadMano,
  ];

  for (var i = 0; i < textos.length; i++) {
    var nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = textos[i];
    dialog.querySelector('#mapCon').appendChild(nuevoParrafo);
  }

  
  latitud = tempI[id].DeliveryLocation.points[0].x;
  longitud = tempI[id].DeliveryLocation.points[0].y;

  var existingMapContainer = document.getElementById('map');
  if (existingMapContainer) {
      existingMapContainer.remove();
  }

  var mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  mapContainer.style.width = '100%';
  mapContainer.style.height = '400px';

  document.getElementById('mapCon').appendChild(mapContainer);

  var map = L.map('map').setView([latitud, longitud], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([latitud, longitud]).addTo(map);
  
  
  dialog.showModal();
}
