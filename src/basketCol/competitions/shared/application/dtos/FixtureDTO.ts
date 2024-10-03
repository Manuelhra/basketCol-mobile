import { AggregateRootDTO } from '../../../../shared/application/dtos/AggregateRootDTO';

export interface FixtureDTO extends AggregateRootDTO {
  date: string;
  name: string | null;
}
