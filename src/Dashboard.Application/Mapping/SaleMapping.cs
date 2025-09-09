using Dashboard.Application.DTOs;
using Dashboard.Domain.Entities;
using Mapster;

namespace Dashboard.Application.Mapping;

public static class SaleMapping
{
    public static TypeAdapterConfig AddSaleMapping(this TypeAdapterConfig config)
    {
        config.NewConfig<Sale, SaleModel>();
        return config;
    }
}
