import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PeriodSelectComponent, PeriodOption } from './period-select.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('Component: PeriodSelectComponent', () => {
  let fixture: ComponentFixture<PeriodSelectComponent>;
  let component: PeriodSelectComponent;
  let emitSpy: jasmine.Spy;

  const mockPeriods: PeriodOption[] = [
    {
      name: 'Today',
      value: {
        from: new Date('2025-09-15T00:00:00Z'),
        to: new Date('2025-09-15T23:59:59Z'),
      },
    },
    {
      name: 'Yesterday',
      value: {
        from: new Date('2025-09-14T00:00:00Z'),
        to: new Date('2025-09-14T23:59:59Z'),
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PeriodSelectComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(PeriodSelectComponent);
    component = fixture.componentInstance;
    component.periods = mockPeriods;
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      emitSpy = spyOn(component.periodSelected, 'emit');
    });

    it('should set control value to initIndex without emitting', () => {
      component.initIndex = 1;

      component.ngOnInit();

      expect(component.control.value).toBe(1);
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should emit period when control value changes', () => {
      component.ngOnInit();

      component.control.setValue(1);
      expect(emitSpy).toHaveBeenCalledWith(mockPeriods[1].value);
    });

    it('should emit first period when initIndex is 0 and value changes to 0', () => {
      component.initIndex = 0;

      component.ngOnInit();

      component.control.setValue(0);
      expect(emitSpy).toHaveBeenCalledWith(mockPeriods[0].value);
    });
  });
});
