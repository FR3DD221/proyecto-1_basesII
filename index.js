const btnCli = document.getElementById("modCli");
const btnProv = document.getElementById("modProv");
const btnInv = document.getElementById("modInv");
const btnVen = document.getElementById("modVen");
const btnEst = document.getElementById("modEst");
const btnBack = document.getElementById("goBack");

const cont1 = document.getElementById("cont1");
const inpCli0 = document.getElementById("filterCli0");
const inpCli1 = document.getElementById("filterCli1");
const inpCli2 = document.getElementById("filterCli2");
const tableC = document.getElementById("tableClient");
const btnConC = document.getElementById("consultC"); 


//Sección de funcionalidad del menu pricipal
btnCli.addEventListener("click", function() {
    btnCli.style.display = "none";
    btnProv.style.display = "none";
    btnInv.style.display = "none";
    btnVen.style.display = "none";
    btnEst.style.display = "none";
    btnBack.style.display = "block";
    cont1.style.display = "block";
});

btnProv.addEventListener("click", function() {
    btnCli.style.display = "none";
    btnProv.style.display = "none";
    btnInv.style.display = "none";
    btnVen.style.display = "none";
    btnEst.style.display = "none";
    btnBack.style.display = "block";
});

btnInv.addEventListener("click", function() {
    btnCli.style.display = "none";
    btnProv.style.display = "none";
    btnInv.style.display = "none";
    btnVen.style.display = "none";
    btnEst.style.display = "none";
    btnBack.style.display = "block";
});

btnVen.addEventListener("click", function() {
    btnCli.style.display = "none";
    btnProv.style.display = "none";
    btnInv.style.display = "none";
    btnVen.style.display = "none";
    btnEst.style.display = "none";
    btnBack.style.display = "block";
});

btnEst.addEventListener("click", function() {
    btnCli.style.display = "none";
    btnProv.style.display = "none";
    btnInv.style.display = "none";
    btnVen.style.display = "none";
    btnEst.style.display = "none";
    btnBack.style.display = "block";
});

btnBack.addEventListener("click", function() {
    btnCli.style.display = "block";
    btnProv.style.display = "block";
    btnInv.style.display = "block";
    btnVen.style.display = "block";
    btnEst.style.display = "block";
    btnBack.style.display = "none";
    cont1.style.display = "none";
});

function blanquearTabla(nameTable) {
    const tabla = document.getElementById(nameTable);
    const tbody = tabla.querySelector("tbody");

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
}

//Modulo cliente boton
btnConC.addEventListener("click", function() {
    blanquearTabla("tableClient");
    fillTableC();
});


const x = [
    {
        "name" : "juan",
        "categoria" : "nose",
        "metodoEntrega" : "correosCr"
    }, {
        "name" : "fredd",
        "categoria" : "xx",
        "metodoEntrega" : "xxxx"
    },
    {
        "name" : "fredd",
        "categoria" : "xx",
        "metodoEntrega" : "xxxx"
    }
]

function fillTableC() {
    for (i = 0; i < x.length; i++) {
        var fila = document.createElement("tr");
        var nombreCliente = document.createElement("td");
        nombreCliente.textContent = x[i].name;
        var categoria = document.createElement("td");
        categoria.textContent = x[i].categoria;
        var metodoEntrega = document.createElement("td");
        metodoEntrega.textContent = x[i].metodoEntrega;

        var boton = document.createElement("td");
        var botonElement = document.createElement("button");
        botonElement.textContent = "Detalles"; 
        //botonElement.classList.add("mi-clase");
        botonElement.id = i;
        
        botonElement.addEventListener("click", function(event) {
            showDetailsC(event.currentTarget.id);
        });

        boton.appendChild(botonElement);
    
        fila.appendChild(nombreCliente);
        fila.appendChild(categoria);
        fila.appendChild(metodoEntrega);
        fila.appendChild(boton);
    
        tableC.querySelector("tbody").appendChild(fila);
    }
};

function showDetailsC(id) {
    id = parseInt(id);
    const dialog = document.getElementById("pop-it");
    dialog.innerHTML = x[id].name;
    dialog.showModal();
};