import { DependencyContainerNotInitializedError } from '../../../../shared/infrastructure/exceptions/DependencyContainerNotInitializedError';
import { AwilixTeamPlayerDependencyInjector } from './awilix/AwilixTeamPlayerDependencyInjector';

const awilixTeamPlayerContainer = AwilixTeamPlayerDependencyInjector.create().getContainer();

if (awilixTeamPlayerContainer === null) {
  throw DependencyContainerNotInitializedError.create();
}

export const findTeamActivePlayerUseCase = awilixTeamPlayerContainer.resolve('findTeamActivePlayerUseCase');
