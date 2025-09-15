import { TestBed } from '@angular/core/testing';
import { DateTimeRange } from '@models/date-time-range.model';
import { of } from 'rxjs';
import { SaleApiService } from './sale-api.service';
import { provideHttpClient } from '@angular/common/http';
import { API_HOST_URL } from 'src/app/app.config';
import { Injectable } from '@angular/core';

@Injectable()
class TestSaleApiService extends SaleApiService {
  public override httpGet = jasmine.createSpy('httpGet');
}

describe('Service: SaleApiService', () => {
  let service: TestSaleApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SaleApiService, useClass: TestSaleApiService },
        provideHttpClient(),
        { provide: API_HOST_URL, useValue: 'test' },
      ]
    });

    service = TestBed.inject(SaleApiService) as TestSaleApiService;
  });

  it('should call httpGet with correct URL', () => {
    const from = new Date('2025-09-12T10:00:00Z');
    const to = new Date('2025-09-13T10:00:00Z');
    const dateRange: DateTimeRange = { from, to };

    const mockData = [{ amount: 100, saleDateTime: from }];
    service.httpGet.and.returnValue(of(mockData as any));

    service.getSalesByDateTimeRange(dateRange).subscribe();

    const expectedUrl = `${from.toISOString()}/${to.toISOString()}`;
    expect(service.httpGet).toHaveBeenCalledWith(
      expectedUrl,
      jasmine.any(Function)
    );
  });
});
