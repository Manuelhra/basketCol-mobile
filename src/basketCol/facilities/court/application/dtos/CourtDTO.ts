import { FacilityDTO } from '../../../shared/application/dtos/FacilityDTO';

export interface ICourtDTO extends FacilityDTO {
  surface: string;
  hoopHeight: { value: number; unit: string };
  facilityId: string | null;
}
