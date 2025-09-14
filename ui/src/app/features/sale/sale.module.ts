import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { ChartComponent } from '@shared/components/chart/chart.component';

import { SaleState } from './store/sale.state';
import { SaleApiService } from './services/sale-api.service';
import { SaleChartComponent } from './components/sale-chart/sale-chart.component';
import { SaleHubService } from './services/sale-hub.service';

@NgModule({
  declarations: [SaleChartComponent],
  imports: [ChartComponent, NgxsModule.forFeature([SaleState])],
  providers: [SaleApiService, SaleHubService],
  exports: [SaleChartComponent],
})
export class SaleModule {}
