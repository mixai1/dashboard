using Dashboard.Application.DTOs;
using Dashboard.Application.Interfaces;

namespace Dashboard.Application.Services;

public class SaleService : ISaleService
{
    private readonly ISaleRepository _saleRepository;

    public SaleService(ISaleRepository saleRepository)
    {
        _saleRepository = saleRepository;
    }

    public Task<List<SaleModel>> GetByDateTimeRangeAsync(DateTime from, DateTime to, CancellationToken cancellationToken)
    {
        return _saleRepository.GetByDateTimeRangeAsync(from, to, cancellationToken);
    }
}
