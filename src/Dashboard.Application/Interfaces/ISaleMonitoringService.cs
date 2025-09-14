namespace Dashboard.Application.Interfaces;

public interface ISaleMonitoringService
{
    Task NotifyIfSaleUpdatedAsync(DateTime from, DateTime to, CancellationToken cancellationToken);
}
