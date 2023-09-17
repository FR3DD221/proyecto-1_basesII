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