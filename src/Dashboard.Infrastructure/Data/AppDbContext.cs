using Dashboard.Domain.Entities;
using Dashboard.Infrastructure.Data.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Dashboard.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options) : base(options)
    {
        ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }

    public AppDbContext() { }

    public DbSet<Sale> Sales { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new SaleConfiguration());
    }
}
