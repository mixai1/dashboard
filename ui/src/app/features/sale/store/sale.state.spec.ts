import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { SaleState } from './sale.state';
import { SaleApiService } from '../services/sale-api.service';
import { SaleStateModel } from './sale.state.model';
import { SaleModel } from '@models/sale.model';
import { ChartModel } from '@models/chart.model';
import { GetSales } from './sale.actions';

describe('State: SaleState', () => {
  let store: Store;
  let storeMock: jasmine.SpyObj<Store>;
  let saleApiServiceMock: jasmine.SpyObj<SaleApiService>;

  beforeEach(() => {
    initSpies();

    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([SaleState])],
      providers: [{ provide: SaleApiService, useValue: saleApiServiceMock }],
    });
    store = TestBed.inject(Store);
  });

  describe('Selectors:', () => {
    it('getItems: should return items', () => {
      const mockItems: SaleModel[] = [
        { saleDateTime: '2025-09-13T10:00:00', amount: 100, count: 1 } as any,
      ];
      store.reset({ sales: { items: mockItems } as SaleStateModel });

      const result = store.selectSnapshot(SaleState.getItems);

      expect(result).toEqual(mockItems);
    });

    it('mapChartModel: should return saleModel', () => {
      const mockItems: SaleModel[] = [
        { saleDateTime: '2025-09-13T10:00:00', amount: 100, count: 1 } as any,
        { saleDateTime: '2025-09-13T12:00:00', amount: 50, count: 1 } as any,
        { saleDateTime: '2025-09-14T09:00:00', amount: 200, count: 1 } as any,
      ];
      store.reset({ sales: { items: mockItems } as SaleStateModel });
      const result: ChartModel = store.selectSnapshot(SaleState.mapChartModel);

      expect(result.times.length).toBe(2);
      expect(result.amounts).toContain(150);
      expect(result.amounts).toContain(200);
      expect(result.counts).toContain(2);
      expect(result.counts).toContain(1);
    });

    it('mapChartModel: should return empty', () => {
      store.reset({ sales: { items: [] } as SaleStateModel });

      const result = store.selectSnapshot(SaleState.mapChartModel);

      expect(result).toEqual({ times: [], amounts: [], counts: [] });
    });
  });

  describe('Actions:', () => {
    it('GetSales should call getSalesByDateTimeRange and patch state', (done) => {
      const mockRange = { from: new Date(), to: new Date() };
      const mockItems: SaleModel[] = [
        { saleDateTime: '2025-09-13T10:00:00', amount: 100, count: 1 } as any,
      ];
      saleApiServiceMock.getSalesByDateTimeRange.and.returnValue(of(mockItems));

      store.dispatch(new GetSales(mockRange)).subscribe(() => {
        const stateItems = store.selectSnapshot(SaleState.getItems);
        expect(saleApiServiceMock.getSalesByDateTimeRange).toHaveBeenCalledWith(mockRange);
        expect(stateItems).toEqual(mockItems);
        done();
      });
    });
  });

  function initSpies(): void {
    storeMock = jasmine.createSpyObj<Store>('Store', ['select', 'dispatch']);
    storeMock.select.and.returnValue(of());
    storeMock.dispatch.and.returnValue(of());
    saleApiServiceMock = jasmine.createSpyObj<SaleApiService>('SaleApiService', [
      'getSalesByDateTimeRange',
    ]);
    saleApiServiceMock.getSalesByDateTimeRange.and.returnValue(of([]));
  }
});
