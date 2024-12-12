import {
  Result,
  LeagueSeason,
  DomainError,
  Either,
} from '@basketcol/domain';

import { FindAllLeagueSeasonsByLeagueIdDTO } from '../dtos/FindAllLeagueSeasonsByLeagueIdDTO';
import { IFindAllLeagueSeasonsByLeagueIdUseCase } from './ports/IFindAllLeagueSeasonsByLeagueIdUseCase';
import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { FindAllLeagueSeasonsByLeagueIdHttpResponseDTO } from '../dtos/FindAllLeagueSeasonsByLeagueIdHttpResponseDTO';
import { DomainErrorMapper } from '../../../../../shared/application/mappers/DomainErrorMapper';
import { LeagueSeasonDomainEntityMapper } from '../mappers/LeagueSeasonDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class FindAllLeagueSeasonsByLeagueIdUseCase implements IFindAllLeagueSeasonsByLeagueIdUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): FindAllLeagueSeasonsByLeagueIdUseCase {
    return new FindAllLeagueSeasonsByLeagueIdUseCase(dependencies);
  }

  public async execute(dto: FindAllLeagueSeasonsByLeagueIdDTO): Promise<Result<LeagueSeason[]>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<FindAllLeagueSeasonsByLeagueIdHttpResponseDTO>(
      `/competitions/leagues/${dto.leagueId}/seasons`,
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
    data: FindAllLeagueSeasonsByLeagueIdHttpResponseDTO,
  ): Result<LeagueSeason[]> {
    return Either.right(data.leagueSeasons.map((leagueSeason) => LeagueSeasonDomainEntityMapper.mapToDomainEntity(leagueSeason)));
  }
}
