import { AggregateRootHttpResponseDTO } from '../../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface PlayerUserDefensiveAttributesHttpResponseDTO extends AggregateRootHttpResponseDTO {
  interiorDefense: number;
  perimeterDefense: number;
  steal: number;
  block: number;
  playerUserId: string;
}
