using Dashboard.Application;
using Dashboard.Infrastructure;

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

            // Configure the HTTP request pipeline.
            app.MapControllers();
            app.Run();
        }
    }
}
