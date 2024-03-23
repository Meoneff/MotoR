export interface AuthState {
  idToken: string;
  isLoading: boolean;
  isSuccessful: boolean;
  errorMessage: string;
  uid: string;
  isLogoutSuccess: boolean;
  logoutErrorMessage: string;
}
