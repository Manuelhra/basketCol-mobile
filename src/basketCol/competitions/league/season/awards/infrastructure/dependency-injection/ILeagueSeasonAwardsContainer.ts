import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase } from '../../application/use-cases/ports/IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase';

export interface ILeagueSeasonAwardsContainer {
  findLeagueSeasonAwardsByLeagueSeasonIdUseCase: IFindLeagueSeasonAwardsByLeagueSeasonIdUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
