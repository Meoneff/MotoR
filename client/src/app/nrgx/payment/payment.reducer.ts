import { createReducer, on } from '@ngrx/store';
import { Payment } from '../../model/payment.model';
import * as PaymentActions from './payment.actions';
import { PaymentState } from './payment.state';

export const initialState: PaymentState = {
  payment: <Payment>{},
  isLoading: false,
  isSuccessful: false,
  createErrorMessage: '',
  isGetSuccess: false,
  isgetting: false,
  getErrorMessage: '',
};

export const paymentReducer = createReducer(
  initialState,
  on(PaymentActions.create, (state, action) => {
    let newState: PaymentState = {
      ...state,
      isLoading: true,
      isSuccessful: false,
      createErrorMessage: '',
    };
    return newState;
  }),
  on(PaymentActions.createSuccess, (state, action) => {
    let newState: PaymentState = {
      ...state,
      isLoading: false,
      isSuccessful: true,
      createErrorMessage: '',
    };
    return newState;
  }),
  on(PaymentActions.createFailure, (state, action) => {
    let newState: PaymentState = {
      ...state,
      isLoading: false,
      isSuccessful: false,
      createErrorMessage: action.errorMessage,
    };
    return newState;
  }),
  on(PaymentActions.get, (state, action) => {
    let newState: PaymentState = {
      ...state,
      isgetting: true,
      isGetSuccess: false,
      getErrorMessage: '',
    };
    return newState;
  }),
  on(PaymentActions.getSuccess, (state, action) => {
    let newState: PaymentState = {
      ...state,
      isgetting: false,
      isGetSuccess: true,
      payment: action.payment,
    };
    return newState;
  }),
  on(PaymentActions.getFailure, (state, action) => {
    let newState: PaymentState = {
      ...state,
      isgetting: false,
      isGetSuccess: false,
      getErrorMessage: action.errorMessage,
    };
    return newState;
  }),
  on(PaymentActions.reset, (state, action) => {
    let newState: PaymentState = {
      ...state,
      isgetting: false,
      isGetSuccess: false,
      getErrorMessage: '',
      isLoading: false,
      isSuccessful: false,
      createErrorMessage: '',
    };
    return newState;
  }),
);
