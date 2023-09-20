




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

	SELECT * FROM Sales.Customers cus 
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
    SELECT * FROM Sales.Customers cus 
    INNER JOIN Sales.CustomerCategories cat ON cus.CustomerCategoryID = cat.CustomerCategoryID
    INNER JOIN [Application].[DeliveryMethods] del ON del.DeliveryMethodId = cus.DeliveryMethodID
    WHERE CustomerName LIKE '%' + @miDato1 + '%' AND CustomerCategoryName LIKE '%' + @miDato2 + '%' AND DeliveryMethodName LIKE '%' + @miDato3 + '%' 
    ORDER BY CustomerName ASC;
END;

--Buscar items en stock??=======================================================================================

IF OBJECT_ID('BuscarStockItemsConFiltros', 'P') IS NOT NULL
BEGIN
    DROP PROCEDURE BuscarStockItemsConFiltros;
END;
GO
CREATE PROCEDURE BuscarStockItemsConFiltros
    @miDato1 NVARCHAR(50),
    @miDato2 NVARCHAR(50)
AS
BEGIN
    SELECT * FROM [Warehouse].[StockItems] items 
    INNER JOIN [Warehouse].[StockItemStockGroups] itg ON items.StockItemID = itg.StockItemID
    INNER JOIN [Warehouse].[StockGroups] groups ON groups.StockGroupID = itg.StockGroupID
    WHERE StockItemName LIKE '%' + @miDato1 + '%' AND StockGroupName LIKE '%' + @miDato2 + '%' 
    ORDER BY StockItemName ASC;
END;


EXEC BuscarClientesConFiltros  '',  '',  '';
EXEC BuscarProvedoresConFiltros  '',  '',  '';
EXEC BuscarStockItemsConFiltros '','';