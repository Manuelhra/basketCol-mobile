import { DomainError, Either, Result } from '@basketcol/domain';

import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { FindLeagueSeasonAwardsByLeagueSeasonIdDTO } from '../dtos/FindLeagueSeasonAwardsByLeagueSeasonIdDTO';
import { IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase, IFindLeagueSeasonAwardsByLeagueSeasonIdUseCaseResponse } from './ports/IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase';
import { DomainErrorMapper } from '../../../../../../shared/application/mappers/DomainErrorMapper';
import { FindLeagueSeasonAwardsByLeagueSeasonIdHttpResponseDTO } from '../dtos/FindLeagueSeasonAwardsByLeagueSeasonIdHttpResponseDTO';
import { LeagueSeasonAwardsDomainEntityMapper } from '../mappers/LeagueSeasonAwardsDomainEntityMapper';
import { LeagueSeasonDomainEntityMapper } from '../../../application/mappers/LeagueSeasonDomainEntityMapper';
import { PlayerUserDomainEntityMapper } from '../../../../../../users/player/application/mappers/PlayerUserDomainEntityMapper';
import { TeamDomainEntityMapper } from '../../../../../../team/application/mappers/TeamDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindLeagueSeasonAwardsByLeagueSeasonIdUseCase implements IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindLeagueSeasonAwardsByLeagueSeasonIdUseCase {
    return new FindLeagueSeasonAwardsByLeagueSeasonIdUseCase(dependencies);
  }

  public async execute(dto: FindLeagueSeasonAwardsByLeagueSeasonIdDTO): Promise<Result<IFindLeagueSeasonAwardsByLeagueSeasonIdUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindLeagueSeasonAwardsByLeagueSeasonIdHttpResponseDTO>(
      `/competitions/leagues/seasons/${dto.leagueSeasonId}/awards`,
      { headers: { Authorization: `Bearer ${authenticationToken}` } },
    );

    if (httpResult.isLeft) {
      const errorResponseInfo = httpResult.left();
      return DomainErrorMapper.execute(errorResponseInfo);
    }

    const successResponseInfo = httpResult.right();
    return this.#handleSuccessResponse(successResponseInfo.data);
  }

  #handleSuccessResponse(
    data: FindLeagueSeasonAwardsByLeagueSeasonIdHttpResponseDTO,
  ): Result<IFindLeagueSeasonAwardsByLeagueSeasonIdUseCaseResponse> {
    if (data === null) return Either.right(null);

    const { leagueSeasonAwards } = data;
    const playerAwards = [
      leagueSeasonAwards.bestThreePointShooter,
      leagueSeasonAwards.bestTwoPointShooter,
      leagueSeasonAwards.bestAssistProvider,
      leagueSeasonAwards.bestDefensiveRebounder,
      leagueSeasonAwards.bestFreeThrowShooter,
      leagueSeasonAwards.bestOffensiveRebounder,
      leagueSeasonAwards.mostValuablePlayer,
    ];

    return Either.right({
      leagueSeasonAwards: LeagueSeasonAwardsDomainEntityMapper.mapToDomainEntity(leagueSeasonAwards),
      leagueSeason: LeagueSeasonDomainEntityMapper.mapToDomainEntity(leagueSeasonAwards.leagueSeason),
      playerUserList: playerAwards.map(PlayerUserDomainEntityMapper.mapToDomainEntity),
      championTeam: TeamDomainEntityMapper.mapToDomainEntity(leagueSeasonAwards.championTeam),
    });
  }
}
