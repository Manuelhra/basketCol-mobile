import { AggregateRootHttpResponseDTO } from '../../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface PlayerUserShootingAttributesHttpResponseDTO extends AggregateRootHttpResponseDTO {
  closeShot: number;
  midRangeShot: number;
  threePointShot: number;
  freeThrow: number;
  playerUserId: string;
}
