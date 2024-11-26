import { AnySystemUserType } from '@basketcol/domain';

import { IUseCase } from '../../../../shared/application/use-cases/ports/IUseCase';

export interface IGetAuthenticatedUserByAuthTokenUseCase extends IUseCase<void, AnySystemUserType> {}
