import { LeagueSeasonFixture } from '@basketcol/domain';

import { LeagueSeasonFixtureHttpResponseDTO } from '../dtos/LeagueSeasonFixtureHttpResponseDTO';

export abstract class LeagueSeasonFixtureDomainEntityMapper {
  public static mapToDomainEntity(dto: LeagueSeasonFixtureHttpResponseDTO): LeagueSeasonFixture {
    return LeagueSeasonFixture.create(
      dto.id,
      dto.date,
      dto.name,
      dto.leagueSeasonId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: LeagueSeasonFixture): LeagueSeasonFixtureHttpResponseDTO {
    return { ...domainEntity.toPrimitives };
  }
}
