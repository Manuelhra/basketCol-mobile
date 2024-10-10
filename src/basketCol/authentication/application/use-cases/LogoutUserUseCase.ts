import { Result } from '@basketcol/domain';

import { ILogoutUserUseCase } from './ports/ILogoutUserUseCase';
import { IAuthenticationTokenStorage } from '../storage/ports/IAuthenticationTokenStorage';

type Dependencies = {
  authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class LogoutUserUseCase implements ILogoutUserUseCase {
  readonly #authenticationTokenStorage: IAuthenticationTokenStorage;

  private constructor(dependencies: Dependencies) {
    this.#authenticationTokenStorage = dependencies.authenticationTokenStorage;
  }

  public static create(dependencies: Dependencies): LogoutUserUseCase {
    return new LogoutUserUseCase(dependencies);
  }

  public async execute(): Promise<Result<void>> {
    return this.#authenticationTokenStorage.removeAuthenticationToken();
  }
}
