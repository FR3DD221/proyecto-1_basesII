const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express');

const app = express();
const port = process.env.PORT || 8000;


var filt1 = "";
var filt2 = "";
var filt3 = "";



//EXEC BuscarClientesConFiltros  '',  '',  '';
//EXEC BuscarProvedoresConFiltros  '',  '',  '';
//EXEC BuscarStockItemsConFiltros '','';

const query1 = `BuscarClientesConFiltros  @miDato1, @miDato2, @miDato3`;

const query2 = `BuscarProvedoresConFiltros  @miDato1, @miDato2, @miDato3`;

const query3 = `BuscarStockItemsConFiltros  @miDato1, @miDato2, @miDato3`;


// Middleware
app.use(bodyParser.json());
app.use(cors());


// Configura la cadena de conexión
const config = {
  user: 'RestFullApi',
  password: 'true',
  server: 'LAPTOP-KGGQABLE', // Cambia esto a la dirección de tu servidor SQL Server
  database: 'WideWorldImporters',
  options: {
    trustServerCertificate: true, 
  },
};


//=========================================================================Read=================================================================
// Rutas de la API
app.get('/customers', async (req, res) => {

    try {

        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('miDato1', sql.VARCHAR(50), filt1)
        .input('miDato2', sql.VARCHAR(50), filt2)
        .input('miDato3', sql.VARCHAR(50), filt3)
        .query(query1);
        filt1 = "";
        filt2 = "";
        filt3 = "";

        sql.close();

        res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  });



app.get('/suppliers', async (req, res) => {
    try {

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('miDato1', sql.VARCHAR(50), filt1)
      .input('miDato2', sql.VARCHAR(50), filt2)
      .input('miDato3', sql.VARCHAR(50), filt3)
      .query(query2);
      filt1 = "";
      filt2 = "";
      filt3 = "";
      
      res.json(result.recordset);
      sql.close();

    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  });

app.get('/stockItems', async (req, res) => {
    try {

        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('miDato1', sql.VARCHAR(50), filt1)
        .input('miDato2', sql.VARCHAR(50), filt2)
        .input('miDato3', sql.Int, filt3)
        .query(query3);
        filt1 = "";
        filt2 = "";
        filt3 = "";

        res.json(result.recordset);
        sql.close();
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});





app.post('/cli', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;
    filt3 = dataReceived.filtro3;

    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/customers");

    if (!response.ok) {
      throw new Error("La solicitud fetch no tuvo éxito");
    }

    const data = await response.json();

    // Realizar cualquier procesamiento necesario con los datos

    // Crear un objeto de respuesta
    const outputData = {
      mensaje: 'Datos procesados correctamente',
      resultado: data  // Utiliza los datos de la respuesta de la solicitud fetch
    };

    // Enviar datos de salida como JSON
    res.json(outputData);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    res.status(500).json({ mensaje: 'Error en la solicitud' }); // Manejar errores de manera adecuada
  }
});

app.post('/prov', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;
    filt3 = dataReceived.filtro3;

    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/suppliers");

    if (!response.ok) {
      throw new Error("La solicitud fetch no tuvo éxito");
    }

    const data = await response.json();

    // Realizar cualquier procesamiento necesario con los datos

    // Crear un objeto de respuesta
    const outputData = {
      mensaje: 'Datos procesados correctamente',
      resultado: data  // Utiliza los datos de la respuesta de la solicitud fetch
    };

    // Enviar datos de salida como JSON
    res.json(outputData);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    res.status(500).json({ mensaje: 'Error en la solicitud' }); // Manejar errores de manera adecuada
  }
});

app.post('/inv', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;
    filt3 = dataReceived.filtro3;

    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/stockItems");

    if (!response.ok) {
      throw new Error("La solicitud fetch no tuvo éxito");
    }

    const data = await response.json();

    // Realizar cualquier procesamiento necesario con los datos

    // Crear un objeto de respuesta
    const outputData = {
      mensaje: 'Datos procesados correctamente',
      resultado: data  // Utiliza los datos de la respuesta de la solicitud fetch
    };

    // Enviar datos de salida como JSON
    res.json(outputData);
  } catch (error) {
    console.error("Error en la solicitud:", error);
    res.status(500).json({ mensaje: 'Error en la solicitud' }); // Manejar errores de manera adecuada
  }
});

//========================listen

app.use(bodyParser.json());



//==============================================


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});