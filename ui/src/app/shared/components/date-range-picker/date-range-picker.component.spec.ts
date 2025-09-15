import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerComponent } from './date-range-picker.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DateTimeRange } from '@models/date-time-range.model';

describe('Component: DateRangePickerComponent', () => {
  let fixture: ComponentFixture<DateRangePickerComponent>;
  let component: DateRangePickerComponent;
  let emitSpy: jasmine.Spy;

  const mockRange: DateTimeRange = {
    from: new Date(2025, 8, 15, 10, 0),
    to: new Date(2025, 8, 15, 12, 0),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DateRangePickerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      emitSpy = spyOn(component.rangeSelected, 'emit');
    });

    it('should patch form when dateTimeRange input is set without emitting', () => {
      component.dateTimeRange = mockRange;

      expect(component.form.value.from).toBe('2025-09-15T10:00');
      expect(component.form.value.to).toBe('2025-09-15T12:00');
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should emit rangeSelected when form is valid and values change', () => {
      component.ngOnInit();

      component.form.setValue({
        from: '2025-09-15T10:00',
        to: '2025-09-15T12:00',
      });

      const emitted: DateTimeRange = emitSpy.calls.mostRecent().args[0];
      expect(emitted.from.getTime()).toBe(mockRange.from.getTime());
      expect(emitted.to.getTime()).toBe(mockRange.to.getTime());
    });

    it('should not emit when form is invalid', () => {
      component.ngOnInit();

      component.form.setValue({
        from: '',
        to: '',
      });
      expect(emitSpy).not.toHaveBeenCalled();
    });
  });
});
