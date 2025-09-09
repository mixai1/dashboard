namespace Dashboard.Domain.Entities;

public class Sale
{
    public int Id { get; set; }
    public DateTime SaleDateTime { get; set; }
    public decimal Amount { get; set; }
}
