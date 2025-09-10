import { DateRange } from "@models/date-range.model";

export const DEFAULT_MONTH_RANGE: DateRange = {
  from: new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0),
  to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59)
};