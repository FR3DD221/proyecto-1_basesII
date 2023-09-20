
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


EXEC BuscarClientesConFiltros  '',  '',  '';
EXEC BuscarProvedoresConFiltros  '',  '',  '';
EXEC BuscarStockItemsConFiltros '','', 1