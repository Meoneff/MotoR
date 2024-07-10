import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReservationService } from '../../service/reservation/reservation.service';
import { catchError, of, map, switchMap, exhaustMap } from 'rxjs';
import * as ReservationActions from './reservation.actions';

@Injectable()
export class ReservationEffects {
  constructor(
    private actions$: Actions,
    private reservationService: ReservationService,
  ) {}

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.create),
      exhaustMap((action) =>
        this.reservationService.create(action.reservation).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return ReservationActions.createSuccess();
            } else {
              return ReservationActions.createFailure({
                errorMessage: 'Reservation is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(ReservationActions.createFailure({ errorMessage: error })),
          ),
        ),
      ),
    ),
  );
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.get),
      exhaustMap((action) =>
        this.reservationService.get(action.customerId).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return ReservationActions.getSuccess({ reservations: item });
            } else {
              return ReservationActions.getFailure({
                errorMessage: 'Reservation is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(ReservationActions.getFailure({ errorMessage: error })),
          ),
        ),
      ),
    ),
  );

  getOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.getOne),
      exhaustMap((action) =>
        this.reservationService.getOne(action.reservationId).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return ReservationActions.getOneSuccess({ reservation: item });
            } else {
              return ReservationActions.getOneFailure({
                errorMessage: 'Reservation is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(ReservationActions.getOneFailure({ errorMessage: error })),
          ),
        ),
      ),
    ),
  );
  getBystartDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.getReservationByStartDate),
      exhaustMap((action) =>
        this.reservationService.getByStartDate(action.startDate).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return ReservationActions.getReservationByStartDateSuccess({
                reservations: item,
              });
            } else {
              return ReservationActions.getReservationByStartDateFailure({
                errorMessage: 'Reservation is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(
              ReservationActions.getReservationByStartDateFailure({
                errorMessage: error,
              }),
            ),
          ),
        ),
      ),
    ),
  );
  getByendDate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.getReservationByEndDate),
      exhaustMap((action) =>
        this.reservationService.getByEndDate(action.endDate).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return ReservationActions.getReservationByEndDateSuccess({
                reservations: item,
              });
            } else {
              return ReservationActions.getReservationByEndDateFailure({
                errorMessage: 'Reservation is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(
              ReservationActions.getReservationByEndDateFailure({
                errorMessage: error,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.deleteReservation),
      exhaustMap((action) =>
        this.reservationService
          .deleteReservationById(action.reservationId)
          .pipe(
            map(() => ReservationActions.deleteReservationSuccess()),
            catchError((error) =>
              of(
                ReservationActions.deleteReservationFailure({
                  errorMessage: error,
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
