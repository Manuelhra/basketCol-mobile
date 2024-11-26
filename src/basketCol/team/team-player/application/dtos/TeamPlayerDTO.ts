import { AggregateRootDTO } from '../../../../shared/application/dtos/AggregateRootDTO';

export interface TeamPlayerDTO extends AggregateRootDTO {
  teamId: string;
  playerUserId: string;
  status: string;
  jerseyNumber: number | null;
  position: string | null;
  joinedAt: string;
  leftAt: string | null;
}
