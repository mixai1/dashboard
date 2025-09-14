using Dashboard.Application;
using Dashboard.Infrastructure;
using Dashboard.Realtime;
using Dashboard.Realtime.Hubs;
using Dashboard.WebAPI.Extensions;
using Dashboard.WebAPI.Hosted;

namespace Dashboard.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddInfrastructure(builder.Configuration.GetConnectionString("SaleDb")!);
            builder.Services.AddApplication();
            builder.Services.AddRealtime();

            builder.Services.AddHostedService<SalePollingWorker>();

            builder.Services.AddControllers();
            var app = builder.Build();

            app.UseBrowserSpa();
            app.MapControllers();
            app.MapHub<SaleHub>("/sale");
            app.Run();
        }
    }
}
