import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit, OnDestroy {
  @ViewChild('saleChart', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  @Input({ required: true })
  set chartData(chartData: any) {
    this.chart?.setOption(chartData);
  }

  @Input({ required: true }) chartOptions!: echarts.EChartsCoreOption;

  private chart!: echarts.ECharts;

  onResetZoom(): void {
    this.chart?.dispatchAction({ type: 'dataZoom', start: 0, end: 100 });
  }

  ngOnInit(): void {
    this.chart = echarts.init(this.chartContainer.nativeElement);
    this.chart.setOption(this.chartOptions);
  }

  ngOnDestroy(): void {
    this.chart?.dispose();
  }
}
