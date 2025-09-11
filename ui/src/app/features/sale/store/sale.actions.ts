import { DateTimeRange } from '@models/date-time-range.model';

export class GetSales {
  static readonly type = '[Sale] Get Sales';
  constructor(public dateTimeRange: DateTimeRange) {}
}
