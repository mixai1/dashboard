namespace Dashboard.Application.Interfaces;

public interface ISaleNotifierService
{
    Task NotifySaleUpdateAsunc(DateTime from, DateTime to, CancellationToken cancellationToken);
}
