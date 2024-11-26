import { PlayerUserDefensiveAttributesDTO } from '../../../defensive/application/dtos/PlayerUserDefensiveAttributesDTO';
import { PlayerUserFinishingAttributesDTO } from '../../../finishing/application/dtos/PlayerUserFinishingAttributesDTO';
import { PlayerUserPhysicalAttributesDTO } from '../../../physical/application/dtos/PlayerUserPhysicalAttributesDTO';
import { PlayerUserReboundingAttributesDTO } from '../../../rebounding/application/dtos/PlayerUserReboundingAttributesDTO';
import { PlayerUserShootingAttributesDTO } from '../../../shooting/application/dtos/PlayerUserShootingAttributesDTO';
import { PlayerUserSkillAttributesDTO } from '../../../skill/application/dtos/PlayerUserSkillAttributesDTO';

export type AttributesDTO = PlayerUserDefensiveAttributesDTO
| PlayerUserFinishingAttributesDTO
| PlayerUserReboundingAttributesDTO
| PlayerUserSkillAttributesDTO
| PlayerUserPhysicalAttributesDTO
| PlayerUserShootingAttributesDTO;
