import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { SaleState } from "./store/sale.state";
import { SaleApiService } from "./services/sale-api.service";
import { SaleChartComponent } from "./components/sale-chart/sale-chart.component";

@NgModule({
  declarations: [SaleChartComponent],
  imports: [NgxsModule.forFeature([SaleState])],
  providers: [SaleApiService],
  exports: [SaleChartComponent]
})
export class SaleModule {}