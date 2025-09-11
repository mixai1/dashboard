import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartModel } from '@models/chart.model';

@Component({
  selector: 'app-sale-chart',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sale-chart.component.html',
})
export class SaleChartComponent {
  @Input({ required: true }) chartItem!: ChartModel;
}