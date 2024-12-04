import { HostUserHttpResponseDTO } from '../../../host/application/dtos/HostUserHttpResponseDTO';
import { LeagueFounderUserHttpResponseDTO } from '../../../league-founder/application/dtos/LeagueFounderUserHttpResponseDTO';
import { PlayerUserHttpResponseDTO } from '../../../player/application/dtos/PlayerUserHttpResponseDTO';
import { RefereeUserHttpResponseDTO } from '../../../referee/application/dtos/RefereeUserHttpResponseDTO';
import { TeamFounderUserHttpResponseDTO } from '../../../team-founder/application/dtos/TeamFounderUserHttpResponseDTO';

export type AnySystemUserTypeDTO = HostUserHttpResponseDTO | PlayerUserHttpResponseDTO | RefereeUserHttpResponseDTO | LeagueFounderUserHttpResponseDTO | TeamFounderUserHttpResponseDTO;
