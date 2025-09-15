using Dashboard.Domain.Entities;
using Dashboard.Infrastructure.Data;
using Dashboard.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Dashboard.Infrastructure.UnitTests.Repositories;

[TestClass]
public class SaleRepositoryTests
{
    private AppDbContext _context = null!;
    private SaleRepository _repository = null!;
    private readonly DateTime _now = DateTime.UtcNow;

    [TestInitialize]
    public void Setup()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);
        _repository = new SaleRepository(_context);

        SeedData();
    }

    private void SeedData()
    {
        _context.Sales.AddRange(
            new Sale { Id = 1, Amount = 100, SaleDateTime = _now.AddDays(-3) },
            new Sale { Id = 2, Amount = 200, SaleDateTime = _now.AddDays(-1) },
            new Sale { Id = 3, Amount = 300, SaleDateTime = _now }
        );
        _context.SaveChanges();
    }

    [TestMethod]
    public async Task AnyByDateTimeRangeAsync_ShouldReturnTrue()
    {
        var from = _now.AddDays(-2);
        var to = _now;

        var result = await _repository.AnyByDateTimeRangeAsync(from, to, CancellationToken.None);

        Assert.IsTrue(result);
    }

    [TestMethod]
    public async Task AnyByDateTimeRangeAsync_ShouldReturnFalse()
    {
        var from = _now.AddDays(-5);
        var to = _now.AddDays(-4);

        var result = await _repository.AnyByDateTimeRangeAsync(from, to, CancellationToken.None);

        Assert.IsFalse(result);
    }

    [TestMethod]
    public async Task GetByDateTimeRangeAsync_ShouldReturnData()
    {
        var from = _now.AddDays(-2);
        var to = _now;

        var result = await _repository.GetByDateTimeRangeAsync(from, to, CancellationToken.None);

        Assert.AreEqual(2, result.Count);
        Assert.IsTrue(result.First().SaleDateTime <= result.Last().SaleDateTime);
    }

    [TestMethod]
    public async Task GetByDateTimeRangeAsync_ShouldReturnEmpty()
    {
        var from = _now.AddDays(-5);
        var to = _now.AddDays(-4);

        var result = await _repository.GetByDateTimeRangeAsync(from, to, CancellationToken.None);

        Assert.AreEqual(0, result.Count);
    }
}
