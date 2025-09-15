import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, Observable, withLatestFrom } from 'rxjs';

import { DateTimeRange } from '@models/date-time-range.model';
import { ChartModel } from '@models/chart.model';
import { AutoUnsubscribeComponent } from '@shared/utils/auto-unsubscribe.component';

import { DashboardFilterState } from '../../store/dashboard-filter.state';
import { SetDateTimeRange } from '../../store/dashboard-filter.actions';
import { GetSales } from 'src/app/features/sale/store/sale.actions';
import { SaleState } from 'src/app/features/sale/store/sale.state';
import { SaleHubService } from 'src/app/features/sale/services/sale-hub.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends AutoUnsubscribeComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly hub = inject(SaleHubService);

  readonly dateTimeRange$: Observable<DateTimeRange> = this.store.select(
    DashboardFilterState.dateTimeRange
  );

  readonly charData$: Observable<ChartModel> = this.store.select(SaleState.mapChartModel);

  ngOnInit(): void {
    this.hub.connect();

    this.hub
      .getSeleUpdated()
      .pipe(
        withLatestFrom(this.dateTimeRange$),
        filter(([updated, selected]) => {
          return (
            new Date(updated.to) >= new Date(selected.from) &&
            new Date(updated.from) <= new Date(selected.to)
          );
        }),
        this.autoDestroy()
      )
      .subscribe(([_, selected]) => this.updateDashboard(selected));
  }

  onDateRangeChange(dateTimeRange: DateTimeRange): void {
    this.updateDashboard(dateTimeRange);
  }

  private updateDashboard(dateTimeRange: DateTimeRange): void {
    this.store.dispatch([new SetDateTimeRange(dateTimeRange), new GetSales(dateTimeRange)]);
  }
}
