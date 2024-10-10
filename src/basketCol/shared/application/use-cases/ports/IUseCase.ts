import { Result } from '@basketcol/domain';

export interface IUseCase<DTO = void, Response = void> {
  execute(dto?: DTO): Promise<Result<Response>>;
}
