import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PeriodSelectComponent } from '@shared/components/period-select/period-select.component';
import { DateRangePickerComponent } from '@shared/components/date-range-picker/date-range-picker.component';

import { DashboardDateFilterComponent } from './components/dashboard-date-filter/dashboard-date-filter.component';
import { DashboardFilterState } from './store/dashboard-filter.state';
import { SaleModule } from '../sale/sale.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { dashboardResolver } from './resolvers/dashboard.resolver';

const routes: Routes = [
  { path: '', component: DashboardComponent, resolve: { dashboard: dashboardResolver } },
];

@NgModule({
  declarations: [DashboardComponent, DashboardDateFilterComponent],
  imports: [
    PeriodSelectComponent,
    DateRangePickerComponent,
    SaleModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([DashboardFilterState]),
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
