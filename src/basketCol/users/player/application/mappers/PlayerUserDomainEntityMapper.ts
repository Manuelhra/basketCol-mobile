import { PlayerUser } from '@basketcol/domain';

import { PlayerUserDTO } from '../dtos/PlayerUserDTO';

export abstract class PlayerUserDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserDTO): PlayerUser {
    return PlayerUser.createWithoutPassword(
      dto.id,
      dto.name,
      dto.biography,
      dto.nickname,
      dto.email,
      dto.accountStatus,
      dto.subscriptionType,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUser): PlayerUserDTO {
    return {
      id: domainEntity.id.value,
      name: domainEntity.name.value,
      biography: domainEntity.biography.value,
      nickname: domainEntity.nickname.value,
      email: domainEntity.email.value,
      accountStatus: domainEntity.accountStatus.value,
      subscriptionType: domainEntity.subscriptionType.value,
      type: domainEntity.type.value,
      createdAt: domainEntity.createdAt.value,
      updatedAt: domainEntity.updatedAt.value,
    };
  }
}
