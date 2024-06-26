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
  selectedDays: string;
  endDate: string;
  status: boolean;
  quantity: number;
  total: number;
  image: Storage;
}
