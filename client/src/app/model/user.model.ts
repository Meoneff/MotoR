import { Role } from './role.model';

export interface User {
  id: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  role: string;
  password: string;
}
