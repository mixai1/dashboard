import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { SaleState } from './store/sale.state';
import { SaleApiService } from './services/sale-api.service';
import { SaleChartComponent } from './components/sale-chart/sale-chart.component';
import { ChartComponent } from '@shared/components/chart/chart.component';

@NgModule({
  declarations: [SaleChartComponent],
  imports: [ChartComponent, NgxsModule.forFeature([SaleState])],
  providers: [SaleApiService],
  exports: [SaleChartComponent],
})
export class SaleModule {}
