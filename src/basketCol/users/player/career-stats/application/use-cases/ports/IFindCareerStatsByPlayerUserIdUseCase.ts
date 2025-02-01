import { Nullable, PlayerUserCareerStats } from '@basketcol/domain';

import { FindCareerStatsByPlayerUserIdDTO } from '../../dtos/FindCareerStatsByPlayerUserIdDTO';
import { IUseCase } from '../../../../../../shared/application/use-cases/ports/IUseCase';

export interface IFindCareerStatsByPlayerUserIdUseCase
  extends IUseCase<FindCareerStatsByPlayerUserIdDTO, Nullable<PlayerUserCareerStats>> {}
