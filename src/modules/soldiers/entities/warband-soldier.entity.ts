import { Type } from 'class-transformer';
import { BaseFigureToWarbandSoldier } from './base-figure-to-warband-soldier.entity';
import { EquipmentToWarbandSoldier } from './equipment-to-warband-soldier.entity';
import { ExtraSkillListToWarbandSoldier } from './extra-skill-list-to-warband-soldier.entity';
import { ExtraSpellLoreToWarbandSoldier } from './extra-spell-lore-to-warband-soldier.entity';
import { GiftOfTzeentchToWarbandSoldier } from './gift-of-tzeentch-to-warband-soldier.entity';
import { InjuryToWarbandSoldier } from './injury-to-warband-soldier.entity';
import { SkillToWarbandSoldier } from './skill-to-warband-soldier.entity';
import { SpellToWarbandSoldier } from './spell-to-warband-soldier.entity';
import { AdvancementToWarbandSoldier } from './advancement-to-warband-soldier.entity';
import { SuperNaturalAbilityToWarbandSoldier } from './super-natural-ability-to-warband-soldier.entity';
import { PromotedHeroSkillLists } from './promoted-hero-skill-list.entity';
import type { Role } from 'src/entities/base-figure.entity';
import { Warband } from 'src/modules/warbands/entities/warband.entity';

export class WarbandSoldier {
  id!: string;
  campaignName?: string | null;
  warbandId!: string;
  experience!: number;
  active!: boolean;
  effectiveRole?: Role | null;
  createdAt!: Date;
  extraSpecialRules?: unknown;
  @Type(() => AdvancementToWarbandSoldier)
  advancements?: AdvancementToWarbandSoldier[];
  @Type(() => BaseFigureToWarbandSoldier)
  baseFigure?: BaseFigureToWarbandSoldier[];
  @Type(() => EquipmentToWarbandSoldier)
  equipment?: EquipmentToWarbandSoldier[];
  @Type(() => ExtraSkillListToWarbandSoldier)
  extraSkillLists?: ExtraSkillListToWarbandSoldier[];
  @Type(() => ExtraSpellLoreToWarbandSoldier)
  extraSpellLists?: ExtraSpellLoreToWarbandSoldier[];
  @Type(() => GiftOfTzeentchToWarbandSoldier)
  giftsOfTzeentch?: GiftOfTzeentchToWarbandSoldier[];
  @Type(() => InjuryToWarbandSoldier)
  injuries?: InjuryToWarbandSoldier[];
  @Type(() => SkillToWarbandSoldier)
  skills?: SkillToWarbandSoldier[];
  @Type(() => SpellToWarbandSoldier)
  spells?: SpellToWarbandSoldier[];
  @Type(() => SuperNaturalAbilityToWarbandSoldier)
  supernaturalAbilities?: SuperNaturalAbilityToWarbandSoldier[];
  @Type(() => PromotedHeroSkillLists)
  @Type(() => Warband)
  warband?: Warband;
}
