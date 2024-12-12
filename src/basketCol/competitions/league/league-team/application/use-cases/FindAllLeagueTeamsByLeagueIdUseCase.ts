import { DomainError, Either, Result } from '@basketcol/domain';

import { FindAllLeagueTeamsByLeagueIdDTO } from '../dtos/FindAllLeagueTeamsByLeagueIdDTO';
import { IFindAllLeagueTeamsByLeagueIdUseCase, IFindAllLeagueTeamsByLeagueIdUseCaseResponse } from './ports/IFindAllLeagueTeamsByLeagueIdUseCase';
import { FindAllLeagueTeamsByLeagueIdHttpResponseDTO } from '../dtos/FindAllLeagueTeamsByLeagueIdHttpResponseDTO';
import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { DomainErrorMapper } from '../../../../../shared/application/mappers/DomainErrorMapper';
import { LeagueTeamDomainEntityMapper } from '../mappers/LeagueTeamDomainEntityMapper';
import { TeamDomainEntityMapper } from '../../../../../team/application/mappers/TeamDomainEntityMapper';
import { LeagueDomainEntityMapper } from '../../../application/mappers/LeagueDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindAllLeagueTeamsByLeagueIdUseCase implements IFindAllLeagueTeamsByLeagueIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindAllLeagueTeamsByLeagueIdUseCase {
    return new FindAllLeagueTeamsByLeagueIdUseCase(dependencies);
  }

  public async execute(dto: FindAllLeagueTeamsByLeagueIdDTO): Promise<Result<IFindAllLeagueTeamsByLeagueIdUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindAllLeagueTeamsByLeagueIdHttpResponseDTO>(
      `/competitions/leagues/${dto.leagueId}/teams`,
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
    data: FindAllLeagueTeamsByLeagueIdHttpResponseDTO,
  ): Result<IFindAllLeagueTeamsByLeagueIdUseCaseResponse> {
    const teamList = data.leagueTeams.map((leagueTeam) => leagueTeam.team);

    return Either.right({
      leagueTeams: data.leagueTeams.map((leagueTeam) => LeagueTeamDomainEntityMapper.mapToDomainEntity(leagueTeam)),
      teamList: teamList.map((team) => TeamDomainEntityMapper.mapToDomainEntity(team)),
      leagueInfo: LeagueDomainEntityMapper.mapToDomainEntity(data.leagueTeams[0].league),
    });
  }
}
