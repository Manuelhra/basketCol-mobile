import { AggregateRootDTO } from '../../../../shared/application/dtos/AggregateRootDTO';

interface IItem {
  code: string;
  label: string;
}

export interface FacilityDTO extends AggregateRootDTO {
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
