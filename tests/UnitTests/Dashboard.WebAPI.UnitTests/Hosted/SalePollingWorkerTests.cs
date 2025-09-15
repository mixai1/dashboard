using Dashboard.Application.Interfaces;
using Dashboard.WebAPI.Hosted;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace Dashboard.Tests.WebAPI.Hosted;

[TestClass]
public class SalePollingWorkerTests
{
    [TestMethod]
    public async Task ExecuteAsync_Should_CallNotifyIfSaleUpdatedAsync()
    {
        var saleMonitoringServiceMock = new Mock<ISaleMonitoringService>();

        var serviceProviderMock = new Mock<IServiceProvider>();
        serviceProviderMock
            .Setup(sp => sp.GetService(typeof(ISaleMonitoringService)))
            .Returns(saleMonitoringServiceMock.Object);

        var scopeMock = new Mock<IServiceScope>();
        scopeMock.Setup(s => s.ServiceProvider).Returns(serviceProviderMock.Object);

        var scopeFactoryMock = new Mock<IServiceScopeFactory>();
        scopeFactoryMock
            .Setup(sf => sf.CreateScope())
            .Returns(scopeMock.Object);

        var worker = new SalePollingWorker(scopeFactoryMock.Object);

        using var cts = new CancellationTokenSource();
        cts.CancelAfter(TimeSpan.FromMilliseconds(101));

        await worker.StartAsync(cts.Token);

        saleMonitoringServiceMock.Verify(
            s => s.NotifyIfSaleUpdatedAsync(
                It.IsAny<DateTime>(),
                It.IsAny<DateTime>(),
                It.IsAny<CancellationToken>()),
            Times.AtLeastOnce
        );
    }
}
