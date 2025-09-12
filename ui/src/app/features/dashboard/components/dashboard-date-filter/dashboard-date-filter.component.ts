import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PeriodOption } from '@shared/components/period-select/period-select.component';
import { DEFAULT_PERIODS } from '@shared/constants/date-ranges.const';
import { DateTimeRange } from '@models/date-time-range.model';

@Component({
  selector: 'app-dashboard-date-filter',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-date-filter.component.html',
  styleUrl: './dashboard-date-filter.component.scss',
})
export class DashboardDateFilterComponent {
  @Input({ required: true }) dateTimeRange!: DateTimeRange;

  @Output() rangeSelected = new EventEmitter<DateTimeRange>();

  readonly periods: PeriodOption[] = Object.values(DEFAULT_PERIODS);

  onRangeSelected(range: DateTimeRange): void {
    this.rangeSelected.emit(range);
  }
}
