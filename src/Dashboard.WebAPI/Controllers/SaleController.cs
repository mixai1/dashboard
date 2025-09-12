using Dashboard.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Dashboard.WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SaleController : ControllerBase
{
    private readonly ISaleService _saleService;

    public SaleController(ISaleService saleService)
    {
        _saleService = saleService;
    }
     
    [HttpGet("{from}/{to}")]
    public async Task<IActionResult> GetByDateTimeRange(DateTime from, DateTime to, CancellationToken cancellationToken)
    {
        return Ok(await _saleService.GetByDateTimeRangeAsync(from, to, cancellationToken));
    }
}
