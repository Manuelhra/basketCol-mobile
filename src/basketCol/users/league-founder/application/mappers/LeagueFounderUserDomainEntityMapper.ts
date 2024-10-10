import { LeagueFounderUser } from '@basketcol/domain';

import { LeagueFounderUserDTO } from '../dtos/LeagueFounderUserDTO';

export abstract class LeagueFounderUserDomainEntityMapper {
  public static mapToDomainEntity(dto: LeagueFounderUserDTO): LeagueFounderUser {
    return LeagueFounderUser.createWithoutPassword(
      dto.id,
      dto.name,
      dto.biography,
      dto.email,
      dto.accountStatus,
      dto.subscriptionType,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: LeagueFounderUser): LeagueFounderUserDTO {
    return {
      id: domainEntity.id.value,
      name: domainEntity.name.value,
      biography: domainEntity.biography.value,
      email: domainEntity.email.value,
      accountStatus: domainEntity.accountStatus.value,
      subscriptionType: domainEntity.subscriptionType.value,
      type: domainEntity.type.value,
      createdAt: domainEntity.createdAt.value,
      updatedAt: domainEntity.updatedAt.value,
    };
  }
}
