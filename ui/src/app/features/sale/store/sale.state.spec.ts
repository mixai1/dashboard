import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { SaleState } from './sale.state';
import { SaleApiService } from '../services/sale-api.service';
import { SaleStateModel } from './sale.state.model';
import { SaleModel } from '@models/sale.model';
import { FilterSales, LoadSales } from './sale.actions';
import { DateTimeRange } from '@models/date-time-range.model';

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
        { saleDateTime: new Date('2025-09-13T10:00:00'), amount: 100 },
      ];
      store.reset({ sales: { items: mockItems }});

      const result = store.selectSnapshot(SaleState.getItems);

      expect(result).toEqual(mockItems);
    });

    it('mapChartModel: should return saleModel', () => {
      const mockItems: SaleModel[] = [
        { saleDateTime: new Date('2025-09-13T10:00:00'), amount: 100 },
        { saleDateTime: new Date('2025-09-13T12:00:00'), amount: 50 },
        { saleDateTime: new Date('2025-09-14T09:00:00'), amount: 200 },
      ];
      store.reset({ sales: { items: mockItems }});
      const result = store.selectSnapshot(SaleState.mapChartModel);

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
    it('LoadSales should call getSalesByDateTimeRange and patch state', (done) => {
      const mockRange: DateTimeRange = { from: new Date(), to: new Date() };
      const mockItems: SaleModel[] = [
        { saleDateTime:  new Date('2025-09-13T10:00:00'), amount: 100 },
      ];
      saleApiServiceMock.getSalesByDateTimeRange.and.returnValue(of(mockItems));

      store.dispatch(new LoadSales(mockRange)).subscribe(() => {
        const stateItems = store.selectSnapshot(SaleState.getItems);
        expect(saleApiServiceMock.getSalesByDateTimeRange).toHaveBeenCalledWith(mockRange);
        expect(stateItems).toEqual(mockItems);
        done();
      });
    });

    it('FilterSales should filter items and set filtred items', () => {
      const mockItems: SaleModel[] = [
        { saleDateTime: new Date('2025-09-10T10:00:00'), amount: 100 },
        { saleDateTime: new Date('2025-09-12T15:00:00'), amount: 200 },
        { saleDateTime: new Date('2025-09-15T09:00:00'), amount: 300 },
      ];
      store.reset({ sales: { items: mockItems }});

      const range: DateTimeRange = {
        from: new Date('2025-09-11T00:00:00'),
        to: new Date('2025-09-13T23:59:59'),
      };

      store.dispatch(new FilterSales(range));

      const filtered = store.selectSnapshot(SaleState.getItems);
      expect(filtered.length).toBe(1);
      expect(filtered[0].saleDateTime).toEqual(mockItems[1].saleDateTime);
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
