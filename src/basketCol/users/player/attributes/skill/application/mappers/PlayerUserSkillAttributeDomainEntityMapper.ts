import { PlayerUserSkillAttributes } from '@basketcol/domain';

import { PlayerUserSkillAttributesHttpResponseDTO } from '../dtos/PlayerUserSkillAttributesHttpResponseDTO';

export abstract class PlayerUserSkillAttributeDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserSkillAttributesHttpResponseDTO): PlayerUserSkillAttributes {
    return PlayerUserSkillAttributes.create(
      dto.id,
      dto.passAccuracy,
      dto.ballHandle,
      dto.speedWithBall,
      dto.playerUserId,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUserSkillAttributes): PlayerUserSkillAttributesHttpResponseDTO {
    const {
      id,
      ballHandle,
      passAccuracy,
      speedWithBall,
      playerUserId,
      createdAt,
      updatedAt,
    } = domainEntity.toPrimitives;

    return {
      id,
      ballHandle,
      passAccuracy,
      speedWithBall,
      playerUserId,
      createdAt,
      updatedAt,
    };
  }
}
