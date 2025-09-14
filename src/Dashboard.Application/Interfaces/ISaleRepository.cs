using Dashboard.Application.DTOs;

namespace Dashboard.Application.Interfaces;

public interface ISaleRepository
{
    Task<List<SaleModel>> GetByDateTimeRangeAsync(DateTime from, DateTime to, CancellationToken сancellationToken);
    Task<bool> AnyByDateTimeRangeAsync(DateTime from, DateTime to, CancellationToken cancellationToken);
}
