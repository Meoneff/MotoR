import { Storage } from '../../model/storage.model';

export interface StorageState {
  storage: Storage;
  isCreating: boolean;
  isCreateSuccess: boolean;
  createErrorMessage: string;
  isGetting: boolean;
  isGetSuccess: boolean;
  getErrorMessage: string;
}
