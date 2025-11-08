import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueriesService } from './queries.service';
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

@Controller('queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  // Spells
  @Get('spell-lores')
  findAllSpellLores(@Query() dto: SpellLoresQueryDto) {
    return this.queriesService.findAllSpellLores(dto);
  }
  @Get('spells')
  findAllSpells(@Query() dto: SpellQueryDto) {
    return this.queriesService.findAllSpells(dto);
  }
  @Get('spells/:slug')
  findSpellByslug(@Param('slug') slug: string) {
    return this.queriesService.findSpellByslug(slug);
  }
  @Get('spell-lores/:slug')
  findSpellLoreByslug(@Param('slug') slug: string) {
    return this.queriesService.findSpellLoreByslug(slug);
  }

  // Skills & Lists
  @Get('skills')
  findAllSkills(@Query() dto: SkillQueryDto) {
    return this.queriesService.findAllSkills(dto);
  }
  @Get('skills/:slug')
  findSkillByslug(@Param('slug') slug: string) {
    return this.queriesService.findSkillByslug(slug);
  }
  @Get('skill-lists')
  findAllSkillLists(@Query() dto: SkillListsQueryDto) {
    return this.queriesService.findAllSkillLists(dto);
  }
  @Get('skill-lists/:slug')
  findSkillListByslug(@Param('slug') slug: string) {
    return this.queriesService.findSkillListByslug(slug);
  }

  // Advancements
  @Get('advancements')
  findAllAdvancements(@Query() dto: AdvancementQueryDto) {
    return this.queriesService.findAllAdvancements(dto);
  }
  @Get('advancements/:slug')
  findAdvancementByslug(@Param('slug') slug: string) {
    return this.queriesService.findAdvancementByslug(slug);
  }

  // Injuries
  @Get('injuries')
  findAllInjuries(@Query() dto: InjuryQueryDto) {
    return this.queriesService.findAllInjuries(dto);
  }
  @Get('injuries/:slug')
  findInjuryByslug(@Param('slug') slug: string) {
    return this.queriesService.findInjuryByslug(slug);
  }

  // Equipments
  @Get('equipments')
  findAllEquipments(@Query() dto: EquipmentQueryDto) {
    return this.queriesService.findAllEquipments(dto);
  }
  @Get('equipments/:slug')
  findEquipmentByslug(@Param('slug') slug: string) {
    return this.queriesService.findEquipmentByslug(slug);
  }

  // SuperNaturalAbilities
  @Get('supernatural-abilities')
  findAllSuperNaturalAbilities(@Query() dto: SuperNaturalAbilityQueryDto) {
    return this.queriesService.findAllSuperNaturalAbilities(dto);
  }
  @Get('supernatural-abilities/:slug')
  findSuperNaturalAbilityByslug(@Param('slug') slug: string) {
    return this.queriesService.findSuperNaturalAbilityByslug(slug);
  }
  // Modifiers
  @Get('modifiers')
  findAllModifiers(@Query() dto: ModifierQueryDto) {
    return this.queriesService.findAllModifiers(dto);
  }
  @Get('modifiers/:slug')
  findModifierByslug(@Param('slug') slug: string) {
    return this.queriesService.findModifierByslug(slug);
  }

  // Factions
  @Get('factions')
  findAllFactions(@Query() dto: FactionQueryDto) {
    return this.queriesService.findAllFactions(dto);
  }
  @Get('factions/:slug')
  findFactionByslug(@Param('slug') slug: string) {
    return this.queriesService.findFactionByslug(slug);
  }

  // BaseFigures
  @Get('base-figures')
  findAllBaseFigures(@Query() dto: BaseFigureQueryDto) {
    return this.queriesService.findAllBaseFigures(dto);
  }
  @Get('base-figures/:slug')
  findBaseFigureByslug(@Param('slug') slug: string) {
    return this.queriesService.findBaseFigureByslug(slug);
  }
}
