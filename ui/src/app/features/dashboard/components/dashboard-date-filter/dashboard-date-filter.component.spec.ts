import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DashboardDateFilterComponent } from './dashboard-date-filter.component';
import { DateTimeRange } from '@models/date-time-range.model';

describe('Component: DashboardDateFilterComponent', () => {
  let component: DashboardDateFilterComponent;
  let fixture: ComponentFixture<DashboardDateFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardDateFilterComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(DashboardDateFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should emit rangeSelected when onRangeSelected is called', () => {
    const mockRange: DateTimeRange = { from: new Date(), to: new Date() };
    spyOn(component.rangeSelected, 'emit');

    component.onRangeSelected(mockRange);

    expect(component.rangeSelected.emit).toHaveBeenCalledWith(mockRange);
  });
});
