import { IHttpClient } from '../../../shared/application/http/ports/IHttpClient';
import { IAuthenticationTokenStorage } from '../../application/storage/ports/IAuthenticationTokenStorage';
import { IAuthenticateUserUseCase } from '../../application/use-cases/ports/IAuthenticateUserUseCase';
import { IGetAuthenticatedUserByAuthTokenUseCase } from '../../application/use-cases/ports/IGetAuthenticatedUserByAuthTokenUseCase';
import { ILogoutUserUseCase } from '../../application/use-cases/ports/ILogoutUserUseCase';
import { IValidateAndRefreshAuthenticationTokenUseCase } from '../../application/use-cases/ports/IValidateAndRefreshAuthenticationTokenUseCase';

export interface IAuthenticationContainer {
  authenticateUserUseCase: IAuthenticateUserUseCase;
  validateAndRefreshAuthenticationTokenUseCase: IValidateAndRefreshAuthenticationTokenUseCase;
  logoutUserUseCase: ILogoutUserUseCase;
  getAuthenticatedUserByAuthTokenUseCase: IGetAuthenticatedUserByAuthTokenUseCase;
  basketColHttpClient: IHttpClient;
  authenticationTokenStorage: IAuthenticationTokenStorage;
}
