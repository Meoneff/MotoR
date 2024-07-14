import { Payment } from '../../model/payment.model';

export interface PaymentState {
  payment: Payment;
  paymentList: Payment[];
  errorMessage: string | null;
  isLoading: boolean;
  isSuccessful: boolean;
  createErrorMessage: string;
  isGetSuccess: boolean;
  isGetting: boolean;
  getErrorMessage: string;
  isUpdateSuccess: boolean;
  isUpdating: boolean;
  updateErrorMessage: string;
  isUpdatePaymentMethodSuccess: boolean;
  isUpdatingPaymentMethod: boolean;
  updatePaymentMethodErrorMessage: string;
  isDeleteSuccess: boolean;
  isDeleting: boolean;
  deleteErrorMessage: string;
}
