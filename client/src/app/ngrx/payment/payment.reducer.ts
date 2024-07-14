import { createReducer, on } from '@ngrx/store';
import * as PaymentActions from './payment.actions';
import { PaymentState } from './payment.state';
import { Payment } from '../../model/payment.model';

export const initialState: PaymentState = {
  payment: <Payment>{},
  paymentList: [],
  errorMessage: null,
  isLoading: false,
  isSuccessful: false,
  createErrorMessage: '',
  isGetSuccess: false,
  isGetting: false,
  getErrorMessage: '',
  isUpdateSuccess: false,
  isUpdating: false,
  updateErrorMessage: '',
  isUpdatePaymentMethodSuccess: false,
  isUpdatingPaymentMethod: false,
  updatePaymentMethodErrorMessage: '',
  isDeleteSuccess: false,
  isDeleting: false,
  deleteErrorMessage: '',
};

export const paymentReducer = createReducer(
  initialState,

  on(PaymentActions.getAllSuccess, (state, { paymentList }) => ({
    ...state,
    paymentList,
    errorMessage: null,
  })),
  on(PaymentActions.getAllFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),

  // Create Payment
  on(PaymentActions.create, (state, action) => ({
    ...state,
    isLoading: true,
    isSuccessful: false,
    createErrorMessage: '',
  })),

  on(PaymentActions.createSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isSuccessful: true,
    createErrorMessage: '',
  })),

  on(PaymentActions.createFailure, (state, action) => ({
    ...state,
    isLoading: false,
    isSuccessful: false,
    createErrorMessage: action.errorMessage,
  })),

  // Get Payment by ID
  on(PaymentActions.getById, (state, action) => ({
    ...state,
    isGetting: true,
    isGetSuccess: false,
    getErrorMessage: '',
  })),

  on(PaymentActions.getByIdSuccess, (state, action) => ({
    ...state,
    isGetting: false,
    isGetSuccess: true,
    payment: action.payment,
    getErrorMessage: '',
  })),

  on(PaymentActions.getByIdFailure, (state, action) => ({
    ...state,
    isGetting: false,
    isGetSuccess: false,
    getErrorMessage: action.errorMessage,
  })),

  // Update Payment
  on(PaymentActions.update, (state, action) => ({
    ...state,
    isUpdating: true,
    isUpdateSuccess: false,
    updateErrorMessage: '',
  })),

  on(PaymentActions.updateSuccess, (state, action) => ({
    ...state,
    isUpdating: false,
    isUpdateSuccess: true,
    updateErrorMessage: '',
  })),

  on(PaymentActions.updateFailure, (state, action) => ({
    ...state,
    isUpdating: false,
    isUpdateSuccess: false,
    updateErrorMessage: action.errorMessage,
  })),

  // Update Payment Method
  on(PaymentActions.updatePaymentMethod, (state, action) => ({
    ...state,
    isUpdatingPaymentMethod: true,
    isUpdatePaymentMethodSuccess: false,
    updatePaymentMethodErrorMessage: '',
  })),

  on(PaymentActions.updatePaymentMethodSuccess, (state, action) => ({
    ...state,
    isUpdatingPaymentMethod: false,
    isUpdatePaymentMethodSuccess: true,
    updatePaymentMethodErrorMessage: '',
  })),

  on(PaymentActions.updatePaymentMethodFailure, (state, action) => ({
    ...state,
    isUpdatingPaymentMethod: false,
    isUpdatePaymentMethodSuccess: false,
    updatePaymentMethodErrorMessage: action.errorMessage,
  })),

  // Delete Payment
  on(PaymentActions.deletePayment, (state, action) => ({
    ...state,
    isDeleting: true,
    isDeleteSuccess: false,
    deleteErrorMessage: '',
  })),

  on(PaymentActions.deletePaymentSuccess, (state, action) => ({
    ...state,
    isDeleting: false,
    isDeleteSuccess: true,
    deleteErrorMessage: '',
  })),

  on(PaymentActions.deletePaymentFailure, (state, action) => ({
    ...state,
    isDeleting: false,
    isDeleteSuccess: false,
    deleteErrorMessage: action.errorMessage,
  })),

  // Reset
  on(PaymentActions.reset, (state, action) => ({
    ...state,
    isLoading: false,
    isSuccessful: false,
    createErrorMessage: '',
    isGetSuccess: false,
    isGetting: false,
    getErrorMessage: '',
    isUpdateSuccess: false,
    isUpdating: false,
    updateErrorMessage: '',
    isUpdatePaymentMethodSuccess: false,
    isUpdatingPaymentMethod: false,
    updatePaymentMethodErrorMessage: '',
    isDeleteSuccess: false,
    isDeleting: false,
    deleteErrorMessage: '',
    payment: <Payment>{},
  })),
);
