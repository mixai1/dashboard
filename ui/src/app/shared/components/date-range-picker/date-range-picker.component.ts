import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

import { DateRange } from '@models/date-range.model';
import { DestroyComponent } from '@shared/utils/destroy.component';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './date-range-picker.component.html'
})
export class DateRangePickerComponent extends DestroyComponent  implements OnInit {
  @Input({ required: true }) dateRange!: DateRange;
  @Output() rangeSelected = new EventEmitter<DateRange>();

  readonly form = new FormGroup({
    from: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    to: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  ngOnInit(): void {
    this.form.patchValue({
      from: this.dateTimeLocalToString(this.dateRange.from),
      to: this.dateTimeLocalToString(this.dateRange.to)
    }, { emitEvent: false });

    this.form.valueChanges
      .pipe(
        this.autoDestroy(),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (this.form.valid && value && value.from && value.to) {
          this.rangeSelected.emit({
            from: this.stringToDateTimeLocal(value.from),
            to: this.stringToDateTimeLocal(value.to)
          } as DateRange);
        }
    });
  }

  private dateTimeLocalToString(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
  }

  private stringToDateTimeLocal(value: string): Date {
    const [datePart, timePart] = value.split('T');
    const [y, m, d] = datePart.split('-').map(Number);
    const [hh, mi] = (timePart || '00:00').split(':').map(Number);
    return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mi ?? 0);
  }
}