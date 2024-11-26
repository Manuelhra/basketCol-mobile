import { IImageValueObjectProps } from '@basketcol/domain/build/types/basketCol/shared/domain/value-objects/ImageValueObject';

import { AggregateRootDTO } from '../../../shared/application/dtos/AggregateRootDTO';

interface ITeamMainMedia {
  mainImage: IImageValueObjectProps;
  logo: IImageValueObjectProps;
}

interface ITeamGallery {
  gallery: {
    images: Array<IImageValueObjectProps>;
  };
}

export interface TeamDTO extends
  AggregateRootDTO,
  ITeamMainMedia,
  ITeamGallery {
  officialName: string;
  gender: string;
  teamFounderUserId: string;
}
