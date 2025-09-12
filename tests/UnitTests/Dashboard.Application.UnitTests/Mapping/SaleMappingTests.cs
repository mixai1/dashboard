using Dashboard.Application.DTOs;
using Dashboard.Application.Mapping;
using Dashboard.Domain.Entities;
using Mapster;

namespace Dashboard.Application.UnitTests.Mapping;

[TestClass]
public class SaleMappingTests
{
    [TestMethod]
    public void AddSaleMapping_ShouldMapSaleToSaleModel()
    {
        var config = new TypeAdapterConfig().AddSaleMapping();
        var sale = new Sale
        {
            Id = 1,
            Amount = 200,
            SaleDateTime = DateTime.UtcNow
        };

        var model = sale.Adapt<SaleModel>(config);

        Assert.IsNotNull(model);
        Assert.AreEqual(sale.Amount, model.Amount);
        Assert.AreEqual(sale.SaleDateTime, model.SaleDateTime);
    }
}
