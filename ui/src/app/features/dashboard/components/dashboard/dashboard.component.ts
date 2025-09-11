import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { DateTimeRange } from '@models/date-time-range.model';
import { ChartModel } from '@models/chart.model';

import { DashboardFilterState } from '../../store/dashboard-filter.state';
import { SaleState } from 'src/app/features/sale/store/sale.state';
import { SetDateTimeRange } from '../../store/dashboard-filter.actions';
import { SaleQuery } from 'src/app/features/sale/store/sale.query';
import { GetSales } from 'src/app/features/sale/store/sale.actions';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly store = inject(Store);

  dateTimeRange$: Observable<DateTimeRange> = this.store.select(DashboardFilterState.dateTimeRange);
  charModels$: Observable<ChartModel> = this.store.select(SaleQuery.mapChartModel);
  loading$: Observable<boolean> = this.store.select(SaleState.loading);

  onDateRangeChange(dateTimeRange: DateTimeRange): void {
    this.store.dispatch([new SetDateTimeRange(dateTimeRange), new GetSales(dateTimeRange)]);
  }
}
