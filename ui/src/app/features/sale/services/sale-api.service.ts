import { Injectable } from "@angular/core";
import { DateTimeRange } from "@models/date-time-range.model";
import { SaleModel } from "@models/sale.model";
import { ApiService } from "@shared/utils/api.service";

@Injectable()
export class SaleApiService extends ApiService {
  protected override endpoint = 'sale';

  getSalesByDateTimeRange(dateRange: DateTimeRange) {
    return this.httpGet(`${dateRange.from.toISOString()}/${dateRange.to.toISOString()}`, (x: SaleModel) => new SaleModel(x));
  }
}