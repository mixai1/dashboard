using Dashboard.Application.DTOs;
using Dashboard.Application.Interfaces;
using Dashboard.Infrastructure.Data;
using Mapster;
using Microsoft.EntityFrameworkCore;

namespace Dashboard.Infrastructure.Repositories;

public class SaleRepository : ISaleRepository
{
    private readonly AppDbContext _dbContext;

    public SaleRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Task<bool> AnyByDateTimeRangeAsync(DateTime from, DateTime to, CancellationToken cancellationToken)
    {
        return _dbContext.Sales.Where(s => s.SaleDateTime >= from && s.SaleDateTime <= to).AnyAsync();
    }

    public Task<List<SaleModel>> GetByDateTimeRangeAsync(DateTime from, DateTime to, CancellationToken cancellationToken)
    {
        return _dbContext.Sales
            .Where(s => s.SaleDateTime >= from && s.SaleDateTime <= to)
            .OrderBy(s => s.SaleDateTime)
            .ProjectToType<SaleModel>()
            .ToListAsync(cancellationToken);
    }
}
