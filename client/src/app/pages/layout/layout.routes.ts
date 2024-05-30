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
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTES),
        // component: HomeComponent,
      },
      // {
      //   path: 'rental/all',
      //   loadChildren: () =>
      //     import('./motorbike/motorbike.routes').then(
      //       (m) => m.MOTORBIKE_ROUTES,
      //     ),
      // },
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
    ],
  },
];
