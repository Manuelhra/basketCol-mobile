import { PlayerUserFinishingAttributes } from '@basketcol/domain';

import { PlayerUserFinishingAttributesHttpResponseDTO } from '../dtos/PlayerUserFinishingAttributesHttpResponseDTO';

export abstract class PlayerUserFinishingAttributeDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserFinishingAttributesHttpResponseDTO): PlayerUserFinishingAttributes {
    return PlayerUserFinishingAttributes.create(
      dto.id,
      dto.drivingLayup,
      dto.drivingDunk,
      dto.standingDunk,
      dto.postControl,
      dto.playerUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUserFinishingAttributes): PlayerUserFinishingAttributesHttpResponseDTO {
    const {
      id,
      drivingDunk,
      drivingLayup,
      standingDunk,
      postControl,
      playerUserId,
      createdAt,
      updatedAt,
    } = domainEntity.toPrimitives;

    return {
      id,
      drivingDunk,
      drivingLayup,
      standingDunk,
      postControl,
      playerUserId,
      createdAt,
      updatedAt,
    };
  }
}
