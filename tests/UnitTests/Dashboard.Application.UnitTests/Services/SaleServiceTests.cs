using Dashboard.Application.DTOs;
using Dashboard.Application.Interfaces;
using Dashboard.Application.Services;
using Moq;

namespace Dashboard.Application.UnitTests.Services;

[TestClass]
public class SaleServiceTests
{
    private Mock<ISaleRepository> _repoMock = null!;
    private SaleService _service = null!;

    [TestInitialize]
    public void Setup()
    {
        _repoMock = new Mock<ISaleRepository>();
        _service = new SaleService(_repoMock.Object);
    }

    [TestMethod]
    public async Task GetByDateTimeRangeAsync_ShouldReturnData()
    {
        var now = DateTime.UtcNow;
        var from = now.AddDays(-1);
        var to = now;
        List<SaleModel> expected = new() { new() { Amount = 100, SaleDateTime = now.AddHours(-5) } };

        _repoMock.Setup(r => r.GetByDateTimeRangeAsync(from, to, It.IsAny<CancellationToken>()))
                 .ReturnsAsync(expected);

        var result = await _service.GetByDateTimeRangeAsync(from, to, CancellationToken.None);

        Assert.AreEqual(1, result.Count);
        Assert.AreEqual(100, result[0].Amount);
    }
}
