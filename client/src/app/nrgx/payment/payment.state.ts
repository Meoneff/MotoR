import { Payment } from '../../model/payment.model';

export interface PaymentState {
  payment: Payment;
  isLoading: boolean;
  isSuccessful: boolean;
  createErrorMessage: string;
  isGetSuccess: boolean;
  isgetting: boolean;
  getErrorMessage: string;
}
