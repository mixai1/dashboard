using Dashboard.Application.DTOs;

namespace Dashboard.Application.Interfaces;

public interface ISaleService
{
    Task<List<SaleModel>> GetByDateTimeRangeAsync(DateTime from, DateTime to, CancellationToken cancellationToken);
}
