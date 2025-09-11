import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartModel } from '@models/chart.model';
import * as echarts from 'echarts';

@Component({
  selector: 'app-sale-chart',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sale-chart.component.html',
  styleUrl: './sale-chart.component.scss',
})
export class SaleChartComponent implements OnInit {
  @ViewChild('saleChart', { static: true }) chartContainer!: ElementRef<HTMLDivElement>;

  @Input({ required: true })
  set chartData(chartData: ChartModel) {
    this.chart?.setOption({
      xAxis: { data: chartData.times },
      series: [
        { name: 'Sum', data: chartData.amounts },
        { name: 'Sales', data: chartData.counts },
      ],
    });
  }

  @Input() chartOptions: echarts.EChartsCoreOption = this.getDefaultOptions();

  private chart!: echarts.ECharts;

  ngOnInit(): void {
    this.chart = echarts.init(this.chartContainer.nativeElement);
    this.chart.setOption(this.chartOptions);
  }

  private getDefaultOptions(): echarts.EChartsCoreOption {
    return {
      tooltip: { trigger: 'axis' },
      legend: { top: 10, left: 'center', data: ['Sum', 'Sales'] },
      xAxis: { type: 'category', data: [] },
      yAxis: [
        { type: 'value', name: 'Sum', position: 'left' },
        { type: 'value', name: 'Sales', position: 'right' },
      ],
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: 0,
          start: 0,
          end: 100,
          height: 30,
          bottom: 10,
        },
      ],
      series: [
        {
          name: 'Sum',
          type: 'line',
          smooth: true,
          yAxisIndex: 0,
          showSymbol: true,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: '#1334eeff' },
          lineStyle: { color: '#d8b415ff' },
          data: [],
        },
        {
          name: 'Sales',
          type: 'bar',
          yAxisIndex: 1,
          itemStyle: { color: '#1287fcff', opacity: 0.3 },
          data: [],
        },
      ],
    };
  }
}
