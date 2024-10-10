import { DependencyContainerNotInitializedError } from '../../../shared/infrastructure/exceptions/DependencyContainerNotInitializedError';
import { AwilixAuthenticationDependencyInjector } from './awilix/AwilixAuthenticationDependencyInjector';

const awilixAuthenticationContainer = AwilixAuthenticationDependencyInjector.create().getContainer();

if (awilixAuthenticationContainer === null) {
  throw DependencyContainerNotInitializedError.create();
}

export const authenticateUserUseCase = awilixAuthenticationContainer.resolve('authenticateUserUseCase');
export const validateAndRefreshAuthenticationTokenUseCase = awilixAuthenticationContainer.resolve('validateAndRefreshAuthenticationTokenUseCase');
export const logoutUserUseCase = awilixAuthenticationContainer.resolve('logoutUserUseCase');
