using Dashboard.Application.DTOs;
using Dashboard.Application.Interfaces;
using Dashboard.WebAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace Dashboard.WebAPI.UnitTests.Controllers;

[TestClass]
public class SaleControllerTests
{
    private Mock<ISaleService> _saleServiceMock = null!;
    private SaleController _controller = null!;

    [TestInitialize]
    public void Setup()
    {
        _saleServiceMock = new Mock<ISaleService>();
        _controller = new SaleController(_saleServiceMock.Object);
    }

    [TestMethod]
    public async Task GetByDateTimeRange_Ok()
    {
        var now = DateTime.UtcNow;
        var from = now.AddDays(-1);
        var to = now;
        List<SaleModel> data = new() { new SaleModel { Amount = 100, SaleDateTime = now } };

        _saleServiceMock
            .Setup(s => s.GetByDateTimeRangeAsync(from, to, It.IsAny<CancellationToken>()))
            .ReturnsAsync(data);

        var result = await _controller.GetByDateTimeRange(from, to, CancellationToken.None);

        var okResult = result as OkObjectResult;
        Assert.IsNotNull(okResult);
        Assert.AreEqual(data, okResult.Value);
        Assert.IsInstanceOfType(okResult.Value, typeof(List<SaleModel>));
        var actual = (List<SaleModel>)okResult.Value;
        Assert.AreEqual(data.First().Amount, actual.First().Amount);

        _saleServiceMock.Verify(s => s.GetByDateTimeRangeAsync(from, to, It.IsAny<CancellationToken>()), Times.Once);
    }
}
