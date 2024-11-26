import { PlayerUserDefensiveAttributes } from '@basketcol/domain';

import { PlayerUserDefensiveAttributesDTO } from '../dtos/PlayerUserDefensiveAttributesDTO';

export abstract class PlayerUserDefensiveAttributeDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserDefensiveAttributesDTO): PlayerUserDefensiveAttributes {
    return PlayerUserDefensiveAttributes.create(
      dto.id,
      dto.interiorDefense,
      dto.perimeterDefense,
      dto.steal,
      dto.block,
      dto.playerUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUserDefensiveAttributes): PlayerUserDefensiveAttributesDTO {
    const {
      id,
      interiorDefense,
      perimeterDefense,
      steal,
      block,
      playerUserId,
      createdAt,
      updatedAt,
    } = domainEntity.toPrimitives;

    return {
      id,
      interiorDefense,
      perimeterDefense,
      steal,
      block,
      playerUserId,
      createdAt,
      updatedAt,
    };
  }
}
