import { Motor } from '../../model/motor.model';

export interface MotorState {
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  motorList: Motor[];

  selectedMotor: Motor;

  ////////////////////////////////////////////////////

  //////////////////////////////////////////////
  getMotorByCategoryId: boolean;
  getMotorByCategoryIdSuccess: boolean;
  getMotorByCategoryIdFailure: string;
  motorGetByCategoryId: Motor[];
  ////////////////////////////////
  isCreateLoading: boolean;
  isCreateSuccess: boolean;
  createErrMess: string;
  motor: Motor;
  ////////////////////////////////
  isUpdateLoading: boolean;
  isUpdateSuccess: boolean;
  updateErrMess: string;
  ////////////////////////////////
  isDeleteLoading: boolean;
  isDeleteSuccess: boolean;
  deleteErrMess: string;
  ////////////////////////////////
  isUpdateAllStatusTrueLoading: boolean;
  isUpdateAllStatusTrueSuccess: boolean;
  updateAllStatusTrueErrMess: string;
  //////////////////////////////
  isUpdateAllStatusFalseLoading: boolean;
  isUpdateAllStatusFalseSuccess: boolean;
  updateAllStatusFalseErrMess: string;
}
