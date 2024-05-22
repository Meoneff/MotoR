import { Routes } from '@angular/router';
import { MotorbikeComponent } from './motorbike.component';

export const MOTORBIKE_ROUTES: Routes = [
  {
    path: '',
    component: MotorbikeComponent,
    children: [
      {
        path: '',
        redirectTo: 'automatic-bikes',
        pathMatch: 'full',
      },
      {
        path: 'automatic/rental',
        loadChildren: () =>
          import('./automatic-bikes/automatic-bikes.component').then(
            (m) => m.AutomaticBikesComponent,
          ),
      },
      {
        path: 'semi-auto/rental',
        loadChildren: () =>
          import('./semi-auto-bikes/semi-auto-bikes.component').then(
            (m) => m.SemiAutoBikesComponent,
          ),
      },
      {
        path: 'manual/rental',
        loadChildren: () =>
          import('./manual-bikes/manual-bikes.component').then(
            (m) => m.ManualBikesComponent,
          ),
      },
    ],
  },
];
