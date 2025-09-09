using Dashboard.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Dashboard.Infrastructure.Extensions;

public static class DatabaseExtensions
{
    public static IServiceCollection AddApplicationDbContext<T>(this IServiceCollection services,  string connectionString) where T : DbContext
    {
        ArgumentNullException.ThrowIfNullOrWhiteSpace(nameof(connectionString));
        return services.AddDbContext<T>(options =>
            options.UseSqlServer(connectionString, option =>
            {
                option.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(10),
                    errorNumbersToAdd: null
                );
            })
            .UseSeeding((dbContext, _) =>
            {
                if (dbContext is AppDbContext appDbContext && !appDbContext.Sales.Any()) 
                {
                    appDbContext.Sales.AddRange([]);
                    appDbContext.SaveChanges();
                }
            })
        );
    }

    public static void ApplyMigrations<T>(this IServiceProvider provider) where T : DbContext
    {
        using var scope = provider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<T>();
        if (dbContext.Database.GetPendingMigrations().Any())
        {
            dbContext.Database.Migrate();
        }
    }
}
