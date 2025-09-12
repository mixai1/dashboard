using Dashboard.Domain.Entities;
using Dashboard.Infrastructure.Data;
using Dashboard.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Dashboard.Infrastructure.UnitTests.Repositories;

[TestClass]
public class SaleRepositoryTests
{
    private AppDbContext _context = null!;
    private SaleRepository _repo = null!;

    [TestInitialize]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _repo = new SaleRepository(_context);

        SeedData();
    }

    private void SeedData()
    {
        _context.Sales.AddRange(
            new Sale { Id = 1, Amount = 100, SaleDateTime = DateTime.UtcNow.AddDays(-3) },
            new Sale { Id = 2, Amount = 200, SaleDateTime = DateTime.UtcNow.AddDays(-1) },
            new Sale { Id = 3, Amount = 300, SaleDateTime = DateTime.UtcNow }
        );
        _context.SaveChanges();
    }

    [TestMethod]
    public async Task GetByDateTimeRangeAsync_ShouldReturnData()
    {
        var now = DateTime.UtcNow;
        var from = now.AddDays(-2);
        var to = now;

        var result = await _repo.GetByDateTimeRangeAsync(from, to, CancellationToken.None);

        Assert.AreEqual(2, result.Count);
        Assert.IsTrue(result.First().SaleDateTime <= result.Last().SaleDateTime);
    }
}
