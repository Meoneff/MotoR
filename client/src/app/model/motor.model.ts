import { Category } from './category.model';
import { Manufacturer } from './manufacturer.model';
import { Storage } from './storage.model';

export interface Motor {
  _id: string;
  motorId: string;
  name: string;
  model: string;
  categoryId: Category;
  manufacturerId: Manufacturer;
  price: number;
  description: string;
  image: Storage;
  status: boolean;
  quantity: number;
}
