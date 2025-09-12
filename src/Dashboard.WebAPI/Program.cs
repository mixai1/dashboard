using Dashboard.Application;
using Dashboard.Infrastructure;
using Microsoft.Extensions.FileProviders;

namespace Dashboard.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddInfrastructure(builder.Configuration.GetConnectionString("SaleDb")!);
            builder.Services.AddApplication();

            builder.Services.AddControllers();
            var app = builder.Build();

            app.UseStaticFiles();

            app.MapControllers();
            var browserPath = Path.Combine(app.Environment.WebRootPath, "browser");
            app.MapFallbackToFile("index.html", new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(browserPath)
            });
            app.Run();
        }
    }
}
