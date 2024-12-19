import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase } from '../../application/use-cases/ports/IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase';
import { IFindLeagueSeasonFixtureByIdUseCase } from '../../application/use-cases/ports/IFindLeagueSeasonFixtureByIdUseCase';

export interface ILeagueSeasonFixtureContainer {
  findAllLeagueSeasonFixturesByLeagueSeasonIdUseCase: IFindAllLeagueSeasonFixturesByLeagueSeasonIdUseCase;
  findLeagueSeasonFixtureByIdUseCase: IFindLeagueSeasonFixtureByIdUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
