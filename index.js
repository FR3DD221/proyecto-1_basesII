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

//=========================================================================
const cont4 = document.getElementById("cont4");
const inpVen0 = document.getElementById("filterVen0");
const inpVen1 = document.getElementById("filterVen1");
const inpVen2 = document.getElementById("filterVen2");
const inpVen3 = document.getElementById("filterVen3");
const inpVen4 = document.getElementById("filterVen4");
const inpVen5 = document.getElementById("filterVen5");
const inpVen6 = document.getElementById("filterVen6");
const tableV = document.getElementById("tableVen");
const btnConV = document.getElementById("consultV");

//============================================================================================
//============================================================================================
//============================================================================================
//estadisticas
const cont5 = document.getElementById("cont5");
const bntStat1 = document.getElementById("estadistica1");
const bntStat2 = document.getElementById("estadistica2");
const bntStat3 = document.getElementById("estadistica3");
const bntStat4 = document.getElementById("estadistica4");
const bntStat5 = document.getElementById("estadistica5");


//Errores
const error1 = document.getElementById("error1");
const error2 = document.getElementById("error2");
const error3 = document.getElementById("error3");
const error4 = document.getElementById("error4");



btnM.addEventListener("click", function () {
  const x = document.getElementById("pop-it");
  x.close();
});

//Variables para guardar datos de las consultas
let tempC;
let tempP;
let tempI;
let tempV;

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
  cont4.style.display = "block";
});

btnEst.addEventListener("click", function () {
  btnCli.style.display = "none";
  btnProv.style.display = "none";
  btnInv.style.display = "none";
  btnVen.style.display = "none";
  btnEst.style.display = "none";
  btnBack.style.display = "block";
  cont5.style.display = "block";
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
  cont4.style.display = "none";
  cont5.style.display = "none";
  inpCli0.value = "";
  inpCli1.value = "";
  inpCli2.value = "";
  inpVen0.value = "";
  inpVen1.value = "";
  inpVen2.value = "";
  inpVen3.value = "";
  inpVen4.value = "";
  inpVen5.value = "";
  inpVen6.value = "";
  inpPro0.value = "";
  inpPro1.value = "";
  inpPro2.value = "";
  inpInv0.value = "";
  inpInv1.value = "";
  inpInv2.value = "";
  blanquearTabla("tableClient");
  blanquearTabla("tableProv");
  blanquearTabla("tableInv");
  blanquearTabla("tableVen");
});

bntStat1.addEventListener("click", function () {
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";
  const tableTemp = document.getElementById("tableStat1").cloneNode(true);
  tableTemp.id = "tableTemp";

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.value = "";
  input1.placeholder = "Ingrese nombre del proveedor";
  input1.classList.add("input");

  const input2 = document.createElement("input");
  input2.type = "text";
  input2.value = "";
  input2.placeholder = "Ingrese categoria";
  input2.classList.add("input");

  const btnCon = document.createElement("button");
  btnCon.textContent = "Consultar";
  btnCon.classList.add("glow-on-hover");

  btnCon.addEventListener("click", function () {
    fillStat1(input1.value, input2.value, tableTemp);
    input1.value = "";
    input2.value = "";
  });

  dialog.querySelector("#mapCon").appendChild(input1);
  dialog.querySelector("#mapCon").appendChild(input2);
  dialog.querySelector("#mapCon").appendChild(btnCon);
  dialog.querySelector("#mapCon").appendChild(tableTemp);
  dialog.showModal();
});

