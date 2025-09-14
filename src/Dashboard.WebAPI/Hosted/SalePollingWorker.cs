using Dashboard.Application.Interfaces;

namespace Dashboard.WebAPI.Hosted;

public class SalePollingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private DateTime _lastCheck = DateTime.UtcNow;
    private readonly TimeSpan _intervalCheck = TimeSpan.FromMinutes(10);

    public SalePollingWorker(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken cancellationToken)
    {
        while (!cancellationToken.IsCancellationRequested)
        {
            try
            {
                var current = DateTime.UtcNow;
                using var scope = _scopeFactory.CreateScope();
                var saleMonitoringService = scope.ServiceProvider
                    .GetRequiredService<ISaleMonitoringService>();

                await saleMonitoringService.NotifyIfSaleUpdatedAsync(_lastCheck, current, cancellationToken);
                _lastCheck = current;
                await Task.Delay(_intervalCheck, cancellationToken);
            }
            catch (Exception)
            {

            }
        }
    }
}