import { AggregateRootDTO } from '../../../shared/application/dtos/AggregateRootDTO';

export interface TeamDTO extends AggregateRootDTO {
  officialName: string;
  teamFounderUserId: string;
}
