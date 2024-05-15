import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as MotorActions from './motor.actions';
import { MotorService } from '../../service/motor/motor.service';

@Injectable()
export class MotorEffects {
  constructor(
    private motorService: MotorService,
    private action$: Actions,
  ) {}

  getMotor$ = createEffect(() =>
    this.action$.pipe(
      ofType(MotorActions.get),
      exhaustMap(() =>
        this.motorService.getMotor().pipe(
          map((items) => {
            if (items.length > 0) {
              return MotorActions.getSuccess({ motorList: items });
            } else {
              return MotorActions.getFailure({ getErrMess: 'No dish found' });
            }
          }),
          catchError((err) => of(MotorActions.getFailure({ getErrMess: err }))),
        ),
      ),
    ),
  );
  createMotor$ = createEffect(() =>
    this.action$.pipe(
      ofType(MotorActions.create),
      exhaustMap((action) =>
        this.motorService.createMotor(action.motor).pipe(
          map((item) => {
            return MotorActions.createMotorSuccess({ motor: item });
          }),
          catchError((err) =>
            of(MotorActions.createMotorFailure({ error: err })),
          ),
        ),
      ),
    ),
  );
}
