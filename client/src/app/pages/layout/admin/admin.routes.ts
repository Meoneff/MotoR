import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full',
      },

      {
        path: 'motor',
        loadChildren: () =>
          import('./motor-admin/motor-admin.routes').then(
            (m) => m.MOTORADMIN_ROUTES,
          ),
      },
      {
        path: 'reservation',
        loadChildren: () =>
          import('./reservation/reservation.routes').then(
            (m) => m.RESERVATION_ROUTES,
          ),
      },
      {
        path: 'revenue',
        loadChildren: () =>
          import('./revenue/revenue.routes').then((m) => m.REVENUE_ROUTES),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.routes').then((m) => m.USER_ROUTES),
      },
    ],
  },
];
