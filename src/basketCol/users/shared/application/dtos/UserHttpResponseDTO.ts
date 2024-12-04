import { IImageValueObjectProps } from '@basketcol/domain/build/types/basketCol/shared/domain/value-objects/ImageValueObject';

import { AggregateRootHttpResponseDTO } from '../../../../shared/application/dtos/AggregateRootHttpResponseDTO';

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

export interface UserHttpResponseDTO extends
  AggregateRootHttpResponseDTO,
  IUserCredentials,
  IUserIdentity,
  IUserMedia,
  IUserAccount {}
