import { AggregateRootDTO } from '../../../../../../shared/application/dtos/AggregateRootDTO';

export interface PlayerUserSkillAttributesDTO extends AggregateRootDTO {
  passAccuracy: number;
  ballHandle: number;
  speedWithBall: number;
  playerUserId: string;
}
