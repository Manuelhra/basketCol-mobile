import { HostUser } from '@basketcol/domain';

import { HostUserDTO } from '../dtos/HostUserDTO';

export abstract class HostUserDomainEntityMapper {
  public static mapToDomainEntity(dto: HostUserDTO): HostUser {
    return HostUser.createWithoutPassword(
      dto.id,
      dto.name,
      dto.biography,
      dto.email,
      dto.gender,
      dto.accountStatus,
      dto.subscriptionType,
      dto.profileImage,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: HostUser): HostUserDTO {
    return {
      id: domainEntity.id.value,
      name: domainEntity.name.value,
      biography: domainEntity.biography.value,
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
