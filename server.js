const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;


var filt1 = "";
var filt2 = "";
var filt3 = "";


const query1 = `

SELECT * FROM Sales.Customers cus 
								  INNER JOIN Sales.CustomerCategories cat ON cus.CustomerCategoryID = cat.CustomerCategoryID
								  INNER JOIN [Application].[DeliveryMethods] del ON  del.DeliveryMethodId = cus.DeliveryMethodID

WHERE CustomerName LIKE '%' + @miDato1 + '%' AND CustomerCategoryName LIKE '%' + @miDato2 + '%' AND DeliveryMethodName LIKE '%' + @miDato3 + '%' 
ORDER BY CustomerName ASC;

`;

const query2 = `

SELECT * FROM [Purchasing].[Suppliers] sup 
								  INNER JOIN [Purchasing].[SupplierCategories] cat ON sup.SupplierCategoryID = cat.SupplierCategoryID
								  INNER JOIN [Application].[DeliveryMethods] del ON  del.DeliveryMethodId = sup.DeliveryMethodID

WHERE SupplierName LIKE '%' + @miDato1 + '%' AND SupplierCategoryName LIKE '%' + @miDato2 + '%' AND DeliveryMethodName LIKE '%' + @miDato3 + '%' 
ORDER BY SupplierName ASC;

`;

const query3 = `

SELECT * FROM [Warehouse].[StockItems] items 
					INNER JOIN [Warehouse].[StockItemStockGroups] itg ON items.StockItemID = itg.StockItemID
					INNER JOIN [Warehouse].[StockGroups] groups ON groups.StockGroupID = itg.StockGroupID

WHERE StockItemName LIKE '%' + @miDato1 + '%' AND StockGroupName LIKE '%' + @miDato2 + '%' 
ORDER BY StockItemName ASC;
`;

 
// Middleware
app.use(bodyParser.json());
app.use(cors());


// Configura la cadena de conexión
const config = {
  user: 'RestFullApi',
  password: 'true',
  server: 'True', // Cambia esto a la dirección de tu servidor SQL Server
  database: 'WideWorldImporters',
  encrypt: false,
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
        
        res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  });


app.get('/Suppliers', async (req, res) => {
    try {

      const pool = await sql.connect(config);
      const result = await pool.request()
      .input('miDato1', sql.VARCHAR(50), '')
      .input('miDato2', sql.VARCHAR(50), '')
      .input('miDato3', sql.VARCHAR(50), '')
      .query(query2);
      
      res.json(result.recordset);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error en el servidor');
    }
  });

app.get('/StockItems', async (req, res) => {
    try {

        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('miDato1', sql.VARCHAR(50), '')
        .input('miDato2', sql.VARCHAR(50), '')
        .query(query3);
        
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');
    }
});




//========================listen

app.use(bodyParser.json());

app.post('/datos', (req, res) => {
    const dataReceived = req.body;
    filt1 = dataReceived.filtro1;
    filt2 = dataReceived.filtro2;
    filt3 = dataReceived.filtro3;
    console.log('Datos recibidos:', dataReceived);
    // Puedes enviar una respuesta al cliente si es necesario
});



//================Examples=====================

const url1 = 'http://localhost:3000/datos';

var textData = {
    filtro1: "Gan",
    filtro2: "",
    filtro3: ""
}

fetch(url1, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(textData)
})

//==============================================


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

  
