import { DateTimeRange } from '@models/date-time-range.model';

export class LoadSales {
  static readonly type = '[Sale] Load Sales';
  constructor(public dateTimeRange: DateTimeRange) {}
}

export class FilterSales {
  static readonly type = '[Sale] Filter Sales';
  constructor(public dateTimeRange: DateTimeRange) {}
}
