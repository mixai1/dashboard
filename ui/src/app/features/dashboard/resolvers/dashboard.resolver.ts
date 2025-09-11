import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { Store } from "@ngxs/store";
import { SetDateTimeRange } from "../store/dashboard-filter.actions";
import { GetSales } from "../../sale/store/sale.actions";
import { DEFAULT_PERIODS } from "@shared/constants/date-ranges.const";

export const dashboardResolver: ResolveFn<void> = async () => {
  const store: Store = inject(Store);

  const dateTimeRange = DEFAULT_PERIODS.week.value;
  store.dispatch([new SetDateTimeRange(dateTimeRange), new GetSales(dateTimeRange)])
}