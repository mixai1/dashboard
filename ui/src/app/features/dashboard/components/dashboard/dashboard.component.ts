import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { DateTimeRange } from '@models/date-time-range.model';
import { ChartModel } from '@models/chart.model';

import { DashboardFilterState } from '../../store/dashboard-filter.state';
import { SetDateTimeRange } from '../../store/dashboard-filter.actions';
import { GetSales } from 'src/app/features/sale/store/sale.actions';
import { SaleState } from 'src/app/features/sale/store/sale.state';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private readonly store = inject(Store);

  readonly dateTimeRange$: Observable<DateTimeRange> = this.store.select(DashboardFilterState.dateTimeRange);
  readonly charData$: Observable<ChartModel> = this.store.select(SaleState.mapChartModel);

  onDateRangeChange(dateTimeRange: DateTimeRange): void {
    this.store.dispatch([new SetDateTimeRange(dateTimeRange), new GetSales(dateTimeRange)]);
  }
}
