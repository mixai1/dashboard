import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { DashboardFilterState } from './dashboard-filter.state';
import { SetDateTimeRange } from './dashboard-filter.actions';
import { DateTimeRange } from '@models/date-time-range.model';

describe('State: DashboardFilterState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([DashboardFilterState])],
    });
    store = TestBed.inject(Store);
  });

  describe('Selectors:', () => {
    it('dateTimeRange should return dateTimeRange', () => {
      const mockRange: DateTimeRange = { from: new Date(), to: new Date() };
      store.reset({ dashboardFilter: { dateTimeRange: mockRange } });

      const result = store.selectSnapshot(DashboardFilterState.dateTimeRange);

      expect(result).toEqual(mockRange);
    });

    it('dateTimeRange should return default', () => {
      const result = store.selectSnapshot(DashboardFilterState.dateTimeRange);

      expect(result).toEqual(
        jasmine.objectContaining({
          from: jasmine.any(Date),
          to: jasmine.any(Date),
        })
      );
    });
  });

  describe('Actions:', () => {
    it('SetDateTimeRange should patch dateTimeRange', (done) => {
      const mockRange: DateTimeRange = { from: new Date(), to: new Date() };

      store.dispatch(new SetDateTimeRange(mockRange)).subscribe(() => {
        const result = store.selectSnapshot(DashboardFilterState.dateTimeRange);
        expect(result).toEqual(mockRange);
        done();
      });
    });
  });
});
