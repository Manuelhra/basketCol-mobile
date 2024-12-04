import { FacilityHttpResponseDTO } from '../../../shared/application/dtos/FacilityHttpResponseDTO';

export interface CourtHttpResponseDTO extends FacilityHttpResponseDTO {
  surface: string;
  hoopHeight: { value: number; unit: string };
  facilityId: string | null;
}
