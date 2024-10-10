import { useMutation } from '@tanstack/react-query';

import { AuthenticateUserDTO } from '../../../../basketCol/authentication/application/dtos/AuthenticateUserDTO';
import { IAuthenticateUserUseCase } from '../../../../basketCol/authentication/application/use-cases/ports/IAuthenticateUserUseCase';

export const useAuthenticateUser = (authenticateUserUseCase: IAuthenticateUserUseCase) => useMutation({
  mutationFn: async (dto: AuthenticateUserDTO) => authenticateUserUseCase.execute(dto),
});
