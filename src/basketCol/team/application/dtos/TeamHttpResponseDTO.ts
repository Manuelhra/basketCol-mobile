import { IImageValueObjectProps } from '@basketcol/domain';

import { AggregateRootHttpResponseDTO } from '../../../shared/application/dtos/AggregateRootHttpResponseDTO';

interface ITeamMainMedia {
  mainImage: IImageValueObjectProps;
  logo: IImageValueObjectProps;
}

interface ITeamGallery {
  gallery: {
    images: Array<IImageValueObjectProps>;
  };
}

export interface TeamHttpResponseDTO extends
  AggregateRootHttpResponseDTO,
  ITeamMainMedia,
  ITeamGallery {
  officialName: string;
  gender: string;
  teamFounderUserId: string;
}
