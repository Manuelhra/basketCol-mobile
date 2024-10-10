import { AggregateRootDTO } from '../../../../../../shared/application/dtos/AggregateRootDTO';

export interface PlayerUserReboundingAttributesDTO extends AggregateRootDTO {
  offensiveRebound: number;
  defensiveRebound: number;
  playerUserId: string;
}
