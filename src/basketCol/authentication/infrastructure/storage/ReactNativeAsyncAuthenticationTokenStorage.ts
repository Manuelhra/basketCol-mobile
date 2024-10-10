import { DomainError, Either, Result } from '@basketcol/domain';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IAuthenticationTokenStorage } from '../../application/storage/ports/IAuthenticationTokenStorage';

export class ReactNativeAsyncAuthenticationTokenStorage implements IAuthenticationTokenStorage {
  readonly #authenticationTokenKey: string = 'authentication_token';

  public static create(): ReactNativeAsyncAuthenticationTokenStorage {
    return new ReactNativeAsyncAuthenticationTokenStorage();
  }

  public async setStoreAuthenticationToken(token: string): Promise<Result<void>> {
    try {
      await AsyncStorage.setItem(this.#authenticationTokenKey, token);

      return Either.right(null);
    } catch (error) {
      const domainError = DomainError.createSingle('SET_AUTHENTICATION_TOKEN_ERROR', 'Error setting authentication token');
      return Either.left({ type: 'single', error: domainError });
    }
  }

  public async getAuthenticationToken(): Promise<Result<string>> {
    try {
      const authenticationToken = await AsyncStorage.getItem(this.#authenticationTokenKey);

      if (authenticationToken === null) {
        const domainError = DomainError.createSingle('GET_AUTHENTICATION_TOKEN_ERROR', 'Error getting authentication token');
        return Either.left({ type: 'single', error: domainError });
      }

      return Either.right(authenticationToken);
    } catch (error) {
      const domainError = DomainError.createSingle('GET_AUTHENTICATION_TOKEN_ERROR', 'Error getting authentication token');
      return Either.left({ type: 'single', error: domainError });
    }
  }

  public async removeAuthenticationToken(): Promise<Result<void>> {
    try {
      await AsyncStorage.removeItem(this.#authenticationTokenKey);

      return Either.right(null);
    } catch (error) {
      const domainError = DomainError.createSingle('REMOVE_AUTHENTICATION_TOKEN_ERROR', 'Error removing authentication token');
      return Either.left({ type: 'single', error: domainError });
    }
  }
}
