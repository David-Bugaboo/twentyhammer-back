import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SpellQueryDto } from './dto/spell-query.dto';
import { SpellLoresQueryDto } from './dto/spell-lores-query.dto';
import { SkillQueryDto } from './dto/skill-query.dto';
import { SkillListsQueryDto } from './dto/skill-lists-query.dto';
import { AdvancementQueryDto } from './dto/advancement-query.dto';
import { InjuryQueryDto } from './dto/injury-query.dto';
import { EquipmentQueryDto } from './dto/equipment-query.dto';
import { SuperNaturalAbilityQueryDto } from './dto/super-natural-ability-query.dto';
import { ModifierQueryDto } from './dto/modifier-query.dto';
import { FactionQueryDto } from './dto/faction-query.dto';
import { BaseFigureQueryDto } from './dto/base-figure-query.dto';
import { QueriesRepository } from './repositories/queries.repository';

@Injectable()
export class QueriesService {
  constructor(private readonly repo: QueriesRepository) {}

  // Spells
  findAllSpellLores(dto: SpellLoresQueryDto) {
    return this.repo.findAllSpellLores(dto);
  }
  findAllSpells(dto: SpellQueryDto) {
    return this.repo.findAllSpells(dto);
  }
  findSpellByslug(slug: string) {
    return this.repo.findSpellByslug(slug);
  }
  findSpellLoreByslug(slug: string) {
    return this.repo.findSpellLoreByslug(slug);
  }

  // Skills & Lists
  findAllSkills(dto: SkillQueryDto) {
    return this.repo.findAllSkills(dto);
  }
  findSkillByslug(slug: string) {
    return this.repo.findSkillByslug(slug);
  }
  findAllSkillLists(dto: SkillListsQueryDto) {
    return this.repo.findAllSkillLists(dto);
  }
  findSkillListByslug(slug: string) {
    return this.repo.findSkillListByslug(slug);
  }

  // Advancements
  findAllAdvancements(dto: AdvancementQueryDto) {
    return this.repo.findAllAdvancements(dto);
  }
  findAdvancementByslug(slug: string) {
    return this.repo.findAdvancementByslug(slug);
  }

  // Injuries
  findAllInjuries(dto: InjuryQueryDto) {
    return this.repo.findAllInjuries(dto);
  }
  findInjuryByslug(slug: string) {
    return this.repo.findInjuryByslug(slug);
  }

  // Equipments
  findAllEquipments(dto: EquipmentQueryDto) {
    return this.repo.findAllEquipments(dto);
  }
  findEquipmentByslug(slug: string) {
    return this.repo.findEquipmentByslug(slug);
  }

  // SuperNaturalAbilities
  findAllSuperNaturalAbilities(dto: SuperNaturalAbilityQueryDto) {
    return this.repo.findAllSuperNaturalAbilities(dto);
  }
  findSuperNaturalAbilityByslug(slug: string) {
    return this.repo.findSuperNaturalAbilityByslug(slug);
  }
  // Modifiers
  findAllModifiers(dto: ModifierQueryDto) {
    return this.repo.findAllModifiers(dto);
  }
  findModifierByslug(slug: string) {
    return this.repo.findModifierByslug(slug);
  }

  // Factions
  findAllFactions(dto: FactionQueryDto) {
    return this.repo.findAllFactions(dto);
  }
  findFactionByslug(slug: string) {
    return this.repo.findFactionByslug(slug);
  }

  // BaseFigures
  findAllBaseFigures(dto: BaseFigureQueryDto) {
    return this.repo.findAllBaseFigures(dto);
  }
  findBaseFigureByslug(slug: string) {
    return this.repo.findBaseFigureByslug(slug);
  }
  async findEquipmentToWarbandSoldierById(id: string) {
    try {
      return await this.repo.findEquipmentToWarbandSoldierById(id);
    } catch (error) {
      throw new NotFoundException('Equipamento não encontrado no inventário.');
    }
  }
  async findEquipmentToVaultById(id: string) {
    try {
      return await this.repo.findEquipmentToVaultById(id);
    } catch (error) {
      throw new NotFoundException('Equipamento não encontrado no inventário.');
    }
  }

  findSkillToWarbandSoldierById(id: string) {
    return this.repo.findSkillToWarbandSoldierById(id);
  }
  async findSpellToWarbandSoldierById(id: string) {
    try {
      return await this.repo.findSpellToWarbandSoldierById(id);
    } catch (error) {
      throw new NotFoundException('Feitiço não encontrado no inventário.');
    }
  }
}
