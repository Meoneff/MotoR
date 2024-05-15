import { Motor } from '../../model/motor.model';

export interface MotorState {
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  motors: Motor[];
  selectedMotor: Motor[];
}
