import { NavbarComponent } from './navbar.component';
import { Routes } from '@angular/router';

export const NAVBAR_ROUTES: Routes = [
  {
    path: '',
    component: NavbarComponent,
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../../../pages/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
];
