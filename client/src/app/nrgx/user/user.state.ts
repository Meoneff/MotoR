import { User } from '../../model/user.model';

export interface UserState {
  user: User;
  // isLoading: boolean;
  // isSuccess: boolean;
  errorMessage: string;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrorMessage: string;
  createErrMess: string;
  isCreateSussess: boolean;
  isCreateLoading: boolean;
}
