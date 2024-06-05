import { Motor } from './motor.model';
import { Storage } from './storage.model';
import { User } from './user.model';

export interface Reservation {
  _id: string;
  reservationId: string;
  motorId: Motor;
  customerId: User;
  startDate: string;
  city: string;
  quantityMotor: number;
  endDate: string;
  status: boolean;
  total: number;
  image: Storage;
}
