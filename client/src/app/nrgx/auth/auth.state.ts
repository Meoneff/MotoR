import { userFirebase } from '../../model/userFirebase.model';

export interface AuthState {
  userFirebase: userFirebase;
  isLoading: boolean;
  isSuccessful: boolean;
  errorMessage: string;
  isLogoutSuccess: boolean;
}
