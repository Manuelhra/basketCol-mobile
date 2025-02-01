import { DependencyContainerNotInitializedError } from '../../../../../shared/infrastructure/exceptions/DependencyContainerNotInitializedError';
import { AwilixPlayerUserCareerStatsDependencyInjector } from './awilix/AwilixPlayerUserCareerStatsDependencyInjector';

const awilixPlayerUserCareerStatsContainer = AwilixPlayerUserCareerStatsDependencyInjector.create().getContainer();

if (awilixPlayerUserCareerStatsContainer === null) {
  throw DependencyContainerNotInitializedError.create();
}

export const findCareerStatsByPlayerUserIdUseCase = awilixPlayerUserCareerStatsContainer.resolve('findCareerStatsByPlayerUserIdUseCase');
