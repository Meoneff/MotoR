import { Category } from '../../model/category.model';

export interface categoryState {
  categories: Category[];
  isGetting: boolean;
  isGetSuccess: boolean;
  getErrorMessage: string;
}
