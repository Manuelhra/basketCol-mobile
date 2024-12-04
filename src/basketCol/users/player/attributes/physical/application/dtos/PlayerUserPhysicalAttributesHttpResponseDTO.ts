import { AggregateRootHttpResponseDTO } from '../../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface PlayerUserPhysicalAttributesHttpResponseDTO extends AggregateRootHttpResponseDTO {
  speed: number;
  acceleration: number;
  strength: number;
  vertical: number;
  stamina: number;
  playerUserId: string;
}
