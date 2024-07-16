import { Reservation } from './reservation.model';
import { User } from './user.model';

export interface Payment {
  paymentId: string;
  dayPayment: string;
  reservationIds: { id: string }[];
  customerId: { name: string };
  status: boolean;
  isPaid: boolean;
  amount: number;
  paymentMethod: PaymentMethod;
}

export interface PaymentMethod {
  name: string;
  logo: string;
  value: string;
}
