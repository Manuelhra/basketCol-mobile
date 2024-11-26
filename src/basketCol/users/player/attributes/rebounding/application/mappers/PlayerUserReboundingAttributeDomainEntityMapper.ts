import { PlayerUserReboundingAttributes } from '@basketcol/domain';

import { PlayerUserReboundingAttributesDTO } from '../dtos/PlayerUserReboundingAttributesDTO';

export abstract class PlayerUserReboundingAttributeDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserReboundingAttributesDTO): PlayerUserReboundingAttributes {
    return PlayerUserReboundingAttributes.create(
      dto.id,
      dto.offensiveRebound,
      dto.defensiveRebound,
      dto.playerUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUserReboundingAttributes): PlayerUserReboundingAttributesDTO {
    const {
      id,
      defensiveRebound,
      offensiveRebound,
      playerUserId,
      createdAt,
      updatedAt,
    } = domainEntity.toPrimitives;

    return {
      id,
      defensiveRebound,
      offensiveRebound,
      playerUserId,
      createdAt,
      updatedAt,
    };
  }
}
