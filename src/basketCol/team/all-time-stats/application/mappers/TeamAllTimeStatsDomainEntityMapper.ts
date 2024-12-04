import { TeamAllTimeStats } from '@basketcol/domain';

import { TeamAllTimeStatsHttpResponseDTO } from '../dtos/TeamAllTimeStatsHttpResponseDTO';

export abstract class TeamAllTimeStatsDomainEntityMapper {
  public static mapToDomainEntity(dto: TeamAllTimeStatsHttpResponseDTO): TeamAllTimeStats {
    return TeamAllTimeStats.create(
      dto.id,
      dto.totalGamesPlayed,
      dto.totalGamesWon,
      dto.totalSeasonsLeaguePlayed,
      dto.totalSeasonsLeagueWon,
      dto.totalPoints,
      dto.totalOffensiveRebounds,
      dto.totalDefensiveRebounds,
      dto.totalAssists,
      dto.totalSteals,
      dto.totalBlocks,
      dto.totalFouls,
      dto.totalTurnovers,
      dto.totalThreePointersAttempted,
      dto.totalThreePointersMade,
      dto.totalFreeThrowsAttempted,
      dto.totalFreeThrowsMade,
      dto.totalFieldGoalsAttempted,
      dto.totalFieldGoalsMade,
      dto.teamId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: TeamAllTimeStats): TeamAllTimeStatsHttpResponseDTO {
    return { ...domainEntity.toPrimitives };
  }
}
