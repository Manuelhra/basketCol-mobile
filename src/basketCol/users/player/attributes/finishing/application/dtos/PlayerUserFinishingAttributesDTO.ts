import { AggregateRootDTO } from '../../../../../../shared/application/dtos/AggregateRootDTO';

export interface PlayerUserFinishingAttributesDTO extends AggregateRootDTO {
  drivingLayup: number;
  drivingDunk: number;
  standingDunk: number;
  postControl: number;
  playerUserId: string;
}
