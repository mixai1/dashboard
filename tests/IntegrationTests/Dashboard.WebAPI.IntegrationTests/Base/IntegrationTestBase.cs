using Dashboard.Infrastructure.Data;
using Dashboard.WebAPI;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

[TestClass]
public abstract class IntegrationTestBase
{
    protected WebApplicationFactory<Program> Factory { get; private set; } = null!;
    protected HttpClient Client { get; private set; } = null!;

    [TestInitialize]
    public virtual void BaseSetup()
    {
        Factory = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.RemoveAll<DbContextOptions<AppDbContext>>();
                    services.RemoveAll<IDbContextFactory<AppDbContext>>();

                    string connectionString = GetConnectionString();
                    services.AddDbContext<AppDbContext>(options =>
                    {
                        options.UseSqlServer(connectionString);
                    });
                });
            });

        using (var scope = Factory.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.Database.EnsureDeleted();
            db.Database.EnsureCreated();
        }

        Client = Factory.CreateClient();
    }

    [TestCleanup]
    public void Cleanup()
    {
        Factory.Dispose();
    }

    private string GetConnectionString()
    {
        var contentRoot = AppContext.BaseDirectory;
        var configuration = new ConfigurationBuilder()
            .SetBasePath(contentRoot)
            .AddJsonFile("appsettings.integration.json", true)
            .Build();

        return configuration.GetConnectionString("IntegrationTestDb")!;
    }
}