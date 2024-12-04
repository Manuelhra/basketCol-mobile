import { Team } from '@basketcol/domain';

import { TeamHttpResponseDTO } from '../dtos/TeamHttpResponseDTO';

export abstract class TeamDomainEntityMapper {
  public static mapToDomainEntity(dto: TeamHttpResponseDTO): Team {
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

  public static mapToDTO(domainEntity: Team): TeamHttpResponseDTO {
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
