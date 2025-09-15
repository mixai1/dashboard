import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, Observable, withLatestFrom } from 'rxjs';

import { DateTimeRange } from '@models/date-time-range.model';
import { ChartModel } from '@models/chart.model';
import { AutoUnsubscribeComponent } from '@shared/utils/auto-unsubscribe.component';

import { DashboardFilterState } from '../../store/dashboard-filter.state';
import { SetDateTimeRange } from '../../store/dashboard-filter.actions';
import { FilterSales, LoadSales } from 'src/app/features/sale/store/sale.actions';
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
      .getSaleDateRangeUpdated()
      .pipe(
        withLatestFrom(this.dateTimeRange$),
        filter(([updated, selected]) => this.isDateRangeWithin(updated, selected)),
        this.autoDestroy()
      )
      .subscribe(([_, selected]) =>
        this.store.dispatch([new SetDateTimeRange(selected), new LoadSales(selected)])
      );
  }

  onDateRangeChange(dateTimeRange: DateTimeRange): void {
    const currentRange = this.store.selectSnapshot(DashboardFilterState.dateTimeRange);
    const actions = [new SetDateTimeRange(dateTimeRange)];
    const isIncludes = this.isDateRangeWithin(dateTimeRange, currentRange);
    isIncludes
      ? actions.push(new FilterSales(dateTimeRange))
      : actions.push(new LoadSales(dateTimeRange));
    this.store.dispatch(actions);
  }

  private isDateRangeWithin(updated: DateTimeRange, selected: DateTimeRange): boolean {
    return (
      updated &&
      selected &&
      new Date(updated.from) >= new Date(selected.from) &&
      new Date(updated.to) <= new Date(selected.to)
    );
  }
}
