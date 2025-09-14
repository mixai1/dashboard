using Dashboard.Application.Interfaces;

namespace Dashboard.Application.Services;

public class SaleMonitoringService : ISaleMonitoringService
{
    private readonly ISaleRepository _saleRepository;
    private readonly ISaleNotifierService _saleNotifierService;

    public SaleMonitoringService(ISaleRepository saleRepository, ISaleNotifierService saleNotifierService)
    {
        _saleRepository = saleRepository;
        _saleNotifierService = saleNotifierService;
    }

    public async Task NotifyIfSaleUpdatedAsync(DateTime from, DateTime to, CancellationToken cancellationToken)
    {
        var hasSales = await _saleRepository.AnyByDateTimeRangeAsync(from, to, cancellationToken);
        if (hasSales)
        {
            await _saleNotifierService.NotifySaleUpdateAsunc(from, to, cancellationToken);
        }
    }
}
