import { AggregateRootDTO } from '../../../../shared/application/dtos/AggregateRootDTO';

interface IFixtureGameBoxScoreBasic {
  points: number;
  offensiveRebounds: number;
  defensiveRebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fouls: number;
  turnovers: number;
}

interface IFixtureGameBoxScoreShooting {
  threePointersAttempted: number;
  threePointersMade: number;
  freeThrowsAttempted: number;
  freeThrowsMade: number;
  fieldGoalsAttempted: number;
  fieldGoalsMade: number;
}

export interface FixtureGameBoxScoreDTO extends AggregateRootDTO, IFixtureGameBoxScoreBasic, IFixtureGameBoxScoreShooting {
  fixtureGameId: string;
}
