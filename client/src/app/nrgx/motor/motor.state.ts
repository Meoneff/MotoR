import { Motor } from '../../model/motor.model';

export interface MotorState {
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  motorList: Motor[];
  selectedMotor: Motor[];
}
