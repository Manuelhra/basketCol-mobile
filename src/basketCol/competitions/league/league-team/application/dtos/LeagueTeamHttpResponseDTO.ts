import { AggregateRootHttpResponseDTO } from '../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface LeagueTeamHttpResponseDTO extends AggregateRootHttpResponseDTO {
  teamId: string;
  leagueId: string;
  status: string;
  joinedAt: string;
  leftAt: string | null;
  divisionLevel: string | null; // Para ligas con múltiples divisiones
  lastPromotionDate: string | null;
  lastRelegationDate: string | null;
}
