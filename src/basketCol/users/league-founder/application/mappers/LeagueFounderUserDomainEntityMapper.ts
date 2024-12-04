import { LeagueFounderUser } from '@basketcol/domain';

import { LeagueFounderUserHttpResponseDTO } from '../dtos/LeagueFounderUserHttpResponseDTO';

export abstract class LeagueFounderUserDomainEntityMapper {
  public static mapToDomainEntity(dto: LeagueFounderUserHttpResponseDTO): LeagueFounderUser {
    return LeagueFounderUser.createWithoutPassword(
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

  public static mapToDTO(domainEntity: LeagueFounderUser): LeagueFounderUserHttpResponseDTO {
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
