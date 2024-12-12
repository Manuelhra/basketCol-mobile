import { League } from '@basketcol/domain';

import { LeagueHttpResponseDTO } from '../dtos/LeagueHttpResponseDTO';

export abstract class LeagueDomainEntityMapper {
  public static mapToDomainEntity(dto: LeagueHttpResponseDTO): League {
    return League.create(
      dto.id,
      dto.name,
      dto.description,
      dto.gender,
      dto.rules,
      dto.level,
      dto.location,
      dto.leagueFounderUserId,
      dto.establishmentDate,
      dto.isActive,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: League): LeagueHttpResponseDTO {
    return { ...domainEntity.toPrimitives };
  }
}
