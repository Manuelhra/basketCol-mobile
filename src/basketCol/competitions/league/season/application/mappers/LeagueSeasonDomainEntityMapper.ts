import { LeagueSeason } from '@basketcol/domain';

import { LeagueSeasonHttpResponseDTO } from '../dtos/LeagueSeasonHttpResponseDTO';

export abstract class LeagueSeasonDomainEntityMapper {
  public static mapToDomainEntity(dto: LeagueSeasonHttpResponseDTO): LeagueSeason {
    return LeagueSeason.create(
      dto.id,
      dto.name,
      dto.startDate,
      dto.endDate,
      dto.status,
      dto.courtIdList,
      dto.leagueId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: LeagueSeason): LeagueSeasonHttpResponseDTO {
    return { ...domainEntity.toPrimitives };
  }
}
