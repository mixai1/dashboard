using Dashboard.Application.DTOs;
using System.Net;
using System.Net.Http.Json;

namespace Dashboard.WebAPI.IntegrationTests.Controllers;

[TestClass]
public class SaleControllerTests : IntegrationTestBase
{
    [TestMethod]
    public async Task GetByDateTimeRange_OK()
    {
        var now = DateTime.Now;
        var from = now.AddDays(-100).ToString("O");
        var to = now.ToString("O");

        var response = await Client.GetAsync($"/api/sale/{from}/{to}");
        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        var sales = await response.Content.ReadFromJsonAsync<List<SaleModel>>();

        Assert.IsNotNull(sales);
        Assert.IsTrue(sales.Count > 0);
    }

    [TestMethod]
    public async Task GetByDateTimeRange_Empty()
    {
        var now = DateTime.Now;
        var from = now.AddDays(1).ToString("O");
        var to = now.ToString("O");

        var response = await Client.GetAsync($"/api/sale/{from}/{to}");

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        var sales = await response.Content.ReadFromJsonAsync<List<SaleModel>>();

        Assert.IsNotNull(sales);
        Assert.IsTrue(sales.Count == 0);
    }
}
     