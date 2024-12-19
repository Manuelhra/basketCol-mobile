import { AggregateRootHttpResponseDTO } from '../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface FixtureGameHttpResponseDTO extends AggregateRootHttpResponseDTO {
  startTime: string;
  endTime: string | null;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  gameType: string;
  gameDuration: { value: number; unit: string };
  quarter: number | null;
  overtime: boolean;
  overtimeNumber: number | null;
  gameStatus: string;
  headRefereeId: string;
  assistantRefereeId: string;
  courtId: string;
  fixtureId: string;
}
