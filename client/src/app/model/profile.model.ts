import { Role } from './role.model';

export interface Profile {
  _id: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  role: Role;
  password: string;
}
