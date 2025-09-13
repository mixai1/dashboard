import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngxs/store';
import { DashboardComponent } from './dashboard.component';
import { DateTimeRange } from '@models/date-time-range.model';
import { SetDateTimeRange } from '../../store/dashboard-filter.actions';
import { GetSales } from 'src/app/features/sale/store/sale.actions';

describe('Component:  DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(() => {
    initSpies();

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: Store, useValue: storeMock }],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Method onDateRangeChange:', () => {
    it('should dispatch SetDateTimeRange and GetSales actions', () => {
      const mockRange: DateTimeRange = { from: new Date(), to: new Date() };

      component.onDateRangeChange(mockRange);

      expect(storeMock.dispatch).toHaveBeenCalledWith([
        new SetDateTimeRange(mockRange),
        new GetSales(mockRange),
      ]);
    });
  });

  function initSpies(): void {
    storeMock = jasmine.createSpyObj<Store>('Store', ['select', 'dispatch']);
    storeMock.select.and.returnValue(of());
  }
});
