import { AggregateRootDTO } from '../../../../../../shared/application/dtos/AggregateRootDTO';

export interface PlayerUserDefensiveAttributesDTO extends AggregateRootDTO {
  interiorDefense: number;
  perimeterDefense: number;
  steal: number;
  block: number;
  playerUserId: string;
}
