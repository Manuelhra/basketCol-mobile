import { DependencyContainerNotInitializedError } from '../../../../../../shared/infrastructure/exceptions/DependencyContainerNotInitializedError';
import { AwilixPlayerUserAttributesDependencyInjector } from './awilix/AwilixPlayerUserAttributesDependencyInjector';

const awilixPlayerUserAttributesContainer = AwilixPlayerUserAttributesDependencyInjector.create().getContainer();

if (awilixPlayerUserAttributesContainer === null) {
  throw DependencyContainerNotInitializedError.create();
}

export const getPlayerUserAttributeCategoriesUseCase = awilixPlayerUserAttributesContainer.resolve('getPlayerUserAttributeCategoriesUseCase');
