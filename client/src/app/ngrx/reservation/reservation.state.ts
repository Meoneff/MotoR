import { Reservation } from '../../model/reservation.model';

export interface ReservationState {
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  reservationList: Reservation[];
  isCreateLoading: boolean;
  isCreateSuccess: boolean;
  createErrMess: string;
  reservation: Reservation;
  isRemoveLoading: boolean;
  isRemoveSuccess: boolean;
  removeErrMess: string;
  isUpdateLoading: boolean;
  isUpdateSuccess: boolean;
  updateErrMess: string;
  isGetOneLoading: boolean;
  isGetOneSuccess: boolean;
  getOneErrMess: string;
  isGetBystartDateLoading: boolean;
  isGetBystartDateSuccess: boolean;
  getBystartDateErrMess: string;
  reservationListByStartDate: Reservation[];
  isGetByendDateLoading: boolean;
  isGetByendDateSuccess: boolean;
  getByendDateErrMess: string;
  reservationListByEndDate: Reservation[];
}
