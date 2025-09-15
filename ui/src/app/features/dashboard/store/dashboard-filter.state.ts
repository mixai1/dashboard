import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { DashboardFilterStateModel } from './dashboard-filter.state.model';
import { DEFAULT_PERIODS } from '@shared/constants/date-ranges.const';
import { SetDateTimeRange } from './dashboard-filter.actions';

@State<DashboardFilterStateModel>({
  name: 'dashboardFilter',
  defaults: {
    dateTimeRange: DEFAULT_PERIODS.day.value,
  },
})
@Injectable()
export class DashboardFilterState {
  @Selector()
  static dateTimeRange(state: DashboardFilterStateModel) {
    return state.dateTimeRange;
  }

  @Action(SetDateTimeRange)
  setDateTimeRange(
    { patchState }: StateContext<DashboardFilterStateModel>,
    { dateTimeRange }: SetDateTimeRange
  ) {
    patchState({ dateTimeRange });
  }
}
