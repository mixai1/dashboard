using Dashboard.Domain.Entities;

namespace Dashboard.Infrastructure.Helpers;

public static class SeedSaleGenerator
{
    private static Random _rnd = new();
    public static IEnumerable<Sale> GenerateSale(int count = 100, int daysBack = 365)
    {
        var now = DateTime.UtcNow;
        return Enumerable
            .Range(0, count)
            .Select(x => new Sale
            {
                SaleDateTime = now.AddDays(-_rnd.Next(0, daysBack)).AddMinutes(_rnd.Next(0, 1440)),
                Amount = Math.Round((decimal)(_rnd.NextDouble() * 1000), 2)
            });
    }
}
