import { Injectable } from '@angular/core';
import { DateTimeRange } from '@models/date-time-range.model';
import { SaleModel } from '@models/sale.model';
import { ApiService } from '@shared/utils/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class SaleApiService extends ApiService {
  protected override endpoint = 'sale';

  getSalesByDateTimeRange(dateRange: DateTimeRange): Observable<SaleModel[]> {
    return this.httpGet(
      `${dateRange.from.toISOString()}/${dateRange.to.toISOString()}`,
      (x: Partial<SaleModel>) => new SaleModel(x)
    );
  }
}
