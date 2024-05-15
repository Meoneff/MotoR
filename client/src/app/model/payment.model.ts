import { Reservation } from './reservation.model';
import { User } from './user.model';

export interface Payment {
  paymentId: string;
  dayPayment: string;
  reservationId: Reservation;
  customerId: User;
}
