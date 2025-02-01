import { PlayerUserCareerStats } from '@basketcol/domain';

import { PlayerUserCareerStatsHttpResponseDTO } from '../dtos/PlayerUserCareerStatsHttpResponseDTO';

export abstract class PlayerUserCareerStatsDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserCareerStatsHttpResponseDTO): PlayerUserCareerStats {
    return PlayerUserCareerStats.create(
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
      dto.playerUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUserCareerStats): PlayerUserCareerStatsHttpResponseDTO {
    return { ...domainEntity.toPrimitives };
  }
}
