import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { dashboardResolver } from './dashboard.resolver';
import { SetDateTimeRange } from '../store/dashboard-filter.actions';
import { GetSales } from '../../sale/store/sale.actions';
import { DEFAULT_PERIODS } from '@shared/constants/date-ranges.const';

describe('Resolver: dashboardResolver', () => {
  let storeMock: jasmine.SpyObj<Store>;

  beforeEach(() => {
    initSpies();

    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeMock }],
    });
  });

  it('should dispatch SetDateTimeRange and GetSales', async () => {
    await TestBed.runInInjectionContext(async () => {
      await dashboardResolver({} as any, {} as any);
    });

    const expectedRange = DEFAULT_PERIODS.week.value;

    expect(storeMock.dispatch).toHaveBeenCalledWith([
      new SetDateTimeRange(expectedRange),
      new GetSales(expectedRange),
    ]);
  });

  function initSpies(): void {
    storeMock = jasmine.createSpyObj<Store>('Store', ['dispatch']);
    storeMock.dispatch.and.returnValue(of());
  }
});
