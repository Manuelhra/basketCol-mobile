import { AggregateRootHttpResponseDTO } from '../../../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface LeagueSeasonAwardsHttpResponseDTO extends AggregateRootHttpResponseDTO {
  bestThreePointShooterId: string;
  bestTwoPointShooterId: string;
  bestFreeThrowShooterId: string;
  bestAssistProviderId: string;
  bestOffensiveRebounderId: string;
  bestDefensiveRebounderId: string;
  mostValuablePlayerId: string;
  championTeamId: string;
  leagueSeasonId: string;
}
