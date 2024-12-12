import { LeagueTeam } from '@basketcol/domain';

import { LeagueTeamHttpResponseDTO } from '../dtos/LeagueTeamHttpResponseDTO';

export abstract class LeagueTeamDomainEntityMapper {
  public static mapToDomainEntity(dto: LeagueTeamHttpResponseDTO): LeagueTeam {
    return LeagueTeam.create(
      dto.id,
      dto.teamId,
      dto.leagueId,
      dto.status,
      dto.joinedAt,
      dto.leftAt,
      dto.divisionLevel,
      dto.lastPromotionDate,
      dto.lastRelegationDate,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: any): LeagueTeamHttpResponseDTO {
    return { ...domainEntity };
  }
}
