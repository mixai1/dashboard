using Dashboard.Domain.Entities;

namespace Dashboard.Infrastructure.Helpers;

public static class SeedSaleGenerator
{
    private static Random _rnd = new();
    public static IEnumerable<Sale> GenerateSale(int count = 1000, int daysBack = 365)
    {
        var now = DateTime.UtcNow;
        return Enumerable
            .Range(0, count)
            .Select(x => new Sale
            {
                SaleDateTime = now.AddDays(-_rnd.Next(0, daysBack)),
                Amount = Math.Round((decimal)(_rnd.NextDouble() * _rnd.Next(10, 10000)), 2)
            });
    }
}
