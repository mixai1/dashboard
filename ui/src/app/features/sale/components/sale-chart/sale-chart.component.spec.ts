import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SaleChartComponent } from './sale-chart.component';

describe('Component: SaleChartComponent', () => {
  let component: SaleChartComponent;
  let fixture: ComponentFixture<SaleChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleChartComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(SaleChartComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('Property chartOptions:', () => {
    it('should initialize with default values', () => {
      const option = component.chartOptions as any;
      expect(option).toBeTruthy();
      expect(option.tooltip.trigger).toBe('axis');
      expect(option.legend.data).toEqual(['Sum', 'Sales']);
      expect(option.series.length).toBe(2);
    });
  });
});
