import { PlayerUser, Team, TeamPlayer } from '@basketcol/domain';

import { TeamPlayerHttpResponseDTO } from '../dtos/TeamPlayerHttpResponseDTO';

export abstract class TeamPlayerDomainEntityMapper {
  public static mapToDomainEntity(dto: TeamPlayerHttpResponseDTO): TeamPlayer {
    return TeamPlayer.create(
      dto.id,
      dto.team.id,
      dto.playerUser.id,
      dto.status,
      dto.jerseyNumber,
      dto.position,
      dto.joinedAt,
      dto.leftAt,
      dto.createdAt,
      dto.updatedAt,
    );
  }

  public static mapToDTO(domainEntity: TeamPlayer, team: Team, playerUser: PlayerUser): TeamPlayerHttpResponseDTO {
    const {
      id,
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
      team: team.toPrimitives,
      playerUser: playerUser.toPrimitives,
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
