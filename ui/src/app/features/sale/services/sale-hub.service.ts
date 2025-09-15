import { Injectable } from '@angular/core';
import { DateTimeRange } from '@models/date-time-range.model';
import { BaseHubService } from '@shared/services/base-hub.service';
import { Observable, shareReplay } from 'rxjs';

interface SaleHubEvent {
  saleUpdated: DateTimeRange;
}

@Injectable()
export class SaleHubService extends BaseHubService<SaleHubEvent> {
  private saleUpdated$!: Observable<DateTimeRange>;
  protected override hubUrl = 'sale';

  override connect(): void {
    super.connect();

    this.saleUpdated$ = this.on('saleUpdated').pipe(shareReplay(1));
  }

  getSaleDateRangeUpdated(): Observable<DateTimeRange> {
    return this.saleUpdated$;
  }
}
