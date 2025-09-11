import { DateTimeRange } from '@models/date-time-range.model';

export function toUtcDate(date: Date): Date {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    )
  );
}

export function fromUtcDate(date: Date): Date {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  );
}

export function toUctDateTimeRange(range: DateTimeRange): DateTimeRange {
  return {
    from: toUtcDate(range.from),
    to: toUtcDate(range.to),
  };
}

export function fromUtcDateTimeRange(range: DateTimeRange): DateTimeRange {
  return {
    from: fromUtcDate(range.from),
    to: fromUtcDate(range.to),
  };
}
