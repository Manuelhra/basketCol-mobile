import { TeamPlayer } from '@basketcol/domain';

import { TeamPlayerDTO } from '../dtos/TeamPlayerDTO';

export abstract class TeamPlayerDomainEntityMapper {
  public static mapToDomainEntity(dto: TeamPlayerDTO): TeamPlayer {
    return TeamPlayer.create(
      dto.id,
      dto.teamId,
      dto.playerUserId,
      dto.status,
      dto.jerseyNumber,
      dto.position,
      dto.joinedAt,
      dto.leftAt,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: TeamPlayer): TeamPlayerDTO {
    const {
      id,
      teamId,
      playerUserId,
      status,
      jerseyNumber,
      position,
      joinedAt,
      leftAt,
      createdAt,
      updatedAt,
    } = domainEntity.toPrimitives;

    return {
      id,
      teamId,
      playerUserId,
      status,
      jerseyNumber,
      position,
      joinedAt,
      leftAt,
      createdAt,
      updatedAt,
    };
  }
}
