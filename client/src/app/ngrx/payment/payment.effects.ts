import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PaymentService } from '../../service/payment/payment.service';
import { catchError, of, map, exhaustMap } from 'rxjs';
import * as PaymentActions from './payment.actions';

@Injectable()
export class PaymentEffects {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
  ) {}

  getAllPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.getAll),
      exhaustMap(() =>
        this.paymentService.getAll().pipe(
          map((items) => {
            if (items) {
              return PaymentActions.getAllSuccess({ paymentList: items });
            } else {
              return PaymentActions.getAllFailure({
                errorMessage: 'Payments are undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(PaymentActions.getAllFailure({ errorMessage: error.message })),
          ),
        ),
      ),
    ),
  );

  createPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.create),
      exhaustMap((action) =>
        this.paymentService.create(action.payment).pipe(
          map((payment) => {
            if (payment != undefined && payment != null) {
              return PaymentActions.createSuccess();
            } else {
              return PaymentActions.createFailure({
                errorMessage: 'Payment is undefined or null',
              });
            }
          }),
          catchError((error) =>
            of(PaymentActions.createFailure({ errorMessage: error.message })),
          ),
        ),
      ),
    ),
  );

  // getPaymentById$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(PaymentActions.getById),
  //     exhaustMap(({ paymentId }) =>
  //       this.paymentService.get(paymentId).pipe(
  //         map((payment) => {
  //           if (payment != undefined && payment != null) {
  //             return PaymentActions.getByIdSuccess({ payment });
  //           } else {
  //             return PaymentActions.getByIdFailure({
  //               errorMessage: 'Payment is undefined or null',
  //             });
  //           }
  //         }),
  //         catchError((error) =>
  //           of(PaymentActions.getByIdFailure({ errorMessage: error.message })),
  //         ),
  //       ),
  //     ),
  //   ),
  // );

  updatePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.update),
      exhaustMap(({ id, payment }) =>
        this.paymentService.update(id, payment).pipe(
          map(() => PaymentActions.updateSuccess()),
          catchError((error) =>
            of(PaymentActions.updateFailure({ errorMessage: error.message })),
          ),
        ),
      ),
    ),
  );

  updatePaymentMethod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.updatePaymentMethod),
      exhaustMap(({ id, paymentMethod, amount }) =>
        this.paymentService.updatePaymentMethod(id, paymentMethod, amount).pipe(
          map(() => PaymentActions.updatePaymentMethodSuccess()),
          catchError((error) =>
            of(
              PaymentActions.updatePaymentMethodFailure({
                errorMessage: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  deletePayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentActions.deletePayment),
      exhaustMap(({ id }) =>
        this.paymentService.delete(id).pipe(
          map(() => PaymentActions.deletePaymentSuccess()),
          catchError((error) =>
            of(
              PaymentActions.deletePaymentFailure({
                errorMessage: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
