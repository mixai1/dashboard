import { Routes } from '@angular/router';
import { APP_ROUTES } from '@shared/constants/app-routes.const';

export const routes: Routes = [
  {
    path: APP_ROUTES.Dashboard,
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: '**', redirectTo: APP_ROUTES.Dashboard },
];
