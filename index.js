const btnCli = document.getElementById("modCli");
const btnProv = document.getElementById("modProv");
const btnInv = document.getElementById("modInv");
const btnVen = document.getElementById("modVen");
const btnEst = document.getElementById("modEst");
const btnBack = document.getElementById("goBack");

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
    nombreCliente.textContent = clientData[x].CustomerName;
    var categoria = document.createElement("td");
    categoria.textContent = clientData[x].CustomerCategoryName;
    var metodoEntrega = document.createElement("td");
    metodoEntrega.textContent = clientData[x].DeliveryMethodName;

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
  dialog.innerHTML = tempC[id].CustomerName;
  dialog.showModal();
}


//Modulo cliente proveedor
/*
btnConP.addEventListener("click", function () { 
  var textData = {
      filtro1: inpPro0.value,
      filtro2: inpPro1.value,
      filtro3: inpPro2.value,
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

    blanquearTabla("tableProv");
    tempP = data.resultado;
    fillTableC(data.resultado);
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });
});

function fillTableP(clientProv) {
  for (x = 0; x < clientProv.length; x++) {
    var fila = document.createElement("tr");
    var nombreCliente = document.createElement("td");
    nombreCliente.textContent = clientProv[x].CustomerName;
    var categoria = document.createElement("td");
    categoria.textContent = clientProv[x].CustomerCategoryName;
    var metodoEntrega = document.createElement("td");
    metodoEntrega.textContent = clientProv[x].DeliveryMethodName;

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

    tableC.querySelector("tbody").appendChild(fila);
  }
}

function showDetailsP(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.innerHTML = tempP[id].CustomerName;
  dialog.showModal();
}
*/

//Modulo cliente inventario
/*
btnConI.addEventListener("click", function () { 
  var textData = {
      filtro1: inpInv0.value,
      filtro2: inpInv1.value,
      filtro3: inpInv2.value,
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

    blanquearTabla("tableInv");
    tempI = data.resultado;
    fillTableC(data.resultado);
  })
  .catch((error) => {
    console.error('Error en la solicitud:', error);
  });
});

function fillTableI(clientInv) {
  for (x = 0; x < clientInv.length; x++) {
    var fila = document.createElement("tr");
    var nombreCliente = document.createElement("td");
    nombreCliente.textContent = clientInv[x].CustomerName;
    var categoria = document.createElement("td");
    categoria.textContent = clientInv[x].CustomerCategoryName;
    var metodoEntrega = document.createElement("td");
    metodoEntrega.textContent = clientInv[x].DeliveryMethodName;

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

    tableC.querySelector("tbody").appendChild(fila);
  }
}

function showDetailsI(id) {
  id = parseInt(id);
  const dialog = document.getElementById("pop-it");
  dialog.innerHTML = tempI[id].CustomerName;
  dialog.showModal();
}
*/