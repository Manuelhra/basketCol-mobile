import { AggregateRootHttpResponseDTO } from '../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

interface IItem {
  code: string;
  label: string;
}

export interface FacilityHttpResponseDTO extends AggregateRootHttpResponseDTO {
  officialName: string;
  location: {
    country: IItem;
    department: IItem;
    city: IItem;
    coords: {
      lat: number;
      lng: number;
    };
  };
  establishmentDate: string;
  registeredById: string;
}
