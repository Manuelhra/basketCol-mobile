import { StatsHttpResponseDTO } from '../../../../../shared/application/dtos/StatsHttpResponseDTO';

export interface PlayerUserCareerStatsHttpResponseDTO extends StatsHttpResponseDTO {
  playerUserId: string;
}
