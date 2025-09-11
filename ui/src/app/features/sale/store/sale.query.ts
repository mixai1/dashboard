import { Selector } from '@ngxs/store';

import { fromUtcDate } from '@shared/utils/date-time.util';
import { SaleModel } from '@models/sale.model';
import { ChartModel } from '@models/chart.model';

import { SaleState } from './sale.state';

export class SaleQuery {
  @Selector([SaleState.items])
  static mapChartModel(sales: SaleModel[]): ChartModel {
    const grouped: Record<string, SaleModel[]> = {};
    for (const sale of sales) {
      const dateTime = fromUtcDate(sale.saleDateTime).toLocaleTimeString();
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
      counts
    };
  }
}
