import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReservationService } from '../../service/reservation/reservation.service';
import { catchError, of, map, exhaustMap } from 'rxjs';
import * as ReservationActions from './reservation.actions';
import { Reservation } from '../../model/reservation.model';

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
          map((item: Reservation) => {
            if (item != undefined && item != null) {
              return ReservationActions.createSuccess();
            } else {
              return ReservationActions.createFailure({
                errorMessage: 'Reservation is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(
              ReservationActions.createFailure({ errorMessage: error.message }),
            ),
          ),
        ),
      ),
    ),
  );

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.get),
      exhaustMap((action) =>
        this.reservationService.get(action.customerId, false).pipe(
          // Truyền tham số status = false
          map((items: Reservation[]) => {
            if (items != undefined && items != null) {
              return ReservationActions.getSuccess({ reservations: items });
            } else {
              return ReservationActions.getFailure({
                errorMessage: 'Reservation is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(ReservationActions.getFailure({ errorMessage: error.message })),
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
          map((item: Reservation) => {
            if (item != undefined && item != null) {
              return ReservationActions.getOneSuccess({ reservation: item });
            } else {
              return ReservationActions.getOneFailure({
                errorMessage: 'Reservation is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(
              ReservationActions.getOneFailure({ errorMessage: error.message }),
            ),
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
          map((items: Reservation[]) => {
            if (items != undefined && items != null) {
              return ReservationActions.getReservationByStartDateSuccess({
                reservations: items,
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
                errorMessage: error.message,
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
          map((items: Reservation[]) => {
            if (items != undefined && items != null) {
              return ReservationActions.getReservationByEndDateSuccess({
                reservations: items,
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
                errorMessage: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReservationActions.updateStatus),
      exhaustMap((action) =>
        this.reservationService
          .updateReservationStatus(action.reservationId, action.status)
          .pipe(
            map((item: Reservation) => {
              if (item != undefined && item != null) {
                return ReservationActions.updateStatusSuccess({
                  reservation: item,
                });
              } else {
                return ReservationActions.updateStatusFailure({
                  errorMessage: 'Reservation is undefined or null',
                });
              }
            }),
            catchError((error) =>
              of(
                ReservationActions.updateStatusFailure({
                  errorMessage: error.message,
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
                  errorMessage: error.message,
                }),
              ),
            ),
          ),
      ),
    ),
  );
}
