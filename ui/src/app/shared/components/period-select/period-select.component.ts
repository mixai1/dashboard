import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { DateRange } from '@models/date-range.model';
import { DestroyComponent } from '@shared/utils/destroy.component';

export interface PeriodOption {
  name: string;
  value: DateRange;
}

@Component({
  selector: 'app-period-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './period-select.component.html'
})
export class PeriodSelectComponent extends DestroyComponent implements OnInit {
  @Input({ required: true }) periods!: PeriodOption[];

  @Input() initIndex = 0;

  @Output() periodSelected = new EventEmitter<DateRange>();

  readonly control = new FormControl<number>(0, { nonNullable: true });

  ngOnInit() {
    this.control.setValue(this.initIndex);
    this.control.valueChanges
      .pipe(this.autoDestroy())
      .subscribe((index) => {
        this.periodSelected.emit(this.periods[index].value);
      });
  }
}
