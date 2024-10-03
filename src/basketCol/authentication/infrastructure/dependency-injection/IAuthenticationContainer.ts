import { IHttpClient } from '../../../shared/application/http/ports/IHttpClient';
import { IAuthenticationTokenStorage } from '../../application/storage/ports/IAuthenticationTokenStorage';
import { IAuthenticateUserUseCase } from '../../application/use-cases/ports/IAuthenticateUserUseCase';

export interface IAuthenticationContainer {
  authenticateUserUseCase: IAuthenticateUserUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
