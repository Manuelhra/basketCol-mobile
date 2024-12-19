import { IAuthenticationTokenStorage } from '../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { IHttpClient } from '../../../../../shared/application/http/ports/IHttpClient';
import { IFindAllLeagueSeasonsByLeagueIdUseCase } from '../../application/use-cases/ports/IFindAllLeagueSeasonsByLeagueIdUseCase';
import { IFindLeagueSeasonByIdUseCase } from '../../application/use-cases/ports/IFindLeagueSeasonByIdUseCase';

export interface ILeagueSeasonContainer {
  findAllLeagueSeasonsByLeagueIdUseCase: IFindAllLeagueSeasonsByLeagueIdUseCase;
  findLeagueSeasonByIdUseCase: IFindLeagueSeasonByIdUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
