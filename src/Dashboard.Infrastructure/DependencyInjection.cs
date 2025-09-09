using Dashboard.Application.Interfaces;
using Dashboard.Domain.Entities;
using Dashboard.Infrastructure.Data;
using Dashboard.Infrastructure.Extensions;
using Dashboard.Infrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace Dashboard.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddApplicationDbContext<AppDbContext>(connectionString);

        services.AddScoped<ISaleRepository, SaleRepository>();

        using var provider = services.BuildServiceProvider();
        provider.ApplyMigrations<AppDbContext>();

        return services;
    }

    public static void SeedAsync(AppDbContext context)
    {
        if (!context.Sales.Any())
        {
            context.Sales.AddRange(
                new Sale { SaleDateTime = DateTime.UtcNow.AddDays(-2), Amount = 100.50m },
                new Sale { SaleDateTime = DateTime.UtcNow.AddDays(-1), Amount = 250.00m },
                new Sale { SaleDateTime = DateTime.UtcNow, Amount = 20.00m },
                new Sale { SaleDateTime = DateTime.UtcNow.AddDays(-1).AddMinutes(-2), Amount = 240.00m },
                new Sale { SaleDateTime = DateTime.UtcNow.AddDays(-3), Amount = 250.00m },
                new Sale { SaleDateTime = DateTime.UtcNow, Amount = 75.25m }
            );

            context.SaveChanges();
        }
    }
}
