import { UserFirebase } from '../../model/userFirebase.model';
import * as LoginActions from '../../nrgx/auth/auth.actions';
import { AuthState } from '../../nrgx/auth/auth.state';
import { createReducer, on } from '@ngrx/store';

export const initialState: AuthState = {
  userFirebase: <UserFirebase>{},
  isLoading: false,
  isSuccessful: false,
  errorMessage: '',
  isLogoutSuccess: false,
};

export const authReducer = createReducer(
  initialState,
  on(LoginActions.login, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: true,
      isSuccessful: false,
      errorMessage: '',
    };
    return newState;
  }),

  on(LoginActions.loginSuccess, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isSuccessful: true,
      errorMessage: '',
    };
    return newState;
  }),

  on(LoginActions.loginFailure, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isSuccessful: false,
      errorMessage: action.errorMessage,
    };
    return newState;
  }),

  on(LoginActions.logout, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: true,
      isLogoutSuccess: false,
      errorMessage: '',
    };
    return newState;
  }),

  on(LoginActions.logoutSuccess, (state, action) => {
    console.log('logout success');

    let newState: AuthState = {
      ...state,
      isLoading: false,
      isLogoutSuccess: true,
      errorMessage: '',
    };
    return newState;
  }),

  on(LoginActions.logoutFailure, (state, action) => {
    let newState: AuthState = {
      ...state,
      isLoading: false,
      isLogoutSuccess: false,
      errorMessage: action.errorMessage,
    };
    return newState;
  }),
  on(LoginActions.storedUserFirebase, (state, { userFirebase, type }) => {
    console.log(type);
    return {
      ...state,
      userFirebase,
    };
  }),
  on(LoginActions.resetState, (state, action) => {
    let newState: AuthState = {
      ...state,
      userFirebase: <UserFirebase>{},
      isLoading: false,
      isSuccessful: false,
      errorMessage: '',
      isLogoutSuccess: false,
    };
    return newState;
  }),
);
