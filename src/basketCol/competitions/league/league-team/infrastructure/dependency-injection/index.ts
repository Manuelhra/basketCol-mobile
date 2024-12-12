import { DependencyContainerNotInitializedError } from '../../../../../shared/infrastructure/exceptions/DependencyContainerNotInitializedError';
import { AwilixLeagueTeamDependencyInjector } from './awilix/AwilixLeagueTeamDependencyInjector';

const awilixLeagueTeamContainer = AwilixLeagueTeamDependencyInjector.create().getContainer();

if (awilixLeagueTeamContainer === null) {
  throw DependencyContainerNotInitializedError.create();
}

export const findAllLeagueTeamsByLeagueIdUseCase = awilixLeagueTeamContainer.resolve('findAllLeagueTeamsByLeagueIdUseCase');
