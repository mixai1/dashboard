import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DateRangePickerComponent } from '@shared/components/date-range-picker/date-range-picker.component';
import { PeriodOption, PeriodSelectComponent } from '@shared/components/period-select/period-select.component';
import { DEFAULT_MONTH_RANGE } from '@shared/constants/date-ranges.const';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    PeriodSelectComponent,
    DateRangePickerComponent
  ]
})
export class AppComponent {
  init  = DEFAULT_MONTH_RANGE;
reriod: PeriodOption[] = [
  {
    name: 'Today',
    value: {
      from: new Date(new Date().setHours(0, 0, 0, 0)),
      to: new Date(new Date().setHours(23, 59, 59, 999))
    }
  },
  {
    name: 'Yesterday',
    value: {
      from: new Date(new Date().setDate(new Date().getDate() - 1)),
      to: new Date(new Date().setDate(new Date().getDate() - 1))
    }
  },
  {
    name: 'Last 7 Days',
    value: {
      from: new Date(new Date().setDate(new Date().getDate() - 6)),
      to: new Date()
    }
  },
  {
    name: 'This Month',
    value: {
      from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59, 999)
    }
  },
  {
    name: 'Last Month',
    value: {
      from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      to: new Date(new Date().getFullYear(), new Date().getMonth(), 0, 23, 59, 59, 999)
    }
  }];

  show(vale: any): void {
    console.log(vale);
  }
}
