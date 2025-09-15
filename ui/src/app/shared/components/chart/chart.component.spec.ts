import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ElementRef } from '@angular/core';
import * as echarts from 'echarts';

describe('Component: ChartComponent', () => {
  let fixture: ComponentFixture<ChartComponent>;
  let component: ChartComponent;
  let spyChart: jasmine.SpyObj<echarts.ECharts>;

  beforeEach(() => {
    initSpy();

    TestBed.configureTestingModule({
      imports: [ChartComponent],
    });

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;

    component.chartContainer = new ElementRef(document.createElement('div'));
    component.chartOptions = { title: { text: 'Test Chart' } };
  });

  it('chartData setter should call setOption on chart when chartData is set', () => {
    component['chart'] = spyChart;
    const data = { series: [{ data: [1, 2, 3] }] };

    component.chartData = data;

    expect(spyChart.setOption).toHaveBeenCalledWith(data);
  });

  it('onResetZoom should dispatch dataZoom action', () => {
    component['chart'] = spyChart;

    component.onResetZoom();

    expect(spyChart.dispatchAction).toHaveBeenCalledWith({
      type: 'dataZoom',
      start: 0,
      end: 100,
    });
  });

  it('ngOnDestroy should dispose chart if initialized', () => {
    component['chart'] = spyChart;

    component.ngOnDestroy();

    expect(spyChart.dispose).toHaveBeenCalled();
  });

  function initSpy() {
    spyChart = jasmine.createSpyObj<echarts.ECharts>('ECharts', [
      'setOption',
      'dispatchAction',
      'dispose',
    ]);
  }
});
