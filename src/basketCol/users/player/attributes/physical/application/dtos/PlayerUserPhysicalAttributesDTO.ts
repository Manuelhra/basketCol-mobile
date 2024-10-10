import { AggregateRootDTO } from '../../../../../../shared/application/dtos/AggregateRootDTO';

export interface PlayerUserPhysicalAttributesDTO extends AggregateRootDTO {
  speed: number;
  acceleration: number;
  strength: number;
  vertical: number;
  stamina: number;
  playerUserId: string;
}
