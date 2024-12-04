import { AggregateRootHttpResponseDTO } from '../../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface PlayerUserFinishingAttributesHttpResponseDTO extends AggregateRootHttpResponseDTO {
  drivingLayup: number;
  drivingDunk: number;
  standingDunk: number;
  postControl: number;
  playerUserId: string;
}
