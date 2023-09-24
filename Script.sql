
use WideWorldImporters;

--Buscar CLientes===================================================================================
IF OBJECT_ID('BuscarClientesConFiltros', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarClientesConFiltros;
END;
GO
CREATE PROCEDURE BuscarClientesConFiltros
    @miDato1 NVARCHAR(50) = 'toy',
    @miDato2 NVARCHAR(50) = '',
    @miDato3 NVARCHAR(50) = ''
AS
BEGIN

SELECT cus.CustomerName as NombreCliente, cat.CustomerCategoryName as categoria, bg.BuyingGroupName as grupoCompra, p1.FullName as contactoPrimario, p2.FullName as contactoAlter,
        cus2.CustomerName as clienteFacturar, del.DeliveryMethodName as DeliveryMethod, cus.PostalAddressLine2 as direccion, cus.PostalPostalCode as codigoPostal, cus.PhoneNumber as telefono,
        cus.FaxNumber as fax, cus.PaymentDays as diasP, cus.WebsiteURL as pagina, cus.DeliveryAddressLine1 + cus.DeliveryAddressLine2 as direccionDelivery, cus.DeliveryPostalCode as codigoPostal,
        cus.DeliveryLocation
                                  FROM Sales.Customers cus 
                                  INNER JOIN Sales.CustomerCategories cat ON cus.CustomerCategoryID = cat.CustomerCategoryID
                                  INNER JOIN [Application].[DeliveryMethods] del ON  del.DeliveryMethodId = cus.DeliveryMethodID
                                  INNER JOIN [Sales].[BuyingGroups] bg ON cus.BuyingGroupID = bg.BuyingGroupID
                                  INNER JOIN [Application].[People] p1 ON p1.PersonID = cus.PrimaryContactPersonID
                                  INNER JOIN [Application].[People] p2 ON p2.PersonID = cus.AlternateContactPersonID
                                  INNER JOIN Sales.Customers cus2 ON cus.BillToCustomerID = cus2.CustomerID
    WHERE
        cus.CustomerName LIKE '%' + @miDato1 + '%'
        AND CustomerCategoryName LIKE '%' + @miDato2 + '%'
        AND DeliveryMethodName LIKE '%' + @miDato3 + '%'
    ORDER BY cus.CustomerName ASC;
END;

--Buscar provedores===================================================================================

IF OBJECT_ID('BuscarProvedoresConFiltros', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarProvedoresConFiltros;
END;
GO
CREATE PROCEDURE BuscarProvedoresConFiltros
    @miDato1 NVARCHAR(50),
    @miDato2 NVARCHAR(50),
    @miDato3 NVARCHAR(50)
AS
BEGIN
SELECT sup.SupplierReference as reference, sup.SupplierName as supplierName, cat.SupplierCategoryName as  categoryName, p1.FullName as contactoPrimario, p2.FullName as contactoSec, 
                                del.DeliveryMethodName as metodoEntrega, city.CityName as ciudad, sup.PostalCityID as codigoPostal, sup.PhoneNumber as telefono, sup.FaxNumber as fax,
                                sup.WebsiteURL as pagina, sup.DeliveryAddressLine1 + sup.DeliveryAddressLine2 as direccionDelivery, sup.DeliveryPostalCode as deliveryPostal, sup.DeliveryLocation as deliveryLocation, sup.BankAccountBranch as bank,
                                sup.BankAccountNumber as bankNumber, sup.PaymentDays as dias
                                  FROM [Purchasing].[Suppliers] sup 
                                  INNER JOIN [Purchasing].[SupplierCategories] cat ON sup.SupplierCategoryID = cat.SupplierCategoryID
                                  INNER JOIN [Application].[DeliveryMethods] del ON  del.DeliveryMethodId = sup.DeliveryMethodID
                                  INNER JOIN [Application].[People] p1 ON p1.PersonID = sup.PrimaryContactPersonID
                                  INNER JOIN [Application].[People] p2 ON p2.PersonID = sup.AlternateContactPersonID
                                  INNER JOIN [Application].[Cities] city ON city.CityID = sup.DeliveryCityID
    WHERE sup.SupplierName LIKE '%' + @miDato1 + '%' AND cat.SupplierCategoryName LIKE '%' + @miDato2 + '%' AND DeliveryMethodName LIKE '%' + @miDato3 + '%' 
    ORDER BY sup.SupplierName ASC;
END;

--Buscar items en stock??=======================================================================================

IF OBJECT_ID('BuscarStockItemsConFiltros', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarStockItemsConFiltros;
END;
GO
CREATE PROCEDURE BuscarStockItemsConFiltros
    @miDato1 NVARCHAR(50),
    @miDato2 NVARCHAR(50),
	@miDato3 INT
AS
BEGIN
SELECT StockItemName, sup.SupplierName as SuppliernName, col.ColorName AS color, package1.PackageTypeName as UnitPackage, package2.PackageTypeName as outerPackage,
        items.RecommendedRetailPrice as precio, items.TypicalWeightPerUnit as peso, items.SearchDetails as palabrasClave, items.QuantityPerOuter as cantidad, items.Brand as Marca,
        items.Size as talla, items.TaxRate as Tax, items.UnitPrice as precioUnitario, hold.QuantityOnHand as cantidadMano, sup.DeliveryAddressLine2 AS direccion, sup.DeliveryLocation

                    FROM [Warehouse].[StockItems] items 
                    INNER JOIN [Warehouse].[StockItemStockGroups] itg ON items.StockItemID = itg.StockItemID
                    INNER JOIN [Warehouse].[StockGroups] groups ON groups.StockGroupID = itg.StockGroupID
                    INNER JOIN [Purchasing].[Suppliers] sup ON items.SupplierID = sup.SupplierID
                    INNER JOIN [Warehouse].[Colors] col ON col.ColorID = items.ColorID

                    INNER JOIN [Warehouse].[PackageTypes] package1 ON package1.PackageTypeID = items.UnitPackageID
                    INNER JOIN [Warehouse].[PackageTypes] package2 ON package2.PackageTypeID = items.OuterPackageID

                    INNER JOIN [Warehouse].[StockItemHoldings] hold ON hold.StockItemID = items.StockItemID
    WHERE StockItemName LIKE '%' + @miDato1 + '%' AND StockGroupName LIKE '%' + @miDato2 + '%' AND  @miDato3 >= items.QuantityPerOuter
    ORDER BY StockItemName ASC;
END;


--Buscar ventas=======================================================================================

IF OBJECT_ID('BuscarVentas', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarVentas;
END;
GO
CREATE PROCEDURE BuscarVentas
    @miDato1 INT,
    @miDato2 NVARCHAR(50),
    @miDato3 NVARCHAR(50),
	@FechaInit NVARCHAR(50),
	@FechaEnd NVARCHAR(50),
	@montoInit INT,
	@montoEnd INT

	--@miDato4 NVARCHAR(50),
    --@miDato5 NVARCHAR(50)
AS
BEGIN

	DECLARE @FechaInicio DATETIME
    DECLARE @FechaFinal DATETIME

    SET @FechaInicio = CONVERT(DATETIME, @FechaInit, 120) -- Suponiendo formato 'YYYY-MM-DD'
    SET @FechaFinal = CONVERT(DATETIME, @FechaEnd, 120)

	SELECT TOP (3000) InvoiceID numeroFactura, cus.CustomerName nombreCliente, del.DeliveryMethodName MetodoEntrega, factura.CustomerPurchaseOrderNumber NumeroOrden,
				 p1.FullName Contacto, p2.FullName vendedor, factura.InvoiceDate fecha, factura.DeliveryInstructions InstruccionesEntrega,
				 items.StockItemName nombreProducto, salesLines.Quantity cantidad, salesLines.UnitPrice precioUnitario, items.TaxRate impuesto,
				 (salesLines.Quantity * salesLines.UnitPrice) * items.TaxRate/100 montoImpuesto
					FROM [Sales].[Invoices] factura
					INNER JOIN [Sales].[Customers] cus ON cus.CustomerID = factura.CustomerID
					INNER JOIN [Application].[DeliveryMethods] del ON factura.DeliveryMethodID = del.DeliveryMethodID
					INNER JOIN [Application].[People] p1 ON p1.PersonID = factura.ContactPersonID
					INNER JOIN [Application].[People] p2 ON p2.PersonID = factura.ContactPersonID

					INNER JOIN [Sales].[Orders] sales ON sales.OrderID = factura.OrderID
					INNER JOIN [Sales].[OrderLines] salesLines ON salesLines.OrderID = sales.OrderID

					INNER JOIN [Warehouse].[StockItems] items ON items.StockItemID = salesLines.StockItemID
    WHERE
        (InvoiceID = @miDato1 or '' = @miDato1)

        AND cus.CustomerName LIKE '%' + @miDato2 + '%'

        AND del.DeliveryMethodName LIKE '%' + @miDato3 + '%'

		AND (factura.InvoiceDate BETWEEN @FechaInicio AND @FechaFinal
		OR @FechaInit = '' OR @FechaEnd = '')

		AND ((salesLines.Quantity * salesLines.UnitPrice) * items.TaxRate/100 >= @montoInit AND (salesLines.Quantity * salesLines.UnitPrice) * items.TaxRate/100  <= @montoEnd
		OR @montoInit = '' OR @montoEnd = '')
    ORDER BY InvoiceID ASC;
END;


EXEC BuscarClientesConFiltros  '',  '',  '';
EXEC BuscarProvedoresConFiltros  '',  '',  '';
EXEC BuscarStockItemsConFiltros '','', 1

EXEC BuscarVentas '' ,  '',  '', '2012-01-01', '2014-01-01', '200', '300';
EXEC BuscarVentas '' ,  '',  '', '', '', '', '';

--================================================================================
--ESTADISTICAS
--================================================================================

--Estadistica 1
IF OBJECT_ID('BuscarE1', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarE1;
END;
GO
CREATE PROCEDURE BuscarE1
    @miDato1 NVARCHAR(50),
    @miDato2 NVARCHAR(50)
AS
BEGIN


    SELECT 
            CASE
                WHEN GROUPING(supC.SupplierCategoryName) = 1 THEN concat('Total del provedor ',  sup.SupplierName)
                ELSE sup.SupplierName
            END AS provedor,

            CASE
                WHEN GROUPING(supC.SupplierCategoryName) = 1 THEN 'Total de categoria'
                ELSE supC.SupplierCategoryName
            END AS categoria, 

            MAX(purLines.ReceivedOuters * ExpectedUnitPricePerOuter) montoAlto, 
            MIN(purLines.ReceivedOuters * ExpectedUnitPricePerOuter) montoBajo, 
            AVG(purLines.ReceivedOuters * ExpectedUnitPricePerOuter) promedioVentas

                FROM [Purchasing].[PurchaseOrders] pur
                INNER JOIN [Purchasing].[PurchaseOrderLines] purLines ON pur.PurchaseOrderID = purLines.PurchaseOrderID
                INNER JOIN [Purchasing].[Suppliers] sup ON sup.SupplierID = pur.SupplierID
                INNER JOIN [Purchasing].[SupplierCategories] supC ON supC.SupplierCategoryID = sup.SupplierCategoryID

    WHERE sup.SupplierName LIKE '%' + @miDato1 + '%' AND supC.SupplierCategoryName LIKE '%' + @miDato2 + '%' 
    GROUP BY ROLLUP (sup.SupplierName, supC.SupplierCategoryName)
END;


EXEC BuscarE1 '','';

--Estadistica 2
IF OBJECT_ID('BuscarE2', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarE2;
END;
GO
CREATE PROCEDURE BuscarE2
    @miDato1 NVARCHAR(50),
    @miDato2 NVARCHAR(50)
AS
BEGIN

	SELECT  

		CASE
			WHEN GROUPING(cat.CustomerCategoryName) = 1 AND GROUPING(cus.CustomerName) = 1 THEN 'Total comprado por los clientes'
			WHEN GROUPING(cat.CustomerCategoryName) = 1 THEN concat('Total comprado por  ',  cus.CustomerName)
			ELSE cus.CustomerName
		END AS Nombrecliente,

		CASE
			WHEN GROUPING(cat.CustomerCategoryName) = 1 AND GROUPING(cus.CustomerName) = 1 THEN 'Total comprado por todas las categorias'
			WHEN GROUPING(cat.CustomerCategoryName) = 1 THEN 'Total de comprado de la categoria'
			ELSE cat.CustomerCategoryName
		END AS categoria, 

		MAX((facturaLines.Quantity * facturaLines.UnitPrice)*TaxRate/100  + facturaLines.Quantity * facturaLines.UnitPrice)  montoAlto, 
		MIN((facturaLines.Quantity * facturaLines.UnitPrice)*TaxRate/100  + facturaLines.Quantity * facturaLines.UnitPrice) montoBajo,
		AVG((facturaLines.Quantity * facturaLines.UnitPrice)*TaxRate/100  + facturaLines.Quantity * facturaLines.UnitPrice)  promedioCompras

				FROM [Sales].[Invoices] factura
				INNER JOIN  [Sales].[InvoiceLines] facturaLines ON factura.InvoiceID = facturaLines.InvoiceID
				INNER JOIN  [Sales].[Customers] cus ON cus.CustomerID = factura.CustomerID
				INNER JOIN [Sales].[CustomerCategories] cat ON cat.CustomerCategoryID = cus.CustomerCategoryID

	WHERE cus.CustomerName LIKE '%' + @miDato1 + '%' AND cat.CustomerCategoryName LIKE '%' + @miDato2 + '%' 
	GROUP BY ROLLUP (cus.CustomerName, cat.CustomerCategoryName)
END;

EXEC BuscarE2 '','';


--Estadistica 3

IF OBJECT_ID('BuscarE3', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarE3;
END;
GO
CREATE PROCEDURE BuscarE3
    @Anno NVARCHAR(50)
AS
BEGIN

    DECLARE @AnnoDate DATETIME

    SET @AnnoDate = CAST(@Anno + '-01-01' AS DATE);


    SELECT TOP 5    YEAR(sales.InvoiceDate) año, 
                    items.StockItemName producto, 
                    SUM((salesL.Quantity * salesL.UnitPrice) * salesL.TaxRate/100 + (salesL.Quantity * salesL.UnitPrice)) TotalVendido,
                    DENSE_RANK() OVER (PARTITION BY YEAR(sales.InvoiceDate) ORDER BY SUM((salesL.Quantity * salesL.UnitPrice) * salesL.TaxRate/100 + (salesL.Quantity * salesL.UnitPrice)) DESC) AS Ranking
                    FROM [Warehouse].[StockItems] items
                    INNER JOIN [Sales].[InvoiceLines] salesL ON salesL.StockItemID = items.StockItemID
                    INNER JOIN [Sales].[Invoices] sales ON sales.InvoiceID = salesL.InvoiceID

    WHERE YEAR(sales.InvoiceDate) = YEAR(@AnnoDate)
    GROUP BY YEAR(sales.InvoiceDate),  items.StockItemName 

END;

EXEC BuscarE3 '2015';


--Estadistica 4
IF OBJECT_ID('BuscarE4', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarE4;
END;
GO
CREATE PROCEDURE BuscarE4
	@AnnoI NVARCHAR(50),
	@AnnoE NVARCHAR(50)
AS
BEGIN

	DECLARE @AnnoIDate DATETIME
	DECLARE @AnnoEDate DATETIME

	SET @AnnoIDate = CAST(@AnnoI + '-01-01' AS DATE);
	SET @AnnoEDate = CAST(@AnnoE + '-01-01' AS DATE);

	

	SELECT TOP 5 YEAR(factura.InvoiceDate) año,
		CustomerName Nombre,
		count(*) cantidadFacturas,
		SUM((facturaLines.Quantity * facturaLines.UnitPrice) * facturaLines.TaxRate/100 + (facturaLines.Quantity * facturaLines.UnitPrice)) TotalComprado,
		DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS RankingFacturas
	

		FROM	[Sales].[Invoices] factura
		INNER JOIN [Sales].[Customers] cus ON cus.CustomerID = factura.CustomerID
		INNER JOIN [Sales].[InvoiceLines] facturaLines ON facturaLines.InvoiceID = factura.InvoiceID
	WHERE YEAR(factura.InvoiceDate) >= YEAR(@AnnoIDate) AND YEAR(factura.InvoiceDate) <= YEAR(@AnnoEDate)
	GROUP BY YEAR(factura.InvoiceDate), CustomerName

END;

EXEC BuscarE4 '2013', '2015';

--Estadistica 5
IF OBJECT_ID('BuscarE5', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarE5;
END;
GO
CREATE PROCEDURE BuscarE5
	@AnnoI NVARCHAR(50),
	@AnnoE NVARCHAR(50)
AS
BEGIN

	DECLARE @AnnoIDate DATETIME
	DECLARE @AnnoEDate DATETIME

	SET @AnnoIDate = CAST(@AnnoI + '-01-01' AS DATE);
	SET @AnnoEDate = CAST(@AnnoE + '-01-01' AS DATE);

	

	SELECT	TOP 5 YEAR(pur.orderDate) año, 
			SupplierName,
			COUNT(*) cantidadOrdenes,
			SUM(purLines.ReceivedOuters * purLines.ExpectedUnitPricePerOuter) monto,
			DENSE_RANK() OVER (ORDER BY COUNT(*) DESC) AS RankingFacturas

					FROM [Purchasing].[PurchaseOrders] pur
					INNER JOIN [Purchasing].[Suppliers] sup ON sup.SupplierID = pur.SupplierID
					INNER JOIN [Purchasing].[PurchaseOrderLines] purLines ON purLines.PurchaseOrderID = pur.PurchaseOrderID
	WHERE YEAR(pur.orderDate) >= YEAR(@AnnoIDate) AND YEAR(pur.orderDate) <= YEAR(@AnnoEDate)
	GROUP BY YEAR(pur.orderDate), SupplierName

END;

EXEC BuscarE5 '2013', '2015';