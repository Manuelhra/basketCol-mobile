import { PlayerUserPhysicalAttributes } from '@basketcol/domain';

import { PlayerUserPhysicalAttributesDTO } from '../dtos/PlayerUserPhysicalAttributesDTO';

export abstract class PlayerUserPhysicalAttributeDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserPhysicalAttributesDTO): PlayerUserPhysicalAttributes {
    return PlayerUserPhysicalAttributes.create(
      dto.id,
      dto.speed,
      dto.acceleration,
      dto.strength,
      dto.vertical,
      dto.stamina,
      dto.playerUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUserPhysicalAttributes): PlayerUserPhysicalAttributesDTO {
    const {
      id,
      acceleration,
      speed,
      stamina,
      strength,
      vertical,
      playerUserId,
      createdAt,
      updatedAt,
    } = domainEntity.toPrimitives;

    return {
      id,
      acceleration,
      speed,
      stamina,
      strength,
      vertical,
      playerUserId,
      createdAt,
      updatedAt,
    };
  }
}
