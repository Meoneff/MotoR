import { Manufacturer } from '../../model/manufacturer.model';

export interface ManufacturerState {
  manufacturers: Manufacturer[];
  isGetting: boolean;
  isGetSuccess: boolean;
  getErrorMessage: string;
}
