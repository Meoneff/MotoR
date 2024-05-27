import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, map, switchMap, exhaustMap } from 'rxjs';
import * as PaymentActions from './payment.actions';
import { PaymentService } from '../../service/payment/payment.service';

@Injectable()
export class PaymentEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
  ) {}
  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.create),
      exhaustMap((action) =>
        this.paymentService.create(action.payment).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return PaymentActions.createSuccess();
            } else {
              return PaymentActions.createFailure({
                errorMessage: 'Payment is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(PaymentActions.createFailure({ errorMessage: error })),
          ),
        ),
      ),
    ),
  );
  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.get),
      exhaustMap((action) =>
        this.paymentService.get(action.reservationId).pipe(
          map((item) => {
            if (item != undefined || item != null) {
              return PaymentActions.getSuccess({ payment: item });
            } else {
              return PaymentActions.getFailure({
                errorMessage: 'Payment is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(PaymentActions.getFailure({ errorMessage: error })),
          ),
        ),
      ),
    ),
  );
}
