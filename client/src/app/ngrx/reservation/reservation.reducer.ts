import { Reservation } from '../../model/reservation.model';
import { ReservationState } from './reservation.state';
import * as ReservationActions from './reservation.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: ReservationState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  reservationList: [],
  isCreateLoading: false,
  isCreateSuccess: false,
  createErrMess: '',
  reservation: <Reservation>{},
  isRemoveLoading: false,
  isRemoveSuccess: false,
  removeErrMess: '',
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updateErrMess: '',
  isGetOneLoading: false,
  isGetOneSuccess: false,
  getOneErrMess: '',
  isGetBystartDateLoading: false,
  isGetBystartDateSuccess: false,
  getBystartDateErrMess: '',
  reservationListByStartDate: [],
  isGetByendDateLoading: false,
  isGetByendDateSuccess: false,
  getByendDateErrMess: '',
  reservationListByEndDate: [],
};

export const reservationReducer = createReducer(
  initialState,
  on(ReservationActions.create, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isCreateLoading: true,
      isCreateSuccess: false,
      createErrMess: '',
    };
    return newState;
  }),
  on(ReservationActions.createSuccess, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: true,
      createErrMess: '',
    };
    return newState;
  }),
  on(ReservationActions.createFailure, (state, action) => {
    console.log(action.errorMessage);

    let newState = {
      ...state,
      isCreateLoading: false,
      isCreateSuccess: false,
      createErrMess: action.errorMessage,
    };
    return newState;
  }),
  on(ReservationActions.get, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
    return newState;
  }),
  on(ReservationActions.getSuccess, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      getErrMess: '',
      reservationList: action.reservations,
    };
    return newState;
  }),
  on(ReservationActions.getFailure, (state, action) => {
    console.log(action.errorMessage);

    let newState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.errorMessage,
    };
    return newState;
  }),
  on(ReservationActions.getOne, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetOneLoading: true,
      isGetOneSuccess: false,
      getOneErrMess: '',
    };
    return newState;
  }),
  on(ReservationActions.getOneSuccess, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetOneLoading: false,
      isGetOneSuccess: true,
      getOneErrMess: '',
      reservation: action.reservation,
    };
    return newState;
  }),
  on(ReservationActions.getOneFailure, (state, action) => {
    console.log(action.errorMessage);

    let newState = {
      ...state,
      isGetOneLoading: false,
      isGetOneSuccess: false,
      getOneErrMess: action.errorMessage,
    };
    return newState;
  }),
  on(ReservationActions.reset, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: '',
      reservationList: [],
      isCreateLoading: false,
      isCreateSuccess: false,
      createErrMess: '',
      reservation: <Reservation>{},
      isRemoveLoading: false,
      isRemoveSuccess: false,
      removeErrMess: '',
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateErrMess: '',
      isGetOneLoading: false,
      isGetOneSuccess: false,
      getOneErrMess: '',
      isGetBystartDateLoading: false,
      isGetBystartDateSuccess: false,
      getBystartDateErrMess: '',
      reservationListByStartDate: [],
      isGetByendDateLoading: false,
      isGetByendDateSuccess: false,
      getByendDateErrMess: '',
    };
    return newState;
  }),
  on(ReservationActions.updateStatus, (state, { reservation }) => {
    if (!state) {
      return state;
    }

    return {
      ...state,
      reservationList: (state.reservationList || []).map((res: Reservation) =>
        res._id === reservation._id ? { ...res, status: true } : res,
      ),
    };
  }),
  on(ReservationActions.getReservationByStartDate, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetBystartDateLoading: true,
      isGetBystartDateSuccess: false,
      getBystartDateErrMess: '',
    };
    return newState;
  }),
  on(ReservationActions.getReservationByStartDateSuccess, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetBystartDateLoading: false,
      isGetBystartDateSuccess: true,
      getBystartDateErrMess: '',
      reservationListByStartDate: action.reservations,
    };
    return newState;
  }),
  on(ReservationActions.getReservationByStartDateFailure, (state, action) => {
    console.log(action.errorMessage);

    let newState = {
      ...state,
      isGetBystartDateLoading: false,
      isGetBystartDateSuccess: false,
      getBystartDateErrMess: action.errorMessage,
    };
    return newState;
  }),
  on(ReservationActions.getReservationByEndDate, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetByendDateLoading: true,
      isGetByendDateSuccess: false,
      getByendDateErrMess: '',
    };
    return newState;
  }),
  on(ReservationActions.getReservationByEndDateSuccess, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isGetByendDateLoading: false,
      isGetByendDateSuccess: true,
      getByendDateErrMess: '',
      reservationListByEndDate: action.reservations,
    };
    return newState;
  }),
  on(ReservationActions.getReservationByEndDateFailure, (state, action) => {
    console.log(action.errorMessage);

    let newState = {
      ...state,
      isGetByendDateLoading: false,
      isGetByendDateSuccess: false,
      getByendDateErrMess: action.errorMessage,
    };
    return newState;
  }),

  //delete
  on(ReservationActions.deleteReservation, (state, action) => {
    console.log(action.type);

    let newState = {
      ...state,
      isRemoveLoading: true,
      isRemoveSuccess: false,
      removeErrMess: '',
    };
    return newState;
  }),
);
