import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/components/dashboard/dashboard.component';
import { dashboardResolver } from './features/dashboard/resolvers/dashboard.resolver';

export const routes: Routes = [
  { path: '', component: DashboardComponent, resolve: { dashboard: dashboardResolver }}
];
