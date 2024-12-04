import { PlayerUser } from '@basketcol/domain';

import { PlayerUserHttpResponseDTO } from '../dtos/PlayerUserHttpResponseDTO';

export abstract class PlayerUserDomainEntityMapper {
  public static mapToDomainEntity(dto: PlayerUserHttpResponseDTO): PlayerUser {
    return PlayerUser.createWithoutPassword(
      dto.id,
      dto.name,
      dto.biography,
      dto.nickname,
      dto.email,
      dto.gender,
      dto.accountStatus,
      dto.subscriptionType,
      dto.profileImage,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: PlayerUser): PlayerUserHttpResponseDTO {
    return {
      id: domainEntity.id.value,
      name: domainEntity.name.value,
      biography: domainEntity.biography.value,
      nickname: domainEntity.nickname.value,
      email: domainEntity.email.value,
      accountStatus: domainEntity.accountStatus.value,
      subscriptionType: domainEntity.subscriptionType.value,
      gender: domainEntity.gender.value,
      profileImage: domainEntity.profileImage.value,
      type: domainEntity.type.value,
      createdAt: domainEntity.createdAt.value,
      updatedAt: domainEntity.updatedAt.value,
    };
  }
}
