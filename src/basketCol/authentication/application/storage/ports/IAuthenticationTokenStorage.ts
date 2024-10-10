import { Result } from '@basketcol/domain';

export interface IAuthenticationTokenStorage {
  setStoreAuthenticationToken(token: string): Promise<Result<void>>;
  getAuthenticationToken(): Promise<Result<string>>;
  removeAuthenticationToken(): Promise<Result<void>>;
}
