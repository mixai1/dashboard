import { DateTimeRange } from "@models/date-time-range.model";

export class SetDateTimeRange {
  static readonly type = '[Dashboard Filter] Set Date Range';
  constructor(public dateTimeRange: DateTimeRange) {}
}