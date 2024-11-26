import { IImageValueObjectProps } from '@basketcol/domain/build/types/basketCol/shared/domain/value-objects/ImageValueObject';

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
  gender: string;
  biography: string;
  type: string;
  accountStatus: string;
  subscriptionType: string;
}

interface IUserMedia {
  profileImage: IImageValueObjectProps;
}

export interface UserDTO extends
  AggregateRootDTO,
  IUserCredentials,
  IUserIdentity,
  IUserMedia,
  IUserAccount {}
