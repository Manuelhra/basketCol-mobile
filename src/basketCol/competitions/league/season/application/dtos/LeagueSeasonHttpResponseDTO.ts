import { AggregateRootHttpResponseDTO } from '../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface LeagueSeasonHttpResponseDTO extends AggregateRootHttpResponseDTO {
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  courtIdList: string[];
  leagueId: string;
}
