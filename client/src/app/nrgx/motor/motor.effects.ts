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

  // getMotor$ = createEffect(() =>
  //   this.action$.pipe(
  //     ofType(MotorActions.get),
  //     exhaustMap(() =>
  //       this.motorService.getMotor().pipe(
  //         map((items) => {
  //           if (items.length > 0) {
  //             // console.log(items);
  //             return MotorActions.getSuccess({ motorList: items });
  //           } else {
  //             return MotorActions.getFailure({ getErrMess: 'No dish found' });
  //           }
  //         }),
  //         catchError((err) => of(MotorActions.getFailure({ getErrMess: err }))),
  //       ),
  //     ),
  //   ),
  // );

  getMotor$ = createEffect(() =>
    this.action$.pipe(
      ofType(MotorActions.get),
      exhaustMap((action) =>
        this.motorService.getMotor(action.isConfirmed).pipe(
          map((items) => {
            if (items != undefined || items != null) {
              if (items.message) {
                return MotorActions.getFailure({ getErrMess: items.message });
              }
              return MotorActions.getSuccess({ motorList: items });
            } else {
              return MotorActions.getFailure({
                getErrMess: 'Car is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(MotorActions.getFailure({ getErrMess: error })),
          ),
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

  deleteMotor$ = createEffect(() =>
    this.action$.pipe(
      ofType(MotorActions.deleteMotor),
      exhaustMap((action) =>
        this.motorService.deleteMotor(action.motorId).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return MotorActions.deleteMotorSuccess({ motorId: item });
            } else {
              return MotorActions.deleteMotorFailure({
                error: 'No motor found',
              });
            }
          }),
          catchError((err) =>
            of(MotorActions.deleteMotorFailure({ error: err })),
          ),
        ),
      ),
    ),
  );

  updateMotor$ = createEffect(() =>
    this.action$.pipe(
      ofType(MotorActions.updateMotor),
      exhaustMap((action) =>
        this.motorService.updateMotor(action.motor).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              if (item.message) {
                return MotorActions.updateMotorFailure({
                  error: item.message,
                });
              }
              return MotorActions.updateMotorSuccess({ motor: item });
            } else {
              return MotorActions.updateMotorFailure({
                error: 'No motor found',
              });
            }
          }),
        ),
      ),
    ),
  );

  getMotorById$ = createEffect(() =>
    this.action$.pipe(
      ofType(MotorActions.getMotorById),
      exhaustMap((action) =>
        this.motorService.getMotorById(action.motorId).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              if (item.message) {
                return MotorActions.getMotorByIdFailure({
                  getErrMess: item.message,
                });
              }
              return MotorActions.getMotorByIdSuccess({ selectedMotor: item });
            } else {
              return MotorActions.getMotorByIdFailure({
                getErrMess: 'No motor found',
              });
            }
          }),
          catchError((err) =>
            of(MotorActions.getMotorByIdFailure({ getErrMess: err })),
          ),
        ),
      ),
    ),
  );

  getMotorByCategoryId$ = createEffect(() =>
    this.action$.pipe(
      ofType(MotorActions.getMotorByCategoryId),
      exhaustMap((action) =>
        this.motorService.getMotorByCategoryId(action.categoryId).pipe(
          map((items) => {
            if (items.length > 0) {
              return MotorActions.getMotorByCategoryIdSuccess({
                motors: items,
              });
            } else {
              return MotorActions.getMotorByCategoryIdFailure({
                getErrMess: 'No motor found',
              });
            }
          }),
          catchError((err) =>
            of(MotorActions.getMotorByCategoryIdFailure({ getErrMess: err })),
          ),
        ),
      ),
    ),
  );
}
