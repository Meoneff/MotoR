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
      {
        path: 'rental/all',
        loadChildren: () =>
          import('./motorbike/motorbike.routes').then(
            (m) => m.MOTORBIKE_ROUTES,
          ),
      },
    ],
  },
];
