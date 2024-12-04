import { AggregateRootHttpResponseDTO } from '../../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface PlayerUserReboundingAttributesHttpResponseDTO extends AggregateRootHttpResponseDTO {
  offensiveRebound: number;
  defensiveRebound: number;
  playerUserId: string;
}