function fillStat1(filt1, filt2, tableTemp) {
  var textData = {
    filtro1: filt1,
    filtro2: filt2,
  };

  const url1 = "http://localhost:8000/stat1";

  fetch(url1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud fetch no tuvo éxito");
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      // Consultar los datos de la respuesta de la API
      blanquearTabla(tableTemp.id);
      fillStat1Aux(data.resultado, tableTemp);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

function fillStat1Aux(clientData, tableTemp) {
  if (clientData.length != 0) {

    for (x = 0; x < clientData.length; x++) {
      var fila = document.createElement("tr");
      var nombreCliente = document.createElement("td");
      nombreCliente.textContent = clientData[x].provedor;
      var categoria = document.createElement("td");
      categoria.textContent = clientData[x].categoria;
      var metodoEntrega = document.createElement("td");
      metodoEntrega.textContent = clientData[x].montoAlto;
      var columna = document.createElement("td");
      columna.textContent = clientData[x].montoBajo;
      var columna2 = document.createElement("td");
      columna2.textContent = clientData[x].promedioVentas;

      fila.appendChild(nombreCliente);
      fila.appendChild(categoria);
      fila.appendChild(metodoEntrega);
      fila.appendChild(columna);
      fila.appendChild(columna2);

      tableTemp.querySelector("tbody").appendChild(fila);
    }
  } else {
    error3.showModal();
  }
}

bntStat3.addEventListener("click", function () {
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";
  const tableTemp = document.getElementById("tableStat3").cloneNode(true);
  tableTemp.id = "tableTemp";

  const input1 = document.createElement("input");
  input1.type = "text";
  input1.value = "";
  input1.placeholder = "Ingrese nombre del cliente";
  input1.classList.add("input");

  const input2 = document.createElement("input");
  input2.type = "text";
  input2.value = "";
  input2.placeholder = "Ingrese categoria";
  input2.classList.add("input");

  const btnCon = document.createElement("button");
  btnCon.textContent = "Consultar";
  btnCon.classList.add("glow-on-hover");

  btnCon.addEventListener("click", function () {
    fillStat3(input1.value, input2.value, tableTemp);
    input1.value = "";
    input2.value = "";
  });

  dialog.querySelector("#mapCon").appendChild(input1);
  dialog.querySelector("#mapCon").appendChild(input2);
  dialog.querySelector("#mapCon").appendChild(btnCon);
  dialog.querySelector("#mapCon").appendChild(tableTemp);
  dialog.showModal();
});

function fillStat3(filt1, filt2, tableTemp) {
  var textData = {
    filtro1: filt1,
    filtro2: filt2,
  };

  const url1 = "http://localhost:8000/stat2";

  fetch(url1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud fetch no tuvo éxito");
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      // Consultar los datos de la respuesta de la API
      blanquearTabla(tableTemp.id);
      fillStat3Aux(data.resultado, tableTemp);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

function fillStat3Aux(clientData, tableTemp) {
  if (clientData.length != 0) {

    for (x = 0; x < clientData.length; x++) {
      var fila = document.createElement("tr");
      var nombreCliente = document.createElement("td");
      nombreCliente.textContent = clientData[x].Nombrecliente;
      var categoria = document.createElement("td");
      categoria.textContent = clientData[x].categoria;
      var metodoEntrega = document.createElement("td");
      metodoEntrega.textContent = clientData[x].montoAlto;
      var columna = document.createElement("td");
      columna.textContent = clientData[x].montoBajo;
      var columna2 = document.createElement("td");
      columna2.textContent = clientData[x].promedioCompras;

      fila.appendChild(nombreCliente);
      fila.appendChild(categoria);
      fila.appendChild(metodoEntrega);
      fila.appendChild(columna);
      fila.appendChild(columna2);

      tableTemp.querySelector("tbody").appendChild(fila);
    }
  } else {
    error3.showModal();
  }
}

bntStat2.addEventListener("click", function () {
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";
  const tableTemp = document.getElementById("tableStat2").cloneNode(true);
  tableTemp.id = "tableTemp";

  const input1 = document.createElement("input");
  input1.type = "date";
  input1.value = "";
  input1.classList.add("input3");


  const btnCon = document.createElement("button");
  btnCon.textContent = "Consultar";
  btnCon.classList.add("glow-on-hover");

  btnCon.addEventListener("click", function () {
    fillStat2(input1.value.substring(0, 4), tableTemp);
    input1.value = "";
  });

  dialog.querySelector("#mapCon").appendChild(input1);
  dialog.querySelector("#mapCon").appendChild(btnCon);
  dialog.querySelector("#mapCon").appendChild(tableTemp);
  dialog.showModal();
});

function fillStat2(filt1, tableTemp) {
  if (filt1 != "") {
    var textData = {
      filtro1: filt1,
    };
  
    const url1 = "http://localhost:8000/stat3";
  
    fetch(url1, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(textData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud fetch no tuvo éxito");
        }
        return response.json(); // Convertir la respuesta a JSON
      })
      .then((data) => {
        // Consultar los datos de la respuesta de la API
        blanquearTabla(tableTemp.id);
        fillStat2Aux(data.resultado, tableTemp);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  } else {
    error4.showModal();
  }
}

function fillStat2Aux(clientData, tableTemp) {
  if (clientData.length != 0) {

    for (x = 0; x < clientData.length; x++) {
      var fila = document.createElement("tr");
      var nombreCliente = document.createElement("td");
      nombreCliente.textContent = clientData[x].año;
      var categoria = document.createElement("td");
      categoria.textContent = clientData[x].producto;
      var metodoEntrega = document.createElement("td");
      metodoEntrega.textContent = clientData[x].TotalVendido;

      fila.appendChild(nombreCliente);
      fila.appendChild(categoria);
      fila.appendChild(metodoEntrega);

      tableTemp.querySelector("tbody").appendChild(fila);
    }
  } else {
    error3.showModal();
  }
}



bntStat4.addEventListener("click", function () {
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";
  const tableTemp = document.getElementById("tableStat4").cloneNode(true);
  tableTemp.id = "tableTemp";

  const input1 = document.createElement("input");
  input1.type = "date";
  input1.value = "";
  input1.classList.add("input3");

  const input2 = document.createElement("input");
  input2.type = "date";
  input2.classList.add("input3");

  const btnCon = document.createElement("button");
  btnCon.textContent = "Consultar";
  btnCon.classList.add("glow-on-hover");

  btnCon.addEventListener("click", function () {
    fillStat4(input1.value.substring(0,4), input2.value.substring(0,4), tableTemp);
    input1.value = "";
    input2.value = "";
  });

  dialog.querySelector("#mapCon").appendChild(input1);
  dialog.querySelector("#mapCon").appendChild(input2);
  dialog.querySelector("#mapCon").appendChild(btnCon);
  dialog.querySelector("#mapCon").appendChild(tableTemp);
  dialog.showModal();
});

function fillStat4(filt1, filt2, tableTemp) {
  var textData = {
    filtro1: filt1,
    filtro2: filt2,
  };

  if (filt1 == "" && filt2 == "") {
    error4.showModal();
    return;
  } else if (filt1 == "" && filt2 != "") {
    error1.showModal();
    return;
  } else if (filt1 != "" && filt2 == "") {
    error1.showModal();
    return;
  }


  const url1 = "http://localhost:8000/stat4";

  fetch(url1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud fetch no tuvo éxito");
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      // Consultar los datos de la respuesta de la API
      blanquearTabla(tableTemp.id);
      fillStat4Aux(data.resultado, tableTemp);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

function fillStat4Aux(clientData, tableTemp) {
  if (clientData.length != 0) {
    for (x = 0; x < clientData.length; x++) {
      var fila = document.createElement("tr");
      var nombreCliente = document.createElement("td");
      nombreCliente.textContent = clientData[x].año;
      var categoria = document.createElement("td");
      categoria.textContent = clientData[x].Nombre;
      var metodoEntrega = document.createElement("td");
      metodoEntrega.textContent = clientData[x].cantidadFacturas;
      var columna = document.createElement("td");
      columna.textContent = clientData[x].TotalComprado;

      fila.appendChild(nombreCliente);
      fila.appendChild(categoria);
      fila.appendChild(metodoEntrega);
      fila.appendChild(columna);
      tableTemp.querySelector("tbody").appendChild(fila);
    }
  } else {
    error3.showModal();
  }
}


bntStat5.addEventListener("click", function () {
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";
  const tableTemp = document.getElementById("tableStat5").cloneNode(true);
  tableTemp.id = "tableTemp";

  const input1 = document.createElement("input");
  input1.type = "date";
  input1.value = "";
  input1.classList.add("input3");

  const input2 = document.createElement("input");
  input2.type = "date";
  input2.classList.add("input3");

  const btnCon = document.createElement("button");
  btnCon.textContent = "Consultar";
  btnCon.classList.add("glow-on-hover");

  btnCon.addEventListener("click", function () {
    fillStat5(input1.value.substring(0,4), input2.value.substring(0,4), tableTemp);
    input1.value = "";
    input2.value = "";
  });

  dialog.querySelector("#mapCon").appendChild(input1);
  dialog.querySelector("#mapCon").appendChild(input2);
  dialog.querySelector("#mapCon").appendChild(btnCon);
  dialog.querySelector("#mapCon").appendChild(tableTemp);
  dialog.showModal();
});

function fillStat5(filt1, filt2, tableTemp) {
  var textData = {
    filtro1: filt1,
    filtro2: filt2,
  };

  if (filt1 == "" && filt2 == "") {
    error4.showModal();
    return;
  } else if (filt1 == "" && filt2 != "") {
    error1.showModal();
    return;
  } else if (filt1 != "" && filt2 == "") {
    error1.showModal();
    return;
  }


  const url1 = "http://localhost:8000/stat5";

  fetch(url1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud fetch no tuvo éxito");
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      // Consultar los datos de la respuesta de la API
      blanquearTabla(tableTemp.id);
      fillStat5Aux(data.resultado, tableTemp);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

function fillStat5Aux(clientData, tableTemp) {
  if (clientData.length != 0) {
    for (x = 0; x < clientData.length; x++) {
      var fila = document.createElement("tr");
      var nombreCliente = document.createElement("td");
      nombreCliente.textContent = clientData[x].año;
      var categoria = document.createElement("td");
      categoria.textContent = clientData[x].SupplierName;
      var metodoEntrega = document.createElement("td");
      metodoEntrega.textContent = clientData[x].cantidadOrdenes;
      var columna = document.createElement("td");
      columna.textContent = clientData[x].monto;

      fila.appendChild(nombreCliente);
      fila.appendChild(categoria);
      fila.appendChild(metodoEntrega);
      fila.appendChild(columna);
      tableTemp.querySelector("tbody").appendChild(fila);
    }
  } else {
    error3.showModal();
  }
}




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
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud fetch no tuvo éxito");
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
      console.error("Error en la solicitud:", error);
    });
});

function fillTableC(clientData) {
  if (clientData.length != 0) {
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
  } else {
    error3.showModal();
    inpCli0.value = "";
    inpCli1.value = "";
    inpCli2.value = "";
  }
}

function showDetailsC(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";

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
    "Días de gracia para pagar: " + tempC[id].diasP.toString(),
    "",
    "Dirección",
    "",
    "Dirección: " + tempC[id].direccionDelivery,
    "Codigo postal: " + tempC[id].codigoPostal[1],
  ];

  for (var i = 0; i < textos.length; i++) {
    var nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = textos[i];
    dialog.querySelector("#mapCon").appendChild(nuevoParrafo);
  }

  link = document.createElement("a");
  link.textContent = "Más información";
  link.href = tempC[id].pagina;
  dialog.querySelector("#mapCon").appendChild(link);
  var nuevoParrafo = document.createElement("p");
  nuevoParrafo.textContent = "Ubicación en maps";
  dialog.querySelector("#mapCon").appendChild(nuevoParrafo);

  latitud = tempC[id].DeliveryLocation.points[0].x;
  longitud = tempC[id].DeliveryLocation.points[0].y;

  var existingMapContainer = document.getElementById("map");
  if (existingMapContainer) {
    existingMapContainer.remove();
  }

  var mapContainer = document.createElement("div");
  mapContainer.id = "map";
  mapContainer.style.width = "100%";
  mapContainer.style.height = "400px";

  document.getElementById("mapCon").appendChild(mapContainer);

  var map = L.map("map").setView([latitud, longitud], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud fetch no tuvo éxito");
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
      console.error("Error en la solicitud:", error);
    });
});

function fillTableP(clientProv) {
  if (clientProv.length != 0) {
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
  } else {
    error3.showModal();
    inpPro0.value = "";
    inpPro1.value = "";
    inpPro2.value = "";
  }
}

function showDetailsP(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";

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
    dialog.querySelector("#mapCon").appendChild(nuevoParrafo);
  }

  link = document.createElement("a");
  link.textContent = "Más información";
  link.href = tempP[id].pagina;
  dialog.querySelector("#mapCon").appendChild(link);
  var nuevoParrafo = document.createElement("p");
  nuevoParrafo.textContent = "Ubicación en maps";
  dialog.querySelector("#mapCon").appendChild(nuevoParrafo);

  latitud = tempP[id].deliveryLocation.points[0].x;
  longitud = tempP[id].deliveryLocation.points[0].y;

  var existingMapContainer = document.getElementById("map");
  if (existingMapContainer) {
    existingMapContainer.remove();
  }

  var mapContainer = document.createElement("div");
  mapContainer.id = "map";
  mapContainer.style.width = "100%";
  mapContainer.style.height = "400px";

  document.getElementById("mapCon").appendChild(mapContainer);

  var map = L.map("map").setView([latitud, longitud], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud fetch no tuvo éxito");
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
      console.error("Error en la solicitud:", error);
    });
});

