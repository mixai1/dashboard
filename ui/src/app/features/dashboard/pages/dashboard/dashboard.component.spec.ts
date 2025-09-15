import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { DashboardComponent } from './dashboard.component';
import { SaleHubService } from 'src/app/features/sale/services/sale-hub.service';
import { DateTimeRange } from '@models/date-time-range.model';
import { SetDateTimeRange } from '../../store/dashboard-filter.actions';
import { FilterSales, LoadSales } from 'src/app/features/sale/store/sale.actions';

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

  describe('ngOnInit', () => {
    it('should call connect on init', () => {
      component.ngOnInit();

      expect(hubSpy.connect).toHaveBeenCalled();
    });

    it('should dispatch SetDateTimeRange and LoadSales when saleUpdated is within selected range', () => {
      const updatedInRange: DateTimeRange = {
        from: new Date('2025-09-14T11:00:00Z'),
        to: new Date('2025-09-14T11:30:00Z'),
      };

      component.ngOnInit();
      saleUpdated$.next(updatedInRange);

      expect(storeSpy.dispatch).toHaveBeenCalledWith([
        new SetDateTimeRange(mockRange),
        new LoadSales(mockRange),
      ]);
    });

    it('should not dispatch when saleUpdated is outside selected range', () => {
      const updatedOutOfRange: DateTimeRange = {
        from: new Date('2025-09-14T13:00:00Z'),
        to: new Date('2025-09-14T14:00:00Z'),
      };

      component.ngOnInit();
      saleUpdated$.next(updatedOutOfRange);

      expect(storeSpy.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('onDateRangeChange', () => {
    it('should dispatch SetDateTimeRange and FilterSales when new range is within current range', () => {
      const newRange: DateTimeRange = {
        from: new Date('2025-09-14T10:30:00Z'),
        to: new Date('2025-09-14T11:00:00Z'),
      };
      storeSpy.selectSnapshot.and.returnValue(mockRange);

      component.onDateRangeChange(newRange);

      expect(storeSpy.dispatch).toHaveBeenCalledWith([
        new SetDateTimeRange(newRange),
        new FilterSales(newRange),
      ]);
    });

    it('should dispatch SetDateTimeRange and LoadSales when new range is outside current range', () => {
      const newRange: DateTimeRange = {
        from: new Date('2025-09-14T09:00:00Z'),
        to: new Date('2025-09-14T10:00:00Z'),
      };
      storeSpy.selectSnapshot.and.returnValue(mockRange);

      component.onDateRangeChange(newRange);

      expect(storeSpy.dispatch).toHaveBeenCalledWith([
        new SetDateTimeRange(newRange),
        new LoadSales(newRange),
      ]);
    });
  });

  function initSpy() {
    storeSpy = jasmine.createSpyObj<Store>('Store', ['select', 'dispatch', 'selectSnapshot']);
    hubSpy = jasmine.createSpyObj<SaleHubService>('SaleHubService', ['connect', 'getSaleDateRangeUpdated']);

    storeSpy.select.and.returnValue(of(mockRange));
    storeSpy.selectSnapshot.and.returnValue(mockRange);
    hubSpy.getSaleDateRangeUpdated.and.returnValue(saleUpdated$.asObservable());
  }
});
