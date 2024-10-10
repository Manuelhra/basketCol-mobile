import { HostUserDTO } from '../../../host/application/dtos/HostUserDTO';
import { LeagueFounderUserDTO } from '../../../league-founder/application/dtos/LeagueFounderUserDTO';
import { PlayerUserDTO } from '../../../player/application/dtos/PlayerUserDTO';
import { RefereeUserDTO } from '../../../referee/application/dtos/RefereeUserDTO';
import { TeamFounderUserDTO } from '../../../team-founder/application/dtos/TeamFounderUserDTO';

export type AnySystemUserTypeDTO = HostUserDTO | PlayerUserDTO | RefereeUserDTO | LeagueFounderUserDTO | TeamFounderUserDTO;
