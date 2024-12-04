import { AggregateRootHttpResponseDTO } from '../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

interface IItem {
  code: string;
  label: string;
}

export interface LeagueHttpResponseDTO extends AggregateRootHttpResponseDTO {
  name: {
    short: string;
    official: string;
  };
  description: {
    short: string;
    complete: string;
  };
  rules: string;
  level: string;
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
  leagueFounderUserId: string;
  isActive: boolean;
}
