import { UserHttpResponseDTO } from '../../../shared/application/dtos/UserHttpResponseDTO';

interface IPlayerUserCredentials {
  nickname: string;
}

export interface PlayerUserHttpResponseDTO extends UserHttpResponseDTO, IPlayerUserCredentials {}
