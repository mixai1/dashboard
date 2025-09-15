using Dashboard.Application.Interfaces;
using Dashboard.Application.Services;
using Moq;

namespace Dashboard.Infrastructure.UnitTests.Services;

[TestClass]
public class SaleMonitoringServiceTests
{
    private Mock<ISaleRepository> _saleRepositoryMock = null!;
    private Mock<ISaleNotifierService> _saleNotifierServiceMock = null!;
    private SaleMonitoringService _service = null!;

    [TestInitialize]
    public void Setup()
    {
        _saleRepositoryMock = new Mock<ISaleRepository>();
        _saleNotifierServiceMock = new Mock<ISaleNotifierService>();

        _service = new SaleMonitoringService(
            _saleRepositoryMock.Object,
            _saleNotifierServiceMock.Object
        );
    }

    [TestMethod]
    public async Task NotifyIfSaleUpdatedAsync_Should_CallNotifier()
    {
        var now = DateTime.UtcNow;
        var from = now.AddDays(-1);
        var to = now;
        var token = CancellationToken.None;

        _saleRepositoryMock
            .Setup(r => r.AnyByDateTimeRangeAsync(from, to, token))
            .ReturnsAsync(true);

        await _service.NotifyIfSaleUpdatedAsync(from, to, token);

        _saleNotifierServiceMock.Verify(
            n => n.NotifySaleUpdateAsunc(from, to, token),
            Times.Once
        );
    }

    [TestMethod]
    public async Task NotifyIfSaleUpdatedAsync_Should_NotCallNotifier()
    {
        var now = DateTime.UtcNow;
        var from = now.AddDays(-1);
        var to = now;
        var token = CancellationToken.None;

        _saleRepositoryMock
            .Setup(r => r.AnyByDateTimeRangeAsync(from, to, token))
            .ReturnsAsync(false);

        await _service.NotifyIfSaleUpdatedAsync(from, to, token);

        _saleNotifierServiceMock.Verify(
            n => n.NotifySaleUpdateAsunc(It.IsAny<DateTime>(), It.IsAny<DateTime>(), It.IsAny<CancellationToken>()),
            Times.Never
        );
    }
}
