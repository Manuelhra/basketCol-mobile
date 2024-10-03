import { UserDTO } from '../../../shared/application/dtos/UserDTO';

interface IPlayerUserCredentials {
  nickname: string;
}

export interface PlayerUserDTO extends UserDTO, IPlayerUserCredentials {}
