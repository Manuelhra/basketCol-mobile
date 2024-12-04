import { PlayerUserReboundingAttributes } from '@basketcol/domain';

import { PlayerUserReboundingAttributesHttpResponseDTO } from '../dtos/PlayerUserReboundingAttributesHttpResponseDTO';

export abstract class PlayerUserReboundingAttributeDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserReboundingAttributesHttpResponseDTO): PlayerUserReboundingAttributes {
    return PlayerUserReboundingAttributes.create(
      dto.id,
      dto.offensiveRebound,
      dto.defensiveRebound,
      dto.playerUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUserReboundingAttributes): PlayerUserReboundingAttributesHttpResponseDTO {
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
