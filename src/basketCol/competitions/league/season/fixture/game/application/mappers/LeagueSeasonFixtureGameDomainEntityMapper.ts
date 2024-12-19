import { LeagueSeasonFixtureGame } from '@basketcol/domain';

import { LeagueSeasonFixtureGameHttpResponseDTO } from '../dtos/LeagueSeasonFixtureGameHttpResponseDTO';

export abstract class LeagueSeasonFixtureGameDomainEntityMapper {
  public static mapToDomainEntity(dto: LeagueSeasonFixtureGameHttpResponseDTO): LeagueSeasonFixtureGame {
    return LeagueSeasonFixtureGame.create(
      dto.id,
      dto.startTime,
      dto.endTime,
      dto.homeTeamId,
      dto.awayTeamId,
      dto.homeScore,
      dto.awayScore,
      dto.gameType,
      dto.gameDuration.value,
      dto.quarter,
      dto.overtime,
      dto.overtimeNumber,
      dto.gameStatus,
      dto.headRefereeId,
      dto.assistantRefereeId,
      dto.courtId,
      dto.fixtureId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: LeagueSeasonFixtureGame): LeagueSeasonFixtureGameHttpResponseDTO {
    return { ...domainEntity.toPrimitives };
  }
}
