import { LayoutComponent } from '../layout/layout.component';

import { Routes } from '@angular/router';

export const LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.routes').then((m) => m.HOME_ROUTES),
      },
    ],
  },
];
