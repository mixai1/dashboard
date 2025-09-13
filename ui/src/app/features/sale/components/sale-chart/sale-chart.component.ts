import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ChartModel } from '@models/chart.model';
import * as echarts from 'echarts';

@Component({
  selector: 'app-sale-chart',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sale-chart.component.html',
})
export class SaleChartComponent {
  @Input({
    required: true,
    transform: (value: ChartModel) => {
      return {
        xAxis: { data: value.times },
        series: [
          { data: value.amounts },
          { data: value.counts },
        ],
      };
    },
  })
  chartData!: ChartModel;

  readonly chartOptions: echarts.EChartsCoreOption = this.getDefaultOptions();

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
