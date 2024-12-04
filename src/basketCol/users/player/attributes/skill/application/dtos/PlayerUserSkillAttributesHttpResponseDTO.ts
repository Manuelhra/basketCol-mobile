import { AggregateRootHttpResponseDTO } from '../../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface PlayerUserSkillAttributesHttpResponseDTO extends AggregateRootHttpResponseDTO {
  passAccuracy: number;
  ballHandle: number;
  speedWithBall: number;
  playerUserId: string;
}
