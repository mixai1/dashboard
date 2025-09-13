import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { SaleApiService } from '../services/sale-api.service';
import { SaleStateModel } from './sale.state.model';
import { GetSales } from './sale.actions';
import { SaleModel } from '@models/sale.model';
import { ChartModel } from '@models/chart.model';

@State<SaleStateModel>({
  name: 'sales',
  defaults: {
    items: [],
  },
})
@Injectable()
export class SaleState {
  @Selector()
  static getItems(state: SaleStateModel) {
    return state.items;
  }

  @Selector()
  static mapChartModel({ items }: SaleStateModel): ChartModel {
    const grouped: Record<string, SaleModel[]> = {};
    for (const sale of items) {
      const dateTime = new Date(sale.saleDateTime + 'Z').toLocaleDateString();
      if (!grouped[dateTime]) {
        grouped[dateTime] = [];
      }
      grouped[dateTime].push(sale);
    }

    const times: string[] = [];
    const amounts: number[] = [];
    const counts: number[] = [];

    for (const [time, sales] of Object.entries(grouped)) {
      const sumAmount = Number(sales.reduce((sum, s) => sum + s.amount, 0).toFixed(2));
      const count = sales.length;

      times.push(time);
      amounts.push(sumAmount);
      counts.push(count);
    }

    return {
      times,
      amounts,
      counts,
    };
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
