import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { dashboardResolver } from './dashboard.resolver';
import { SetDateTimeRange } from '../store/dashboard-filter.actions';
import { LoadSales } from '../../sale/store/sale.actions';
import { DEFAULT_PERIODS } from '@shared/constants/date-ranges.const';

describe('Resolver: dashboardResolver', () => {
  let storeMock: jasmine.SpyObj<Store>;
  const from = new Date('2024-01-01T00:00:00Z');
  const to = new Date('2024-01-07T23:59:00Z');

  beforeEach(() => {
    initSpies();

    TestBed.configureTestingModule({
      providers: [{ provide: Store, useValue: storeMock }],
    });
  });

  it('should dispatch SetDateTimeRange and LoadSales', async () => {
    await TestBed.runInInjectionContext(async () => {
      await dashboardResolver({} as any, {} as any);
    });

    expect(storeMock.dispatch).toHaveBeenCalledWith([
      new SetDateTimeRange({ from, to }),
      new LoadSales({ from, to }),
    ]);
  });

  function initSpies(): void {
    storeMock = jasmine.createSpyObj<Store>('Store', ['dispatch']);
    storeMock.dispatch.and.returnValue(of());
    spyOnProperty(DEFAULT_PERIODS, 'week', 'get').and.returnValue({
      name: 'Week',
      value: { from, to },
    });
  }
});
