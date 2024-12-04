import { TeamAllTimeStatsHttpResponseDTO } from '../../all-time-stats/application/dtos/TeamAllTimeStatsHttpResponseDTO';
import { TeamHttpResponseDTO } from './TeamHttpResponseDTO';

export interface FindTeamByIdHttpResponseDTO {
  team: TeamHttpResponseDTO;
  teamAllTimeStats: TeamAllTimeStatsHttpResponseDTO;
}
