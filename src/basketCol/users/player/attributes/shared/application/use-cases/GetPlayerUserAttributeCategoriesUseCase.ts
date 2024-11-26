import { DomainError, Either, Result } from '@basketcol/domain';

import { IHttpClient } from '../../../../../../shared/application/http/ports/IHttpClient';
import { GetPlayerUserAttributeCategoriesDTO } from '../dtos/GetPlayerUserAttributeCategoriesDTO';
import { IGetPlayerUserAttributeCategoriesUseCase, IGetPlayerUserAttributeCategoriesUseCaseResponse } from './ports/IGetPlayerUserAttributeCategoriesUseCase';
import { IAuthenticationTokenStorage } from '../../../../../../authentication/application/storage/ports/IAuthenticationTokenStorage';
import { DomainErrorMapper } from '../../../../../../shared/application/mappers/DomainErrorMapper';
import { PlayerUserDefensiveAttributeDomainEntityMapper } from '../../../defensive/application/mappers/DefensiveAttributeDomainEntityMapper';
import { PlayerUserFinishingAttributeDomainEntityMapper } from '../../../finishing/application/mappers/PlayerUserFinishingAttributeDomainEntityMapper';
import { PlayerUserPhysicalAttributeDomainEntityMapper } from '../../../physical/application/mappers/PlayerUserPhysicalAttributeDomainEntityMapper';
import { PlayerUserReboundingAttributeDomainEntityMapper } from '../../../rebounding/application/mappers/PlayerUserReboundingAttributeDomainEntityMapper';
import { PlayerUserShootingAttributeDomainEntityMapper } from '../../../shooting/application/mappers/PlayerUserShootingAttributeDomainEntityMapper';
import { PlayerUserSkillAttributeDomainEntityMapper } from '../../../skill/application/mappers/PlayerUserSkillAttributeDomainEntityMapper';

type Dependencies = {
  readonly basketColHttpClient: IHttpClient;
  readonly authenticationTokenStorage: IAuthenticationTokenStorage;
};

export class GetPlayerUserAttributeCategoriesUseCase implements IGetPlayerUserAttributeCategoriesUseCase {
  private constructor(private readonly dependencies: Dependencies) {}

  public static create(dependencies: Dependencies): GetPlayerUserAttributeCategoriesUseCase {
    return new GetPlayerUserAttributeCategoriesUseCase(dependencies);
  }

  public async execute(dto: GetPlayerUserAttributeCategoriesDTO): Promise<Result<IGetPlayerUserAttributeCategoriesUseCaseResponse>> {
    const getAuthenticationTokenResult = await this.dependencies.authenticationTokenStorage.getAuthenticationToken();

    if (getAuthenticationTokenResult.isLeft) {
      await this.dependencies.authenticationTokenStorage.removeAuthenticationToken();
      return Either.left({ type: 'single', error: DomainError.createSingle('AuthenticationTokenNotFound', 'Authentication token not found') });
    }

    const authenticationToken = getAuthenticationTokenResult.right();
    const httpResult = await this.dependencies.basketColHttpClient.get<IAttributeCategoriesHttpResponse>(
      `/users/players/${dto.playerUserId}/attribute-categories`,
      { headers: { Authorization: `Bearer ${authenticationToken}` } },
    );

    if (httpResult.isLeft) {
      const errorResponseInfo = httpResult.left();
      return DomainErrorMapper.execute(errorResponseInfo);
    }

    const successResponseInfo = httpResult.right();
    return this.#handleSuccessResponse(successResponseInfo.data);
  }

  #handleSuccessResponse(
    data: IAttributeCategoriesHttpResponse,
  ): Result<IGetPlayerUserAttributeCategoriesUseCaseResponse> {
    const {
      defensiveAttributes,
      finishingAttributes,
      physicalAttributes,
      reboundingAttributes,
      shootingAttributes,
      skillAttributes,
    } = data.attributeCategories;

    return Either.right({
      defensiveAttributes: this.#mapAttributeOrNull(
        defensiveAttributes,
        PlayerUserDefensiveAttributeDomainEntityMapper.mapToDomainEntity,
      ),
      finishingAttributes: this.#mapAttributeOrNull(
        finishingAttributes,
        PlayerUserFinishingAttributeDomainEntityMapper.mapToDomainEntity,
      ),
      physicalAttributes: this.#mapAttributeOrNull(
        physicalAttributes,
        PlayerUserPhysicalAttributeDomainEntityMapper.mapToDomainEntity,
      ),
      reboundingAttributes: this.#mapAttributeOrNull(
        reboundingAttributes,
        PlayerUserReboundingAttributeDomainEntityMapper.mapToDomainEntity,
      ),
      shootingAttributes: this.#mapAttributeOrNull(
        shootingAttributes,
        PlayerUserShootingAttributeDomainEntityMapper.mapToDomainEntity,
      ),
      skillAttributes: this.#mapAttributeOrNull(
        skillAttributes,
        PlayerUserSkillAttributeDomainEntityMapper.mapToDomainEntity,
      ),
    });
  }

  #mapAttributeOrNull<T, R>(
    attribute: T | null,
    mapper: (attr: T) => R,
  ): R | null {
    return attribute === null ? null : mapper(attribute);
  }
}

// # types

interface IAttributeCategoriesHttpResponse {
  attributeCategories: {
    defensiveAttributes: IDefensiveAttributes | null;
    finishingAttributes: IFinishingAttributes | null;
    physicalAttributes: IPhysicalAttributes | null;
    reboundingAttributes: IReboundingAttributes | null;
    shootingAttributes: IShootingAttributes | null;
    skillAttributes: ISkillAttributes | null;
  };
}

interface IBaseAttributes {
  id: string;
  playerUserId: string;
  createdAt: string;
  updatedAt: string;
}

interface IDefensiveAttributes extends IBaseAttributes {
  interiorDefense: number;
  perimeterDefense: number;
  steal: number;
  block: number;
}

interface IFinishingAttributes extends IBaseAttributes {
  drivingLayup: number;
  drivingDunk: number;
  standingDunk: number;
  postControl: number;
}

interface IPhysicalAttributes extends IBaseAttributes {
  speed: number;
  acceleration: number;
  strength: number;
  vertical: number;
  stamina: number;
}

interface IReboundingAttributes extends IBaseAttributes {
  offensiveRebound: number;
  defensiveRebound: number;
}

interface IShootingAttributes extends IBaseAttributes {
  closeShot: number;
  midRangeShot: number;
  threePointShot: number;
  freeThrow: number;
}

interface ISkillAttributes extends IBaseAttributes {
  passAccuracy: number;
  ballHandle: number;
  speedWithBall: number;
}
