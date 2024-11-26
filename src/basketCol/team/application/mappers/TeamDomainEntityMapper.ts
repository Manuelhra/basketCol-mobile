import { Team } from '@basketcol/domain';

import { TeamDTO } from '../dtos/TeamDTO';

export abstract class TeamDomainEntityMapper {
  public static mapToDomainEntity(dto: TeamDTO): Team {
    return Team.create(
      dto.id,
      dto.officialName,
      dto.gender,
      dto.logo,
      dto.mainImage,
      dto.gallery,
      dto.teamFounderUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: Team): TeamDTO {
    const {
      id,
      officialName,
      gender,
      logo,
      mainImage,
      gallery,
      teamFounderUserId,
      createdAt,
      updatedAt,
    } = domainEntity.toPrimitives;

    return {
      id,
      officialName,
      gender,
      logo,
      mainImage,
      gallery,
      teamFounderUserId,
      createdAt,
      updatedAt,
    };
  }
}
