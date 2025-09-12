using Dashboard.Application;
using Dashboard.Infrastructure;
using Dashboard.WebAPI.Extensions;

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

            app.UseBrowserSpa();
            app.MapControllers();
            app.Run();
        }
    }
}
