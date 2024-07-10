import { User } from '../../model/user.model';

export interface UserState {
  user: User;
  isCreateSussess: boolean;
  isCreateLoading: boolean;
  createErrMess: string;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
}
