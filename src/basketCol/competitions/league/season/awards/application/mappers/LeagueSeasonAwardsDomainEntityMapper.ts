import { LeagueSeasonAwards } from '@basketcol/domain';

import { LeagueSeasonAwardsHttpResponseDTO } from '../dtos/LeagueSeasonAwardsHttpResponseDTO';

export abstract class LeagueSeasonAwardsDomainEntityMapper {
  public static mapToDomainEntity(dto: LeagueSeasonAwardsHttpResponseDTO): LeagueSeasonAwards {
    return LeagueSeasonAwards.create(
      dto.id,
      dto.bestThreePointShooterId,
      dto.bestTwoPointShooterId,
      dto.bestFreeThrowShooterId,
      dto.bestAssistProviderId,
      dto.bestOffensiveRebounderId,
      dto.bestDefensiveRebounderId,
      dto.mostValuablePlayerId,
      dto.championTeamId,
      dto.leagueSeasonId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: LeagueSeasonAwards): LeagueSeasonAwardsHttpResponseDTO {
    return { ...domainEntity.toPrimitives };
  }
}
