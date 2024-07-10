import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import * as ManufacturerActions from './manufacturer.actions';
import { ManufacturerService } from '../../service/manufacturer/manufacturer.service';

@Injectable()
export class ManufacturerEffects {
  constructor(
    private manufacturerService: ManufacturerService,
    private action$: Actions,
  ) {}

  getManufacturer$ = createEffect(() =>
    this.action$.pipe(
      ofType(ManufacturerActions.get),
      switchMap((action) => {
        return this.manufacturerService.getManufacturers();
      }),
      map((manufacturers) => {
        return ManufacturerActions.getSuccess({ manufacturers: manufacturers });
      }),
      catchError((error) => {
        return of(ManufacturerActions.getFailure({ errorMessage: error }));
      }),
    ),
  );
}
