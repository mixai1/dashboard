import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { SaleApiService } from '../services/sale-api.service';
import { SaleStateModel } from './sale.state.model';
import { GetSales } from './sale.actions';

@State<SaleStateModel>({
  name: 'sales',
  defaults: {
    items: [],
    loading: false,
  },
})
@Injectable()
export class SaleState {
  @Selector()
  static items(state: SaleStateModel) {
    return state.items;
  }

  @Selector()
  static loading(state: SaleStateModel) {
    return state.loading;
  }

  constructor(private saleApiService: SaleApiService) {}

  @Action(GetSales)
  getSales({ patchState }: StateContext<SaleStateModel>, { dateTimeRange }: GetSales) {
    patchState({ loading: true });

    return this.saleApiService.getSalesByDateTimeRange(dateTimeRange).pipe(
      tap((items) => {
        patchState({ items, loading: false });
      })
    );
  }
}
