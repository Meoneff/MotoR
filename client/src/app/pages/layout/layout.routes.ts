import { LayoutComponent } from '../layout/layout.component';

import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'payment',
        loadChildren: () =>
          import('./payment/payment.routes').then((m) => m.PAYMENT_ROUTES),
        // component: PaymentComponent,
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
        // component: AdminComponent,
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTES),
        // component: HomeComponent,
      },
      {
        path: 'automatic/rental',
        loadChildren: () =>
          import('./motorbike/automatic-bikes/automatic-bikes.routes').then(
            (m) => m.AUTOMATIC_BIKES_ROUTES,
          ),
      },
      {
        path: 'semi-auto/rental',
        loadChildren: () =>
          import('./motorbike/semi-auto-bikes/semi-auto-bikes.routes').then(
            (m) => m.SEMI_AUTO_BIKES_ROUTES,
          ),
      },
      {
        path: 'manual/rental',
        loadChildren: () =>
          import('./motorbike/manual-bikes/manual-bikes.routes').then(
            (m) => m.MANUAL_BIKES_ROUTES,
          ),
      },
      {
        path: 'detail/:id',
        loadChildren: () =>
          import('./motorbike/detail/detail.routes').then(
            (m) => m.DETAIL_ROUTES,
          ),
      },
      {
        path: 'admin/motor',
        loadChildren: () =>
          import('./admin/motor-admin/motor-admin.routes').then(
            (m) => m.MOTORADMIN_ROUTES,
          ),
      },
      {
        path: 'admin/user',
        loadChildren: () =>
          import('./admin/user/user.routes').then((m) => m.USER_ROUTES),
      },
      {
        path: 'admin/reservation',
        loadChildren: () =>
          import('./admin/reservation/reservation.routes').then(
            (m) => m.RESERVATION_ROUTES,
          ),
      },
      {
        path: 'admin/revenue',
        loadChildren: () =>
          import('./admin/revenue/revenue.routes').then(
            (m) => m.REVENUE_ROUTES,
          ),
      },

      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];
