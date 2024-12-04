import { PlayerUserDefensiveAttributesHttpResponseDTO } from '../../../defensive/application/dtos/PlayerUserDefensiveAttributesHttpResponseDTO';
import { PlayerUserFinishingAttributesHttpResponseDTO } from '../../../finishing/application/dtos/PlayerUserFinishingAttributesHttpResponseDTO';
import { PlayerUserPhysicalAttributesHttpResponseDTO } from '../../../physical/application/dtos/PlayerUserPhysicalAttributesHttpResponseDTO';
import { PlayerUserReboundingAttributesHttpResponseDTO } from '../../../rebounding/application/dtos/PlayerUserReboundingAttributesHttpResponseDTO';
import { PlayerUserShootingAttributesHttpResponseDTO } from '../../../shooting/application/dtos/PlayerUserShootingAttributesHttpResponseDTO';
import { PlayerUserSkillAttributesHttpResponseDTO } from '../../../skill/application/dtos/PlayerUserSkillAttributesHttpResponseDTO';

export type AttributesDTO = PlayerUserDefensiveAttributesHttpResponseDTO
| PlayerUserFinishingAttributesHttpResponseDTO
| PlayerUserReboundingAttributesHttpResponseDTO
| PlayerUserSkillAttributesHttpResponseDTO
| PlayerUserPhysicalAttributesHttpResponseDTO
| PlayerUserShootingAttributesHttpResponseDTO;
