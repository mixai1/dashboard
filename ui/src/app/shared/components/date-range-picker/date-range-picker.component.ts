import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

import { DateTimeRange } from '@models/date-time-range.model';
import { DestroyComponent } from '@shared/utils/destroy.component';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './date-range-picker.component.html',
})
export class DateRangePickerComponent extends DestroyComponent implements OnInit {
  @Input()
  set dateTimeRange(value: DateTimeRange) {
    this.form.patchValue(
      {
        from: this.dateTimeLocalToString(value.from),
        to: this.dateTimeLocalToString(value.to),
      },
      { emitEvent: false }
    );
  }
  @Output() rangeSelected = new EventEmitter<DateTimeRange>();

  readonly form = new FormGroup({
    from: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    to: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.form.valueChanges.pipe(this.autoDestroy(), distinctUntilChanged()).subscribe((value) => {
      if (this.form.valid && value && value.from && value.to) {
        this.rangeSelected.emit({
          from: new Date(value.from),
          to: new Date(value.to),
        });
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
}
