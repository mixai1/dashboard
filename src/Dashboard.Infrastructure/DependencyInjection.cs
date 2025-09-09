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
}
