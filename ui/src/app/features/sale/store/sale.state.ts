import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

import { SaleApiService } from '../services/sale-api.service';
import { SaleStateModel } from './sale.state.model';
import { GetSales } from './sale.actions';
import { Observable } from 'rxjs';
import { SaleModel } from '@models/sale.model';

@State<SaleStateModel>({
  name: 'sales',
  defaults: {
    items: [],
  },
})
@Injectable()
export class SaleState {
  @Selector()
  static items(state: SaleStateModel) {
    return state.items;
  }

  constructor(private saleApiService: SaleApiService) {}

  @Action(GetSales)
  getSales(
    { patchState }: StateContext<SaleStateModel>,
    { dateTimeRange }: GetSales
  ): Observable<SaleModel[]> {
    return this.saleApiService.getSalesByDateTimeRange(dateTimeRange).pipe(
      tap((items) => {
        patchState({ items });
      })
    );
  }
}
