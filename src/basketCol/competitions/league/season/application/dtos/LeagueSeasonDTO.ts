import { AggregateRootDTO } from '../../../../../shared/application/dtos/AggregateRootDTO';

export interface LeagueSeasonDTO extends AggregateRootDTO {
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  courtIdList: string[];
  leagueId: string;
}
