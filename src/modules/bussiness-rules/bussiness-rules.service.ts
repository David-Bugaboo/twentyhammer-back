import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { QueriesService } from '../queries/queries.service';
import { BaseFigure, Role } from 'src/entities/base-figure.entity';

import { Equipment } from 'src/entities/equipment.entity';
import { Modifier } from 'src/entities/modifier.entity';
import { Warband } from '../warbands/entities/warband.entity';
import { EquipmentToWarbandSoldier } from '../soldiers/entities/equipment-to-warband-soldier.entity';
import { Spell } from 'src/entities/spell.entity';
import { Skill } from 'src/entities/skill.entity';

@Injectable()
export class BussinessRulesService {
  constructor(private readonly queriesService: QueriesService) {}

   normalizeSpecialRules(
    specialRules?: Equipment['specialRules'],
  ): { label: string; value: string }[] {
    if (!specialRules || !Array.isArray(specialRules)) {
      return [];
    }

    const normalized: { label: string; value: string }[] = [];

    for (const rule of specialRules) {
      if (typeof rule !== 'object' || rule === null) {
        continue;
      }

      const candidate = rule as Record<string, unknown>;
      if (candidate.label === undefined || candidate.value === undefined) {
        continue;
      }

      normalized.push({
        label: String(candidate.label),
        value: String(candidate.value),
      });
    }

    return normalized;
  }
  async getLeader(factionSlug: string): Promise<BaseFigure> {
    const leader = await this.queriesService.findAllBaseFigures({
      role: 'LIDER',
      factionSlug,
    });
    const hasLeader = leader.length > 0;
    const leaderFound = leader[0] !== undefined;

    if (!hasLeader) {
      throw new NotFoundException('facção sem líder!');
    }

    if (!leaderFound) {
      throw new NotFoundException('Líder não encontrado!');
    }

    return leader[0];
  }
  async validateFaction(factionSlug: string) {
    try {
      const faction = await this.queriesService.findFactionByslug(factionSlug);
      const factionExists = !!faction;

      if (!factionExists) {
        throw new NotFoundException('Facção não encontrada!');
      }

      return factionExists;
    } catch (error) {
      throw new NotFoundException('Facção não encontrada!');
    }
  }
  async resolveFigure(slug: string): Promise<BaseFigure> {
    const figure = await this.queriesService.findBaseFigureByslug(slug);
    const figureExists = !!figure;

    if (!figureExists) {
      throw new NotFoundException('Figura não encontrada!');
    }
    return figure;
  }
  async resolveEquipment(slug: string): Promise<Equipment> {
    try {
      const equipment = await this.queriesService.findEquipmentByslug(slug);
      const equipmentExists = !!equipment;

      if (!equipmentExists) {
        throw new NotFoundException('Equipamento não encontrado!');
      }

      return equipment;
    } catch (error) {
      throw new NotFoundException('Equipamento não encontrado!');
    }
  }
  async resolveModifier(slug: string): Promise<Modifier> {
    try {
      const modifier = await this.queriesService.findModifierByslug(slug);
      const modifierExists = !!modifier;

      if (!modifierExists) {
        throw new NotFoundException('Modificador não encontrado!');
      }

      return modifier;
    } catch (error) {
      throw new NotFoundException('Modificador não encontrado!');
    }
  }
  async ValidateModifier(
    modifier: Modifier,
    equipment: Equipment,
  ): Promise<void> {
    const modifierCategory = modifier.category
      .split(`Modificador de `)[1]
      .trim();
    const isCategoryCompatible = modifierCategory === equipment.category;

    if (!isCategoryCompatible) {
      throw new BadRequestException('Modificador inválido!');
    }
  }
  async validateIfBuyIsValid(
    warband: Warband,
    equipment: Equipment,
    loot: boolean,
    modifier?: Modifier | null,
  ): Promise<void> {
    if (loot) return;
    const isInAllowed =
      equipment.avaiability.includes(warband.faction!.name) ||
      equipment.avaiability.includes('Todos');
    const isInExcluded = equipment.exclusions.includes(warband.faction!.name);
    const modifierMultiplier = modifier?.multiplier ?? 1;
    const equipmentCost = equipment.cost * modifierMultiplier;
    const shouldRejectEquipment = !isInAllowed || isInExcluded;
    const hasEnoughCrowns = warband.crowns >= equipmentCost;

    if (shouldRejectEquipment) {
      throw new BadRequestException(
        'Equipamento não permitido para esta facção!',
      );
    }

    if (!hasEnoughCrowns) {
      throw new BadRequestException('Coroas insuficientes!');
    }
  }
  async resolveEquipmentToWarbandSoldier(
    id: string,
  ): Promise<EquipmentToWarbandSoldier> {
    try {
      const equipmentToWarbandSoldier =
        await this.queriesService.findEquipmentToWarbandSoldierById(id);
      const equipmentFound = !!equipmentToWarbandSoldier;

      if (!equipmentFound) {
        throw new NotFoundException(
          'Equipamento não encontrado no inventário.',
        );
      }

      return equipmentToWarbandSoldier;
    } catch (error) {
      throw new NotFoundException('Equipamento não encontrado no inventário.');
    }
  }
  async checkForCompatibility(
    equipmentSlug: string,
    soldierCompatibility: string[],
    soldierSkills: string[],
    equipmentCategory: string,
  ) {
    const isEquipableCategory = [`Arma Corpo a Corpo`, `Arma a Distância`, `Arma de Fogo`, `Escudo`, `Elmo`, `Armadura`];
    const hasArmoryMaster = soldierSkills.includes(`mestre-do-arsenal`)
    const hasMarksmenMaster = soldierSkills.includes(`mestre-atirador`)

    if (!isEquipableCategory.includes(equipmentCategory)) 
      return true;

    if (hasArmoryMaster && equipmentCategory === `Arma Corpo a Corpo`) return ;
    
    if (hasMarksmenMaster && (equipmentCategory === `Arma a Distância` || equipmentCategory === `Arma de Fogo`)) return ;
    
    if (soldierCompatibility.includes(equipmentSlug)) return ;
    
    


    throw new BadRequestException('Equipamento não permitido para esta figura!');
  }
  async validateSkill(
    skillSlug: string,
    warbandSoldierSkills: string[],
    warbandSoldierSkillLists: string[],
  ): Promise<void> {
    const hasSkillLists = warbandSoldierSkillLists.length > 0;

    if (!hasSkillLists) {
      throw new BadRequestException('Figura não pode aprender habilidades!');
    }

    let skill: Skill;

    try {
      skill = await this.queriesService.findSkillByslug(skillSlug);
    } catch (error) {
      throw new BadRequestException('habilidade não encontrada!');
    }

    const isForceSkill = skill.skillListSlug === `forca`;
    const hasCorpoTreinado = warbandSoldierSkills.includes(`corpo-treinado`);
    const canSkipForceRestriction = isForceSkill && hasCorpoTreinado;
    const isAlreadyLearned = warbandSoldierSkills.includes(skillSlug);
    const isSkillAllowed = warbandSoldierSkillLists.includes(
      skill.skillListSlug,
    );

    if (canSkipForceRestriction) return;

    if (isAlreadyLearned) {
      throw new BadRequestException('Habilidade já aprendida!');
    }

    if (!isSkillAllowed) {
      throw new BadRequestException(
        'Habilidade não permitida para esta figura!',
      );
    }
  }
  async validateSpell(
    spellSlug: string,
    warbandSoldierSpellLores: string[],
    warbandSoldierSpells: string[],
    warbandSoldierSkills: string[],
  ): Promise<void> {
    const hasSpellLore = warbandSoldierSpellLores.length > 0;
    const hasArcaneLearning =
      warbandSoldierSkills.includes(`aprendizado-arcano`);
    const isCaster = hasSpellLore || hasArcaneLearning;
    const spellAlreadyKnown = warbandSoldierSpells.includes(spellSlug);

    if (!isCaster) {
      throw new BadRequestException('Figura não é um conjurador!');
    }

    if (spellAlreadyKnown) {
      throw new BadRequestException('Magia já aprendida!');
    }

    let spell: Spell;

    try {
      spell = await this.queriesService.findSpellByslug(spellSlug);
    } catch (error) {
      throw new BadRequestException('magia não encontrada!');
    }

    const isInferiorMagic = spell.spellLoreSlug === `magia-inferior`;
    const canLearnInferiorMagic = isInferiorMagic && hasArcaneLearning;
    const isSpellAllowed = warbandSoldierSpellLores.includes(
      spell.spellLoreSlug,
    );

    if (canLearnInferiorMagic) return;

    if (!isSpellAllowed) {
      throw new BadRequestException(
        'Magia não permitida para esta tradição!',
      );
    }
  }
  async validateAddedAdvancement(advancementSlug: string, warbandSoldierAdvancements: string[]): Promise<void> {
  }
  async validateSuperNaturalAbility(supernaturalAbilitySlug: string, warbandSoldierSuperNaturalAbilities: string[], warbandSoldierBaseFigure: BaseFigure, warbandSoldierSkills: string[], warbandCrowns: number): Promise<void> {
    const isRepeatedAbility =
      warbandSoldierSuperNaturalAbilities.includes(supernaturalAbilitySlug);
    const isIgnoredRepetition =
      supernaturalAbilitySlug === `tentaculo` ||
      supernaturalAbilitySlug === `obesidade-morbida`;
    const supernaturalAbilityRepeated =
      isRepeatedAbility && !isIgnoredRepetition;
    const canPickMutation =
      warbandSoldierBaseFigure.canGetMutations &&
      !warbandSoldierSkills.includes(`linhagem-corrompida`);
    const canPickBlessing = warbandSoldierBaseFigure.canGetBlessings;
    const canPickSacredMark = warbandSoldierBaseFigure.canGetSacredMarks;
    const superNaturalAbility =
      await this.queriesService.findSuperNaturalAbilityByslug(
        supernaturalAbilitySlug,
      );
    const hasCrowns = warbandCrowns >= superNaturalAbility.cost;
    const isMutation = superNaturalAbility.category === `Mutação`;
    const isBlessing = superNaturalAbility.category === `Benção de Nurgle`;
    const isSacredMark = superNaturalAbility.category === `Marca Sagrada`;

    if (supernaturalAbilityRepeated) {
      throw new BadRequestException('Habilidade Supernatural já adicionada!');
    }
    if (!canPickMutation && isMutation) {
      throw new BadRequestException('Figura não pode adquirir mutações!');
    }
    if (!canPickBlessing && isBlessing) {
      throw new BadRequestException('Figura não pode adquirir bênçãos de nurgle!');
    }
    if (!canPickSacredMark && isSacredMark) {
      throw new BadRequestException('Figura não pode adquirir marcas sagradas!');
    }
    if (!hasCrowns) {
      throw new BadRequestException('Coroas insuficientes!');
    }
  }
  async validateInjury(injurySlug: string, warbandSoldierInjuries: string[], warbandSoldierRole: Role): Promise<void> {
    const injurableRoles = [`HEROI`, `LIDER`, `LENDA`];
    const isRepeatedInjury = warbandSoldierInjuries.includes(injurySlug);
    const isRoleAllowed = injurableRoles.includes(warbandSoldierRole);
    if (isRepeatedInjury) {
      throw new BadRequestException('Ferimento já adicionado!');
    }
    if (!isRoleAllowed) {
      throw new BadRequestException('Tipo de figura não recebe ferimentos!');
    }
  }
  async validateAdvancement(advancementSlug: string, warbandSoldierAdvancements: string[], warbandSoldierRole: Role): Promise<void> {
    const soldierInvalidAdvancements = [`fortalecer-magia`, `nova-habilidade`, `nova-magia`];
    const soldierRepeatedAdvancement = warbandSoldierRole === `SOLDADO` && warbandSoldierAdvancements.includes(advancementSlug);
    const soldierInvalidAdvancement = warbandSoldierRole === `SOLDADO` && soldierInvalidAdvancements.includes(advancementSlug);
    const isLegend = warbandSoldierRole === `LENDA`;
    const invalidHeroAdvancement = (warbandSoldierRole === `HEROI` || warbandSoldierRole === `MERCENARIO`) && advancementSlug === `o-moleque-tem-talento`;
    if (soldierInvalidAdvancement) {
      throw new BadRequestException('Avanço não permitido para esta figura!');
    }
    if (invalidHeroAdvancement) {
      throw new BadRequestException('Avanço não permitido para esta figura!');
    }
    if (soldierRepeatedAdvancement) {
      throw new BadRequestException('Avanço já adicionado!');
    }
    if(soldierInvalidAdvancement) {
      throw new BadRequestException('Avanço não permitido para esta figura!');
    }
    if (isLegend) {
      throw new BadRequestException('Avanço não permitido para esta figura!');
    }
  }
  async validateEquip(warbandSoldierEquipment: EquipmentToWarbandSoldier, warbandSoldierEquipmentList: EquipmentToWarbandSoldier[], warbandSoldierSuperNaturalAbilities: string[], warbandSoldierInjuries: string[], hand: string) {
    const validOffHandCategories = [`Escudo`, `Arma Corpo a Corpo`, `Arma a Distância`, `Arma de Fogo`]
    const validMainHandCategories = [`Arma Corpo a Corpo`, `Arma a Distância`, `Arma de Fogo`]
    const validTwoHandCategories = [`Arma Corpo a Corpo`, `Arma a Distância`, `Arma de Fogo`]
    const isValidOffhandCategory = validOffHandCategories.includes(warbandSoldierEquipment.equipment?.category!);
    const isValidMainHandCategory = validMainHandCategories.includes(warbandSoldierEquipment.equipment?.category!);
    const isValidTwoHandCategory = validTwoHandCategories.includes(warbandSoldierEquipment.equipment?.category!);
    const equipamentSpecialRules = this.normalizeSpecialRules(
      warbandSoldierEquipment.equipment?.specialRules,
    );
    const hasColossalClaw = warbandSoldierSuperNaturalAbilities.includes(`garra-colossal`); 
    const hasCrushedForearm = warbandSoldierInjuries.includes(`antebraco-esmagado`);
    const usingUnbalancedInMainHand = warbandSoldierEquipmentList.some(
      warbandSoldierEquipment =>
        warbandSoldierEquipment.mainHandEquiped === true &&
        this.normalizeSpecialRules(
          warbandSoldierEquipment.equipment?.specialRules,
        ).some(rule => rule.label === `Desbalanceada`),
    );
    const weaponIsTwoHanded = equipamentSpecialRules.some(rule => rule.label === `Duas Mãos`); 
    const weaponIsVersatile = equipamentSpecialRules.some(rule => rule.label === `Versátil`);
    
    const hasOffhandRestriction =
    hasColossalClaw || hasCrushedForearm || usingUnbalancedInMainHand;

    if (hand === 'offHandEquiped' && (!isValidOffhandCategory || hasOffhandRestriction)) 
      throw new BadRequestException('Equipamento não permitido para esta mão!');
    

    if (hand === 'mainHandEquiped' && (!isValidMainHandCategory || weaponIsTwoHanded)) 
      throw new BadRequestException('Equipamento não permitido para esta mão!');
    

    if (
      hand === 'twoHandedEquiped' &&
      (!isValidTwoHandCategory || (!weaponIsTwoHanded && !weaponIsVersatile))
    ) 
  throw new BadRequestException('Equipamento não permitido para esta mão!');

    if(hand == `armorEquiped` && warbandSoldierEquipment.equipment?.category !== `Armadura`) {
      throw new BadRequestException('Item não é armadura!');
    }
    if (hand == `helmetEquiped` && warbandSoldierEquipment.equipment?.category !== `Elmo`) {
      throw new BadRequestException('Item não é elmo!');
    }
  }
  async validateInventorySpace(warbandSoldierEquipmentList: EquipmentToWarbandSoldier[], equipmentCategory: string): Promise<void> { 
    const hasAtLeastOneDagger = warbandSoldierEquipmentList.filter(equipmentToWarbandSoldier => equipmentToWarbandSoldier.equipmentSlug === `adaga`).length >= 1;
    var howManyCloseCombatWeapons = warbandSoldierEquipmentList.filter(equipmentToWarbandSoldier => equipmentToWarbandSoldier.equipment?.category === `Arma Corpo a Corpo`).length + warbandSoldierEquipmentList.filter(equipmentToWarbandSoldier => equipmentToWarbandSoldier.equipment?.category === `Escudo`).length;
    const howManyRangedWeapons = warbandSoldierEquipmentList.filter(equipmentToWarbandSoldier => equipmentToWarbandSoldier.equipment?.category === `Arma a Distância` || equipmentToWarbandSoldier.equipment?.category === `Arma de Fogo`).length;
    const howManyArmors = warbandSoldierEquipmentList.filter(equipmentToWarbandSoldier => equipmentToWarbandSoldier.equipment?.category === `Armadura`).length;
    if (hasAtLeastOneDagger && howManyCloseCombatWeapons >= 1) {
      howManyCloseCombatWeapons -= 1;
    }
    if ((equipmentCategory === `Arma Corpo a Corpo` || equipmentCategory === `Escudo`)  && howManyCloseCombatWeapons >= 2) throw new BadRequestException('Figura não pode carregar mais de duas arma corpo a corpo!');
    if ((equipmentCategory === `Arma a Distância` || equipmentCategory === `Arma de Fogo`) && howManyRangedWeapons >= 2) throw new BadRequestException('Figura não pode carregar mais de duas armas a distância!');
    if (equipmentCategory === `Armadura` && howManyArmors >= 1) throw new BadRequestException('Figura não pode carregar mais de uma armadura!');
  }
  async validateEquipTwoHanded(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void> { 
    const equipamentSpecialRules = this.normalizeSpecialRules(equipment.specialRules);
    const hasColossalClaw = warbandSoldierMutations.includes(`garra-colossal`);
    const hasCrushedForearm = warbandSoldierInjuries.includes(`antebraco-esmagado`);
    const weaponIsTwoHanded = equipamentSpecialRules.some(rule => rule.label === `Duas Mãos` || rule.label === `Versátil`);
    const hasMainHandOrOffHandEquiped = warbandSoldierEquipmentList.some(equipmentToWarbandSoldier => equipmentToWarbandSoldier.mainHandEquiped === true || equipmentToWarbandSoldier.offHandEquiped === true);
    if (hasColossalClaw || hasCrushedForearm) {
      throw new BadRequestException('Figura não pode equipar arma  duas mãos!');
    }

    if(hasMainHandOrOffHandEquiped) {
      throw new BadRequestException('Mãos já ocupadas!');
    }

    if(!weaponIsTwoHanded) {
      throw new BadRequestException('Equipamento não é uma arma de duas mãos!');
    }
  }
  async validateOffhand(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void> { 
    const equipamentSpecialRules = this.normalizeSpecialRules(equipment.specialRules);
    const hasColossalClaw = warbandSoldierMutations.includes(`garra-colossal`);
    const hasCrushedForearm = warbandSoldierInjuries.includes(`antebraco-esmagado`);
    const weaponIsOffhandValid = equipamentSpecialRules.some(rule => rule.label === `Leve` || rule.label === `Pistola`) || equipment.category === `Escudo`;
    const mainHandWeaponIsDesbalanced = warbandSoldierEquipmentList.some(equipmentToWarbandSoldier => equipmentToWarbandSoldier.mainHandEquiped === true && this.normalizeSpecialRules(equipmentToWarbandSoldier.equipment?.specialRules).some(rule => rule.label === `Desbalanceada`));

    if (hasColossalClaw || hasCrushedForearm) {
      throw new BadRequestException('Figura não pode equipar sua mão secundária!');
    }

    if(!weaponIsOffhandValid) {
      throw new BadRequestException('Equipamento não é uma arma válida de mão secundária!');
    }

    if(mainHandWeaponIsDesbalanced && equipment.category !== `Escudo`) {
      throw new BadRequestException('Figura não pode equipar arma na mão secundária se a primária for desbalanceada!');
    }

  }
  async validateMainHand(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void> { 
    const validMainHandCategories = [`Arma Corpo a Corpo`, `Arma a Distância`, `Arma de Fogo`]
    const equipamentSpecialRules = this.normalizeSpecialRules(equipment.specialRules);
    const weaponIsDesbalanced = equipamentSpecialRules.some(rule => rule.label === `Desbalanceada`);
    const weaponIsTwoHandedOnly = equipamentSpecialRules.some(rule => rule.label === `Duas Mãos`);
    const hasOffHandEqquiped = warbandSoldierEquipmentList.some(equipmentToWarbandSoldier => equipmentToWarbandSoldier.offHandEquiped === true && equipmentToWarbandSoldier.equipment?.category !== `Escudo`);
    const isvalidMainHand = validMainHandCategories.includes(equipment.category);
    const hasTwoHandedWeaponEquiped = warbandSoldierEquipmentList.some(equipmentToWarbandSoldier => equipmentToWarbandSoldier.twoHandedEquiped === true);

    if(hasTwoHandedWeaponEquiped) {
      throw new BadRequestException('Mãos já ocupadas!');
    }
    if(!isvalidMainHand) {
      throw new BadRequestException('Equipamento não é uma arma válida de mão primária!');
    }

    if(weaponIsDesbalanced && hasOffHandEqquiped) {
      throw new BadRequestException('Figura não pode equipar arma de mão primária desbalanceada se tiver arma de mão secundária leve ou pistola!');
    }

    if (weaponIsTwoHandedOnly) 
      throw new BadRequestException('Figura não pode equipar arma de duas mãos na mão primária!');
  }
  async validateArmor(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void> {
    const hasArmorEquiped = warbandSoldierEquipmentList.some(equipmentToWarbandSoldier => equipmentToWarbandSoldier.equipment?.category === `Armadura`);
    const isvalidArmor = equipment.category === `Armadura`;
    if (!isvalidArmor) {
      throw new BadRequestException('Equipamento não é uma armadura válida!');
    }

    if(hasArmorEquiped) {
      throw new BadRequestException('Figura não pode equipar mais de uma armadura!');
    }
  }
  async validateHelmet(equipment: Equipment, warbandSoldierMutations: string[], warbandSoldierInjuries: string[], warbandSoldierEquipmentList: EquipmentToWarbandSoldier[]): Promise<void> {
    const hasHelmetEquiped = warbandSoldierEquipmentList.some(equipmentToWarbandSoldier => equipmentToWarbandSoldier.equipment?.category === `Elmo`);
    const isvalidHelmet = equipment.category === `Elmo`;
    if (!isvalidHelmet) {
      throw new BadRequestException('Equipamento não é um elmo válido!');
    }
    if(hasHelmetEquiped) {
      throw new BadRequestException('Figura não pode equipar mais de um elmo!');
    }
  }

}