function fillTableI(clientInv) {
  if (clientInv.length != 0) {
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
  } else {
    error3.showModal();
    inpInv0.value = "";
    inpInv1.value = "";
    inpInv2.value = "";
  }
}

function showDetailsI(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";

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
    dialog.querySelector("#mapCon").appendChild(nuevoParrafo);
  }

  latitud = tempI[id].DeliveryLocation.points[0].x;
  longitud = tempI[id].DeliveryLocation.points[0].y;

  var existingMapContainer = document.getElementById("map");
  if (existingMapContainer) {
    existingMapContainer.remove();
  }

  var mapContainer = document.createElement("div");
  mapContainer.id = "map";
  mapContainer.style.width = "100%";
  mapContainer.style.height = "400px";

  document.getElementById("mapCon").appendChild(mapContainer);

  var map = L.map("map").setView([latitud, longitud], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([latitud, longitud]).addTo(map);

  dialog.showModal();
}

//Modulo cliente inventario
btnConV.addEventListener("click", function () {
  if (inpVen3.value == "" && inpVen4.value != "") {
    error1.showModal();
    inpVen0.value = "";
    inpVen1.value = "";
    inpVen2.value = "";
    inpVen3.value = "";
    inpVen4.value = "";
    inpVen5.value = "";
    inpVen6.value = "";
    return;
  } else if (inpVen3.value != "" && inpVen4.value == "") {
    error1.showModal();
    inpVen0.value = "";
    inpVen1.value = "";
    inpVen2.value = "";
    inpVen3.value = "";
    inpVen4.value = "";
    inpVen5.value = "";
    inpVen6.value = "";
    return;
  } else if (inpVen5.value == "" && inpVen6.value != "") {
    error2.showModal();
    inpVen0.value = "";
    inpVen1.value = "";
    inpVen2.value = "";
    inpVen3.value = "";
    inpVen4.value = "";
    inpVen5.value = "";
    inpVen6.value = "";
    return;
  } else if (inpVen5.value != "" && inpVen6.value == "") {
    error2.showModal();
    inpVen0.value = "";
    inpVen1.value = "";
    inpVen2.value = "";
    inpVen3.value = "";
    inpVen4.value = "";
    inpVen5.value = "";
    inpVen6.value = "";
    return;
  }

  var textData = {
    filtro1: inpVen0.value,
    filtro2: inpVen1.value,
    filtro3: inpVen2.value,
    filtro4: inpVen3.value,
    filtro5: inpVen4.value,
    filtro6: inpVen5.value,
    filtro7: inpVen6.value,
  };

  const url1 = "http://localhost:8000/ven";

  fetch(url1, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La solicitud fetch no tuvo éxito");
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      // Consultar los datos de la respuesta de la API

      blanquearTabla("tableVen");
      tempV = data.resultado;
      fillTableV(data.resultado);
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
});

function fillTableV(clientVen) {
  if (clientVen.length != 0) {
    for (x = 0; x < clientVen.length; x++) {
      var fila = document.createElement("tr");
      var nombreCliente = document.createElement("td");
      nombreCliente.textContent = clientVen[x].numeroFactura;
      var categoria = document.createElement("td");
      categoria.textContent = clientVen[x].fecha.substring(0, 10);
      var metodoEntrega = document.createElement("td");
      metodoEntrega.textContent = clientVen[x].nombreCliente;
      var fecha = document.createElement("td");
      fecha.textContent = clientVen[x].MetodoEntrega;
      var monto = document.createElement("td");
      monto.textContent = clientVen[x].montoImpuesto;

      var boton = document.createElement("td");
      var botonElement = document.createElement("button");
      botonElement.textContent = "Detalles";
      botonElement.classList.add("button-80");
      botonElement.id = x;

      botonElement.addEventListener("click", function (event) {
        showDetailsV(event.currentTarget.id);
      });

      boton.appendChild(botonElement);

      fila.appendChild(nombreCliente);
      fila.appendChild(categoria);
      fila.appendChild(metodoEntrega);
      fila.appendChild(fecha);
      fila.appendChild(monto);
      fila.appendChild(boton);

      tableV.querySelector("tbody").appendChild(fila);
    }
  } else {
    error3.showModal();
    inpVen0.value = "";
    inpVen1.value = "";
    inpVen2.value = "";
    inpVen3.value = "";
    inpVen4.value = "";
    inpVen5.value = "";
    inpVen6.value = "";
  }
}

function showDetailsV(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.querySelector("#mapCon").innerHTML = "";
  word = tempV[id].fecha.toString();
  word = word.substring(0, 10);

  var textos = [
    "Numero de factura: " + tempV[id].numeroFactura,
    "Nombre del cliente: " + tempV[id].nombreCliente,
    "Metodo de entrega: " + tempV[id].MetodoEntrega,
    "Numero de orden: " + tempV[id].NumeroOrden,
    "Persona de contacto: " + tempV[id].Contacto,
    "Nombre del vendedor: " + tempV[id].vendedor,
    "Fecha de la factura: " + word,
    "Instrucciones de entrega: " + tempV[id].InstruccionesEntrega,
    "Detalle de la factura",
    "Nombre del producto: " + tempV[id].nombreProducto,
    "Cantidad: " + tempV[id].cantidad,
    "Precio unitario: " + tempV[id].precioUnitario,
    "Impuesto aplicado: " + tempV[id].impuesto,
    "Total por linea: " + tempV[id].montoImpuesto,
  ];

  for (var i = 0; i < textos.length; i++) {
    var nuevoParrafo = document.createElement("p");
    nuevoParrafo.textContent = textos[i];
    dialog.querySelector("#mapCon").appendChild(nuevoParrafo);
  }

  dialog.showModal();
}
