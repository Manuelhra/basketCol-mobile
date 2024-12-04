import { PlayerUserShootingAttributes } from '@basketcol/domain';

import { PlayerUserShootingAttributesHttpResponseDTO } from '../dtos/PlayerUserShootingAttributesHttpResponseDTO';

export abstract class PlayerUserShootingAttributeDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserShootingAttributesHttpResponseDTO): PlayerUserShootingAttributes {
    return PlayerUserShootingAttributes.create(
      dto.id,
      dto.closeShot,
      dto.midRangeShot,
      dto.threePointShot,
      dto.freeThrow,
      dto.playerUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUserShootingAttributes): PlayerUserShootingAttributesHttpResponseDTO {
    const {
      id,
      closeShot,
      freeThrow,
      midRangeShot,
      threePointShot,
      playerUserId,
      createdAt,
      updatedAt,
    } = domainEntity.toPrimitives;

    return {
      id,
      closeShot,
      freeThrow,
      midRangeShot,
      threePointShot,
      playerUserId,
      createdAt,
      updatedAt,
    };
  }
}
