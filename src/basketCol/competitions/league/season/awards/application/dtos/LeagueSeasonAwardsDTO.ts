import { AggregateRootDTO } from '../../../../../../shared/application/dtos/AggregateRootDTO';

export interface LeagueSeasonAwardsDTO extends AggregateRootDTO {
  bestThreePointShooterId: string;
  bestTwoPointShooterId: string;
  bestFreeThrowShooterId: string;
  bestAssistProviderId: string;
  bestOffensiveRebounderId: string;
  bestDefensiveRebounderId: string;
  championTeamId: string;
  leagueSeasonId: string;
}
