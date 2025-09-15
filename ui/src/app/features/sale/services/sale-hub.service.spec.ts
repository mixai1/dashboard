import { TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { DateTimeRange } from '@models/date-time-range.model';
import { SaleHubService } from './sale-hub.service';
import { API_HOST_URL } from 'src/app/app.config';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

describe('Service: SaleHubService', () => {
  let service: SaleHubService;
  let connectSpy: jasmine.Spy;
  let hubConnectionMock: jasmine.SpyObj<HubConnection>;
  let onSpy: jasmine.Spy;
  let saleUpdatedSubject = new Subject<DateTimeRange>();
  let builderMockInstance: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleHubService, { provide: API_HOST_URL, useValue: 'test' }],
    });
    service = TestBed.inject(SaleHubService);

    initSpy();
  });

  it('should call connect and subscribe to saleUpdated on connect', () => {
    service.connect();

    expect(connectSpy).toHaveBeenCalled();
    expect(onSpy).toHaveBeenCalledWith('saleUpdated');
  });

  it('should replay the last value from getSeleUpdated()', (done) => {
    service.connect();

    const range: DateTimeRange = {
      from: new Date('2025-09-14T10:00:00Z'),
      to: new Date('2025-09-14T12:00:00Z'),
    };

    service.getSaleDateRangeUpdated().subscribe((value) => {
      expect(value).toEqual(range);
      service.getSaleDateRangeUpdated().subscribe((secondValue) => {
        expect(secondValue).toEqual(range);
        done();
      });
    });

    saleUpdatedSubject.next(range);
  });

  function initSpy() {
    hubConnectionMock = jasmine.createSpyObj<HubConnection>('HubConnection', [
      'start',
      'stop',
      'on',
    ]);
    hubConnectionMock.start.and.returnValue(Promise.resolve());
    hubConnectionMock.stop.and.returnValue(Promise.resolve());

    builderMockInstance = {
      withUrl: jasmine.createSpy('withUrl').and.callFake(() => builderMockInstance),
      withAutomaticReconnect: jasmine
        .createSpy('withAutomaticReconnect')
        .and.callFake(() => builderMockInstance),
      build: jasmine.createSpy('build').and.returnValue(hubConnectionMock),
    };

    spyOn(HubConnectionBuilder.prototype, 'withUrl').and.callFake(builderMockInstance.withUrl);
    spyOn(HubConnectionBuilder.prototype, 'withAutomaticReconnect').and.callFake(
      builderMockInstance.withAutomaticReconnect
    );
    spyOn(HubConnectionBuilder.prototype, 'build').and.callFake(builderMockInstance.build);

    connectSpy = spyOn(service, 'connect').and.callThrough();
    onSpy = spyOn(service, 'on').and.callFake(() => {
      return saleUpdatedSubject.asObservable();
    });
  }
});
