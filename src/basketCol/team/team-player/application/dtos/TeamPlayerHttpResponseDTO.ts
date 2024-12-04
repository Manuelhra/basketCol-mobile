import { AggregateRootHttpResponseDTO } from '../../../../shared/application/dtos/AggregateRootHttpResponseDTO';
import { PlayerUserHttpResponseDTO } from '../../../../users/player/application/dtos/PlayerUserHttpResponseDTO';
import { TeamHttpResponseDTO } from '../../../application/dtos/TeamHttpResponseDTO';

export interface TeamPlayerHttpResponseDTO extends AggregateRootHttpResponseDTO {
  team: TeamHttpResponseDTO;
  playerUser: PlayerUserHttpResponseDTO;
  status: string;
  jerseyNumber: number | null;
  position: string | null;
  joinedAt: string;
  leftAt: string | null;
}
