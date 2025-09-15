import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { DashboardComponent } from './dashboard.component';
import { Store } from '@ngxs/store';
import { SaleHubService } from 'src/app/features/sale/services/sale-hub.service';
import { DateTimeRange } from '@models/date-time-range.model';
import { SetDateTimeRange } from '../../store/dashboard-filter.actions';
import { GetSales } from 'src/app/features/sale/store/sale.actions';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let storeSpy: jasmine.SpyObj<Store>;
  let hubSpy: jasmine.SpyObj<SaleHubService>;
  let saleUpdated$ = new Subject<DateTimeRange>();

  const mockRange: DateTimeRange = {
    from: new Date('2025-09-14T10:00:00Z'),
    to: new Date('2025-09-14T12:00:00Z'),
  };

  beforeEach(() => {
    initSpy();

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: SaleHubService, useValue: hubSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should call connect on init', () => {
    component.ngOnInit();

    expect(hubSpy.connect).toHaveBeenCalled();
  });

  it('should dispatch actions when saleUpdated is within range', () => {
    const updatedInRange: DateTimeRange = {
      from: new Date('2025-09-14T11:00:00Z'),
      to: new Date('2025-09-14T11:30:00Z'),
    };

    component.ngOnInit();

    saleUpdated$.next(updatedInRange);

    expect(storeSpy.dispatch).toHaveBeenCalledWith([
      new SetDateTimeRange(mockRange),
      new GetSales(mockRange),
    ]);
  });

  it('should not dispatch actions when saleUpdated is outside range', () => {
    const updated: DateTimeRange = {
      from: new Date('2025-09-14T13:00:00Z'),
      to: new Date('2025-09-14T14:00:00Z'),
    };

    component.ngOnInit();

    saleUpdated$.next(updated);

    expect(storeSpy.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatch actions on date range change', () => {
    const newRange: DateTimeRange = {
      from: new Date('2025-09-14T09:00:00Z'),
      to: new Date('2025-09-14T10:00:00Z'),
    };

    component.onDateRangeChange(newRange);

    expect(storeSpy.dispatch).toHaveBeenCalledWith([
      new SetDateTimeRange(newRange),
      new GetSales(newRange),
    ]);
  });

  function initSpy() {
    storeSpy = jasmine.createSpyObj<Store>('Store', ['select', 'dispatch']);
    hubSpy = jasmine.createSpyObj<SaleHubService>('SaleHubService', ['connect', 'getSeleUpdated']);

    storeSpy.select.and.returnValue(of(mockRange));
    hubSpy.getSeleUpdated.and.returnValue(saleUpdated$.asObservable());
  }
});
