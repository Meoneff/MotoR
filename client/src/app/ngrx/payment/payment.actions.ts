import { createAction, props } from '@ngrx/store';
import { Payment } from '../../model/payment.model';

export const create = createAction(
  '[Payment] Create',
  props<{ payment: any }>(),
);

export const createSuccess = createAction('[Payment] Create Success');

export const createFailure = createAction(
  '[Payment] Create Failure',
  props<{ errorMessage: string }>(),
);

//getall
export const getAll = createAction('[Payment] Get All');

export const getAllSuccess = createAction(
  '[Payment] Create Failure',
  props<{ paymentList: Payment[] }>(),
);

export const getAllFailure = createAction(
  '[Payment] Get All Failure',
  props<{ errorMessage: string }>(),
);

export const getById = createAction(
  '[Payment] Get By PaymentId',
  props<{ paymentId: string }>(),
);

export const getByIdSuccess = createAction(
  '[Payment] Get By Id Success',
  props<{ payment: Payment }>(),
);

export const getByIdFailure = createAction(
  '[Payment] Get By Id Failure',
  props<{ errorMessage: string }>(),
);

export const update = createAction(
  '[Payment] Update',
  props<{ id: string; payment: Partial<Payment> }>(),
);

export const updateSuccess = createAction('[Payment] Update Success');

export const updateFailure = createAction(
  '[Payment] Update Failure',
  props<{ errorMessage: string }>(),
);

export const updatePaymentMethod = createAction(
  '[Payment] Update Payment Method',
  props<{ id: string; paymentMethod: string; amount: number }>(),
);

export const updatePaymentMethodSuccess = createAction(
  '[Payment] Update Payment Method Success',
);

export const updatePaymentMethodFailure = createAction(
  '[Payment] Update Payment Method Failure',
  props<{ errorMessage: string }>(),
);

export const deletePayment = createAction(
  '[Payment] Delete',
  props<{ id: string }>(),
);

export const deletePaymentSuccess = createAction('[Payment] Delete Success');

export const deletePaymentFailure = createAction(
  '[Payment] Delete Failure',
  props<{ errorMessage: string }>(),
);

export const reset = createAction('[Payment] Reset');
