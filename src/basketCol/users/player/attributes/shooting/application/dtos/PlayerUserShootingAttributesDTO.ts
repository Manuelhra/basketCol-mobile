import { AggregateRootDTO } from '../../../../../../shared/application/dtos/AggregateRootDTO';

export interface PlayerUserShootingAttributesDTO extends AggregateRootDTO {
  closeShot: number;
  midRangeShot: number;
  threePointShot: number;
  freeThrow: number;
  playerUserId: string;
}
