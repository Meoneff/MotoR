import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/layout/layout.routes').then((m) => m.LAYOUT_ROUTES),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/pages/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../app/pages/register/register.routes').then(
        (m) => m.REGISTER_ROUTES,
      ),
  },
];
