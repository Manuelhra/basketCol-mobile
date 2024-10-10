import { AggregateRootDTO } from '../../../../shared/application/dtos/AggregateRootDTO';

interface IUserCredentials {
  email: { value: string; verified: boolean; };
}

interface IUserAccount {
  accountStatus: string;
  subscriptionType: string;
}

interface IUserIdentity {
  name: { firstName: string; lastName: string; };
  biography: string;
  type: string;
  accountStatus: string;
  subscriptionType: string;
}

export interface UserDTO extends AggregateRootDTO, IUserCredentials, IUserIdentity, IUserAccount {}
