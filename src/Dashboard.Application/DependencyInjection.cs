using Dashboard.Application.Interfaces;
using Dashboard.Application.Mapping;
using Dashboard.Application.Services;
using Mapster;
using MapsterMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Dashboard.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        var config = TypeAdapterConfig.GlobalSettings
            .AddSaleMapping();

        return services
            .AddSingleton(config)
            .AddScoped<IMapper, ServiceMapper>()
            .AddScoped<ISaleService, SaleService>();
    }
}
