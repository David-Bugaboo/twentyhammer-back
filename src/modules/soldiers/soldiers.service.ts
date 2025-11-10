import { Injectable, NotFoundException } from '@nestjs/common';
import { SoldiersRepository } from './repositories/soldiers.repository';
import { WarbandsService } from '../warbands/warbands.service';
import { QueriesService } from '../queries/queries.service';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';

@Injectable()
export class SoldiersService {
  constructor(
    private readonly repo: SoldiersRepository,
    private readonly warbandRepo: WarbandsService,
    private readonly queriesService: QueriesService,
    private readonly bussinessRulesService: BussinessRulesService,
  ) {}

  async findSoldierById(soldierId: string) {
    try {
      return await this.repo.findSoldierById(soldierId);
    } catch (error) {
      throw new NotFoundException('Soldado não encontrado.');
    }
  }
  async removeEquipmentFromSoldier(
    soldierId: string,
    warbandToSoldierItem: string,
  ) {
    const equipment =
      await this.queriesService.findEquipmentToWarbandSoldierById(
        warbandToSoldierItem,
      );

    await this.repo.removeEquipmentFromSoldier(warbandToSoldierItem);
  }
  async addEquipmentToSoldier(soldierId: string, warbandVaultItem: string) {
    const equipmentToVault =
      await this.queriesService.findEquipmentToVaultById(warbandVaultItem);
    
    const soldier = await this.repo.findSoldierById(soldierId);

    const soldierCompatibility = soldier.baseFigure?.[0]?.baseFigure?.avaiableEquipment?.map(avaiableEquipment => avaiableEquipment.avaiableEquipmentSlug) ?? [];
    const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
    await this.bussinessRulesService.checkForCompatibility(equipmentToVault.equipmentSlug, soldierCompatibility, soldierSkills, equipmentToVault.equipment!.category);
    await this.bussinessRulesService.validateInventorySpace(soldier.equipment!, equipmentToVault.equipment!.category);
    return this.repo.addEquipmentToSoldier(soldierId, equipmentToVault);
  }
  async removeEquipmetFromSoldier(warbandToSoldierItemId: string) {
      return this.repo.removeEquipmentFromSoldier(warbandToSoldierItemId);
  }
  async addSpellToSoldier(soldierId: string, spellSlug: string) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
    const soldierSpells = soldier.spells?.map(spell => spell.spellSlug) ?? [];
    const soldierSpellLores = soldier.baseFigure?.[0]?.baseFigure?.spellLores?.map(spellLore => spellLore.spellLoreSlug) ?? [];
    await this.bussinessRulesService.validateSpell(spellSlug, soldierSpellLores, soldierSpells, soldierSkills);
    return this.repo.addSpellToSoldier(soldierId, spellSlug);
  }
  async addSkillToSoldier(soldierId: string, skillSlug: string) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const soldierPromotedHeroSkillLists = soldier.promotedHeroSkillLists?.map(skillList => skillList.skillListSlug) ?? [];
    const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
    const soldierSkillLists = soldier.baseFigure?.[0]?.baseFigure?.skillLists?.map(skillList => skillList.skillListSlug) ?? [];
    await this.bussinessRulesService.validateSkill(skillSlug, soldierSkills,  [...soldierSkillLists, ...soldierPromotedHeroSkillLists]);
    return this.repo.addSkillToSoldier(soldierId, skillSlug);
  }
  async removeSpellFromSoldier(warbandSoldierSpellId: string) {
    return this.repo.removeSpellFromSoldier(warbandSoldierSpellId);
  }
  async removeSkillFromSoldier(warbandToSoldierItemId: string) {
    return this.repo.removeSkillFromSoldier(warbandToSoldierItemId);
  }
  async killSoldier(soldierId: string) { 
    return this.repo.killSoldier(soldierId);
  }
  async undoSoldier(soldierId: string) { 
    return this.repo.undoSoldier(soldierId);
  }
  async addInjuryToSoldier(soldierId: string, injurySlug: string) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const soldierInjuries = soldier.injuries?.map(injury => injury.injurySlug) ?? [];
    await this.bussinessRulesService.validateInjury(injurySlug, soldierInjuries, soldier.effectiveRole!);
    return this.repo.addInjuryToSoldier(soldierId, injurySlug);
  }
  async removeInjuryFromSoldier(injuryToWarbandSoldierId: string) {
    return this.repo.removeInjuryFromSoldier(injuryToWarbandSoldierId);
  }
  async addAdvancementToSoldier(soldierId: string, advancementSlug: string) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const soldierAdvancements = soldier.advancements?.map(advancement => advancement.advancementSlug) ?? [];
    await this.bussinessRulesService.validateAdvancement(advancementSlug, soldierAdvancements, soldier.effectiveRole!);
    return this.repo.addAdvancementToSoldier(soldierId, advancementSlug);
  }
  async removeAdvancementFromSoldier(advancementToWarbandSoldierId: string) {
    return this.repo.removeAdvancementFromSoldier(advancementToWarbandSoldierId);
  }
  async addSuperNaturalAbilityToSoldier(soldierId: string, superNaturalAbilitySlug: string) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const soldierSuperNaturalAbilities = soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [];
    const soldierBaseFigure = soldier.baseFigure?.[0]?.baseFigure!;
    const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
    const warbandCrowns = soldier.warband?.crowns!;
    await this.bussinessRulesService.validateSuperNaturalAbility(superNaturalAbilitySlug, soldierSuperNaturalAbilities, soldierBaseFigure, soldierSkills, warbandCrowns!);
    return this.repo.addSuperNaturalAbilityToSoldier(soldierId, superNaturalAbilitySlug);
  }
  async removeSuperNaturalAbilityFromSoldier(superNaturalAbilityToWarbandSoldierId: string) {
    return this.repo.removeSuperNaturalAbilityFromSoldier(superNaturalAbilityToWarbandSoldierId);
  }
  async equipItemToSoldier(equipmentToWarbandSoldierId: string, slot: string) {
    const warbandSoldierEquipment = await this.queriesService.findEquipmentToWarbandSoldierById(equipmentToWarbandSoldierId);
    const soldier = await this.repo.findSoldierById(warbandSoldierEquipment.warbandSoldierId);
    const soldierEquipment = soldier.equipment
    const soldierInjuries = soldier.injuries?.map(injury => injury.injurySlug)
    const soldierSuperNaturalAbilities = soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [];
    const soldierMainHand = soldier.equipment?.find(equipment => equipment.mainHandEquiped === true); 
    const soldierOffHand = soldier.equipment?.find(equipment => equipment.offHandEquiped === true); 
    const soldierTwoHanded = soldier.equipment?.find(equipment => equipment.twoHandedEquiped === true); 
    const soldierArmor = soldier.equipment?.find(equipment => equipment.armorEquiped === true); 
    const soldierHelmet = soldier.equipment?.find(equipment => equipment.helmetEquiped === true); 
    const isMainHandWeaponDebalanced = soldierMainHand ? this.bussinessRulesService.normalizeSpecialRules(soldierMainHand.equipment?.specialRules).some(specialRule => specialRule.label === `Desbalanceada`) : false;

    await this.bussinessRulesService.validateEquip(warbandSoldierEquipment, soldierEquipment ?? [], soldierSuperNaturalAbilities, soldierInjuries ?? [], slot)

    if (slot === `armorEquiped` && soldierArmor) { 
      await this.bussinessRulesService.validateArmor(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
      await this.repo.unequipGear(soldierArmor.id);
    }
    if (slot === `helmetEquiped` && soldierHelmet) { 
      await this.bussinessRulesService.validateHelmet(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
      await this.repo.unequipGear(soldierHelmet.id);
    }
    if (slot === `twoHandedEquiped`) { 
      await this.bussinessRulesService.validateEquipTwoHanded(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? []);
      await this.repo.unequipAllHandsFromSoldier(soldier.id);
    }
    if (slot === `offHandEquiped`) { 
      await this.bussinessRulesService.validateOffhand(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);

      if (soldierOffHand) {
        await this.repo.unequipGear(soldierOffHand.id);
      }

      
    }
    if (slot === `mainHandEquiped`) {
      await this.bussinessRulesService.validateMainHand(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);

      if (soldierMainHand) {
        await this.repo.unequipGear(soldierMainHand.id);
      }
    }

    await this.repo.equipGear(equipmentToWarbandSoldierId, slot);
  }
}
