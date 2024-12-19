import { DependencyContainerNotInitializedError } from '../../../../../../shared/infrastructure/exceptions/DependencyContainerNotInitializedError';
import { AwilixLeagueSeasonFixtureDependencyInjector } from './awilix/AwilixLeagueSeasonFixtureDependencyInjector';

const awilixLeagueSeasonFixtureContainer = AwilixLeagueSeasonFixtureDependencyInjector.create().getContainer();

if (awilixLeagueSeasonFixtureContainer === null) {
  throw DependencyContainerNotInitializedError.create();
}

export const findAllLeagueSeasonFixturesByLeagueSeasonIdUseCase = awilixLeagueSeasonFixtureContainer.resolve('findAllLeagueSeasonFixturesByLeagueSeasonIdUseCase');
export const findLeagueSeasonFixtureByIdUseCase = awilixLeagueSeasonFixtureContainer.resolve('findLeagueSeasonFixtureByIdUseCase');
