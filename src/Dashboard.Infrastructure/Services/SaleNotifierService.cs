using Dashboard.Application.Interfaces;
using Dashboard.Realtime.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace Dashboard.Infrastructure.Services;

public class SaleNotifierService : ISaleNotifierService
{
    private readonly IHubContext<SaleHub> _hubContext;

    public SaleNotifierService(IHubContext<SaleHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public Task NotifySaleUpdateAsunc(DateTime from, DateTime to, CancellationToken cancellationToken)
    {
        return _hubContext.Clients.All.SendAsync("SaleUpdated", new { from, to }, cancellationToken);
    }
}
