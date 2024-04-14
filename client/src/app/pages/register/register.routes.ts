// import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from '../../app.routes';
import { RegisterComponent } from './register.component';

export const REGISTER_ROUTES: Routes = [
  {
    path: '',
    component: RegisterComponent,
  },
];
