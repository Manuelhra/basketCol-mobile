import { AggregateRootHttpResponseDTO } from '../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

export interface FixtureHttpResponseDTO extends AggregateRootHttpResponseDTO {
  date: string;
  name: string | null;
}
