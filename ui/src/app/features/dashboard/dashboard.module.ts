import { NgModule } from "@angular/core";
import { NgxsModule } from "@ngxs/store";

import { PeriodSelectComponent } from "@shared/components/period-select/period-select.component";
import { DateRangePickerComponent } from "@shared/components/date-range-picker/date-range-picker.component";

import { DashboardDateFilterComponent } from "./components/dashboard-date-filter/dashboard-date-filter.component";
import { DashboardFilterState } from "./store/dashboard-filter.state";
import { SaleModule } from "../sale/sale.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardDateFilterComponent
  ],
  imports: [
    PeriodSelectComponent,
    DateRangePickerComponent,
    SaleModule,
    CommonModule,
    NgxsModule.forFeature([DashboardFilterState])
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}