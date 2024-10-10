import { AnySystemUserType } from '@basketcol/domain';

import { IUseCase } from '../../../../shared/application/use-cases/ports/IUseCase';
import { AuthenticateUserDTO } from '../../dtos/AuthenticateUserDTO';

export interface IAuthenticateUserUseCase extends IUseCase<
AuthenticateUserDTO,
{
  authenticatedUser: AnySystemUserType;
  authenticationToken: string;
}
> {}
