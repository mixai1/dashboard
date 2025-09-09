using Dashboard.Application.DTOs;

namespace Dashboard.Application.Interfaces;

public interface ISaleRepository
{
    Task<List<SaleModel>> GetByDateTimeRangeAsync(DateTime from, DateTime to, CancellationToken сancellationToken);
}
