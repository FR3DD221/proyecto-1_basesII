const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express');

const app = express();
const port = process.env.PORT || 8000;


var filt1 = "";
var filt2 = "";
var filt3 = "";
var filt4 = "";
var filt5 = "";
var filt6 = "";
var filt7 = "";

//EXEC BuscarClientesConFiltros  '',  '',  '';
//EXEC BuscarProvedoresConFiltros  '',  '',  '';
//EXEC BuscarStockItemsConFiltros '','';

const query1 = `BuscarClientesConFiltros  @miDato1, @miDato2, @miDato3`;

const query2 = `BuscarProvedoresConFiltros  @miDato1, @miDato2, @miDato3`;

const query3 = `BuscarStockItemsConFiltros  @miDato1, @miDato2, @miDato3`;

const query4 = `BuscarVentas  @miDato1, @miDato2, @miDato3, @FechaInit, @FechaEnd, @montoInit, @montoEnd`;

const query5 = `BuscarE1  @miDato1, @miDato2`;

const query6 = `BuscarE2  @miDato1, @miDato2`;

const query7 = `BuscarE3  @Anno`;

const query8 = `BuscarE4  @AnnoI, @AnnoE`;

const query9 = `BuscarE5  @AnnoI, @AnnoE`;


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

        res.json(result.recordset);
        sql.close();
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

app.get('/ventas', async (req, res) => {
  try {

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('miDato1', sql.Int, filt1)
      .input('miDato2', sql.VARCHAR(50), filt2)
      .input('miDato3', sql.VARCHAR(50), filt3)
      .input('FechaInit', sql.VARCHAR(50), filt4)
      .input('FechaEnd', sql.VARCHAR(50), filt5)
      .input('montoInit', sql.Int, filt6)
      .input('montoEnd', sql.Int, filt7)

      .query(query4);
      filt1 = "";
      filt2 = "";
      filt3 = "";
      filt4 = "";
      filt5 = "";
      filt6 = "";
      filt7 = "";
      
      res.json(result.recordset);
      sql.close();
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
  }
});


app.get('/consulStat1', async (req, res) => {
  try {

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('miDato1', sql.VARCHAR(50), filt1)
      .input('miDato2', sql.VARCHAR(50), filt2)

      .query(query5);
      filt1 = "";
      filt2 = "";
      
      res.json(result.recordset);
      sql.close();
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
  }
});


app.get('/consulStat2', async (req, res) => {
  try {

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('miDato1', sql.VARCHAR(50), filt1)
      .input('miDato2', sql.VARCHAR(50), filt2)

      .query(query6);
      filt1 = "";
      filt2 = "";
      
      res.json(result.recordset);
      sql.close();
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
  }
});


app.get('/consulStat3', async (req, res) => {
  try {

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('Anno', sql.VARCHAR(50), filt1)

      .query(query7);
      filt1 = "";
      
      res.json(result.recordset);
      sql.close();
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
  }
});



app.get('/consulStat4', async (req, res) => {
  try {

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('AnnoI', sql.VARCHAR(50), filt1)
      .input('AnnoE', sql.VARCHAR(50), filt2)

      .query(query8);
      filt1 = "";
      filt2 = "";
      
      res.json(result.recordset);
      sql.close();
  } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
  }
});



app.get('/consulStat5', async (req, res) => {
  try {

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('AnnoI', sql.VARCHAR(50), filt1)
      .input('AnnoE', sql.VARCHAR(50), filt2)

      .query(query9);
      filt1 = "";
      filt2 = "";
      
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


app.post('/ven', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;
    filt3 = dataReceived.filtro3;
    filt4 = dataReceived.filtro4;
    filt5 = dataReceived.filtro5;
    filt6 = dataReceived.filtro6;
    filt7 = dataReceived.filtro7;

    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/ventas");

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


//======================================================================================
//======================================================================================

app.post('/stat1', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;

    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/consulStat1");

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


app.post('/stat2', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;

    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/consulStat2");

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


app.post('/stat3', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;

    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/consulStat3");

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

app.post('/stat4', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;


    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/consulStat4");

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

app.post('/stat5', async (req, res) => {
  try {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;


    // Realizar una solicitud fetch
    const response = await fetch("http://localhost:8000/consulStat5");

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