import { IAuthenticationTokenStorage } from '../../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../../shared/application/http/ports/IHttpClient';
import { IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase } from '../../application/use-cases/ports/IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase';

export interface ILeagueSeasonFixtureGameContainer {
  findAllLeagueSeasonFixtureGamesByFixtureIdUseCase: IFindAllLeagueSeasonFixtureGamesByFixtureIdUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
