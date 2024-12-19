import { DependencyContainerNotInitializedError } from '../../../../../../shared/infrastructure/exceptions/DependencyContainerNotInitializedError';
import { AwilixLeagueSeasonAwardsDependencyInjector } from './awilix/AwilixLeagueSeasonAwardsDependencyInjector';

const awilixLeagueSeasonAwardsContainer = AwilixLeagueSeasonAwardsDependencyInjector.create().getContainer();

if (awilixLeagueSeasonAwardsContainer === null) {
  throw DependencyContainerNotInitializedError.create();
}

export const findLeagueSeasonAwardsByLeagueSeasonIdUseCase = awilixLeagueSeasonAwardsContainer.resolve('findLeagueSeasonAwardsByLeagueSeasonIdUseCase');
