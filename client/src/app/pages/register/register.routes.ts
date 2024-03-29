// import { RegisterComponent } from './register.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from '../../app.routes';

export const REGISTER_ROUTES: Routes = [
  // {
  //   path: '',
  //   component: RegisterComponent,
  // },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterRoutingModule {}
