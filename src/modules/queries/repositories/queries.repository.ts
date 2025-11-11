import { SpellLore } from 'src/entities/spell-lore.entity';
import { Spell } from 'src/entities/spell.entity';
import { Skill } from 'src/entities/skill.entity';
import { SkillList } from 'src/entities/skill-list.entity';
import { Advancement } from 'src/entities/advancement.entity';
import { Injury } from 'src/entities/injury.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { SuperNaturalAbility } from 'src/entities/super-natural-ability.entity';
import { Modifier } from 'src/entities/modifier.entity';
import { Faction } from 'src/modules/warbands/entities/faction.entity';
import { BaseFigure } from 'src/entities/base-figure.entity';
import { SpellQueryDto } from '../dto/spell-query.dto';
import { SpellLoresQueryDto } from '../dto/spell-lores-query.dto';
import { SkillQueryDto } from '../dto/skill-query.dto';
import { SkillListsQueryDto } from '../dto/skill-lists-query.dto';
import { AdvancementQueryDto } from '../dto/advancement-query.dto';
import { InjuryQueryDto } from '../dto/injury-query.dto';
import { EquipmentQueryDto } from '../dto/equipment-query.dto';
import { SuperNaturalAbilityQueryDto } from '../dto/super-natural-ability-query.dto';
import { ModifierQueryDto } from '../dto/modifier-query.dto';
import { FactionQueryDto } from '../dto/faction-query.dto';
import { BaseFigureQueryDto } from '../dto/base-figure-query.dto';
import { EquipmentToWarbandSoldier } from 'src/modules/soldiers/entities/equipment-to-warband-soldier.entity';
import { EquipmentToVault } from 'src/modules/warbands/entities/equipment-to-vault.entity';
import { SkillToWarbandSoldier } from 'src/modules/soldiers/entities/skill-to-warband-soldier.entity';

export abstract class QueriesRepository {
  //spell-related-stuff
  abstract findAllSpellLores(
    spellLoresQueryDto: SpellLoresQueryDto,
  ): Promise<SpellLore[]>;
  abstract findAllSpells(spellQueryDto: SpellQueryDto): Promise<Spell[]>;
  abstract findSpellByslug(slug: string): Promise<Spell>;
  abstract findSpellLoreByslug(slug: string): Promise<SpellLore>;
  // skills
  abstract findAllSkills(dto: SkillQueryDto): Promise<Skill[]>;
  abstract findSkillByslug(slug: string): Promise<Skill>;
  abstract findAllSkillLists(dto: SkillListsQueryDto): Promise<SkillList[]>;
  abstract findSkillListByslug(slug: string): Promise<SkillList>;
  // advancements
  abstract findAllAdvancements(
    dto: AdvancementQueryDto,
  ): Promise<Advancement[]>;
  abstract findAdvancementByslug(slug: string): Promise<Advancement>;
  // injuries
  abstract findAllInjuries(dto: InjuryQueryDto): Promise<Injury[]>;
  abstract findInjuryByslug(slug: string): Promise<Injury>;
  // equipments
  abstract findAllEquipments(dto: EquipmentQueryDto): Promise<Equipment[]>;
  abstract findEquipmentByslug(slug: string): Promise<Equipment>;
  // supernatural abilities
  abstract findAllSuperNaturalAbilities(
    dto: SuperNaturalAbilityQueryDto,
  ): Promise<SuperNaturalAbility[]>;
  abstract findSuperNaturalAbilityByslug(
    slug: string,
  ): Promise<SuperNaturalAbility>;
  // modifiers
  abstract findAllModifiers(dto: ModifierQueryDto): Promise<Modifier[]>;
  abstract findModifierByslug(slug: string): Promise<Modifier>;
  // factions
  abstract findAllFactions(dto: FactionQueryDto): Promise<Faction[]>;
  abstract findFactionByslug(slug: string): Promise<Faction>;
  // base figures
  abstract findAllBaseFigures(dto: BaseFigureQueryDto): Promise<BaseFigure[]>;
  abstract findBaseFigureByslug(slug: string): Promise<BaseFigure>;
  abstract findEquipmentToWarbandSoldierById(
    id: string,
  ): Promise<EquipmentToWarbandSoldier>;
  abstract findEquipmentToVaultById(id: string): Promise<EquipmentToVault>;
  abstract findSkillToWarbandSoldierById(id: string): Promise<SkillToWarbandSoldier>;
}
