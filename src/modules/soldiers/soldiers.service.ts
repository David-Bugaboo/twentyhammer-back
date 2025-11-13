import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SoldiersRepository } from './repositories/soldiers.repository';
import { WarbandsService } from '../warbands/warbands.service';
import { QueriesService } from '../queries/queries.service';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';
import { UpdateSoldierDto } from './dto/update-soldier.dto';

@Injectable()
export class SoldiersService {
  constructor(
    private readonly repo: SoldiersRepository,
    private readonly warbandRepo: WarbandsService,
    private readonly queriesService: QueriesService,
    private readonly bussinessRulesService: BussinessRulesService,
  ) {}

  async updateSoldier(soldierId: string, updateSoldierDto: UpdateSoldierDto) {
    return this.repo.updateSoldier(soldierId, updateSoldierDto);
  }
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
    const soldierAdvancements = soldier.advancements?.map(advancement => advancement.advancementSlug) ?? [];                                       
    await this.bussinessRulesService.validateSpell(spellSlug, soldierSpellLores, soldierSpells, soldierSkills, soldierAdvancements);

    return this.repo.addSpellToSoldier(soldierId, spellSlug);
  }
  async addSkillToSoldier(soldierId: string, skillSlug: string) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const soldierExtraSkillLists = soldier.extraSkillLists?.map(skillList => skillList.skillListSlug) ?? [];
    const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
    const soldierSkillLists = soldier.baseFigure?.[0]?.baseFigure?.skillLists?.map(skillList => skillList.skillListSlug) ?? [];
    const soldierAdvancements = soldier.advancements?.map(advancement => advancement.advancementSlug) ?? [];

    await this.bussinessRulesService.validateSkill(skillSlug, soldierSkills, [...soldierSkillLists, ...soldierExtraSkillLists], soldierAdvancements);
    
    return this.repo.addSkillToSoldier(soldierId, skillSlug);
  }
  async removeSpellFromSoldier(warbandSoldierSpellId: string) {
    return this.repo.removeSpellFromSoldier(warbandSoldierSpellId);


  }
  async removeSkillFromSoldier(warbandToSoldierItemId: string) {
    const skill = await this.queriesService.findSkillToWarbandSoldierById(warbandToSoldierItemId);

    if(skill.skillSlug === 'corpo-treinado') {
      await this.repo.removeExtraSkillListFromSoldier(skill.warbandSoldierId, 'forca');
    }

    if(skill.skillSlug === 'aprendizado-arcano') {
      await this.repo.removeExtraSpellLoreFromSoldier(skill.warbandSoldierId, 'magia-inferior');
    }

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
    const soldierArmor = soldier.equipment?.find(equipment => equipment.armorEquiped === true); 
    const soldierHelmet = soldier.equipment?.find(equipment => equipment.helmetEquiped === true); 
    
    
    if (slot === `armorEquiped` && soldierArmor) { 
      await this.bussinessRulesService.validateArmor(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
    }
    if (slot === `helmetEquiped` && soldierHelmet) { 
      await this.bussinessRulesService.validateHelmet(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []); 
    }
    if (slot === `twoHandedEquiped`) { 
      await this.bussinessRulesService.validateEquipTwoHanded(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
    }
    if (slot === `offHandEquiped`) { 
      await this.bussinessRulesService.validateOffhand(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
    }
    if (slot === `mainHandEquiped`) {
      await this.bussinessRulesService.validateMainHand(warbandSoldierEquipment.equipment!, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
    }
    await this.repo.equipGear(equipmentToWarbandSoldierId, slot);
    
    const twoWeaponFighting = await this.defineIfTwoWeaponFighting(soldier.id);

    await this.repo.updateSoldier(soldier.id, { twoWeaponFighting });
    
  }
  async unequipItemFromSoldier(equipmentToWarbandSoldierId: string) {
    const warbandSoldierEquipment = await this.queriesService.findEquipmentToWarbandSoldierById(equipmentToWarbandSoldierId);
    const soldier = await this.repo.findSoldierById(warbandSoldierEquipment.warbandSoldierId);
    await this.repo.unequipGear(equipmentToWarbandSoldierId);
    const twoWeaponFighting = await this.defineIfTwoWeaponFighting(soldier.id);
    await this.repo.updateSoldier(soldier.id, { twoWeaponFighting });

  }
  async defineIfTwoWeaponFighting(soldierId: string) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const soldierEquipment = soldier.equipment ?? []
    const soldierInjuries = soldier.injuries ?? []
    const soldierSkills = soldier.skills ?? [];
    const soldierSuperNaturalAbilities = soldier.supernaturalAbilities ?? []
    return await this.bussinessRulesService.checkIfTwoWeaponFighting(soldierEquipment ?? [], soldierSkills ?? [], soldierInjuries ?? [], soldierSuperNaturalAbilities ?? []);
  }
  async unequipSlotFromSoldier(soldierId: string, slot: string) {
    const allowedSlots = [
      'mainHandEquiped',
      'offHandEquiped',
      'twoHandedEquiped',
      'armorEquiped',
      'helmetEquiped',
    ];

    if (!allowedSlots.includes(slot)) {
      throw new BadRequestException('Slot inválido para desequipar.');
    }
    await this.repo.unequipSlotFromSoldier(soldierId, slot);
    const twoWeaponFighting = await this.defineIfTwoWeaponFighting(soldierId);
    await this.repo.updateSoldier(soldierId, { twoWeaponFighting });
  }
  async fortifySpell(spellToWarbandSoldierId: string) {
    const spell = await this.queriesService.findSpellToWarbandSoldierById(spellToWarbandSoldierId);

    if (spell.spell?.difficultyClass! - spell.modifier <= 6) {
      throw new BadRequestException('Feitiço chegou ao limite de forticação.');
    }
    
    return this.repo.fortifySpell(spellToWarbandSoldierId);
  }
  async unfortifySpell(spellToWarbandSoldierId: string) {
    const spell = await this.queriesService.findSpellToWarbandSoldierById(spellToWarbandSoldierId);
    const soldier = await this.repo.findSoldierById(spell.warbandSoldierId);
    const soldierAdvancements = soldier.advancements?.map(advancement => advancement.advancementSlug) ?? [];
    const soldierSpells = soldier.spells
    const howManySpellFortifies = soldierSpells?.reduce((acc, spell) => acc + spell.modifier, 0) ?? 0
    const howManyFortifyAdvancements = soldierAdvancements.filter(advancement => advancement === `fortalecer-magia`).length;
    
    if(howManySpellFortifies! >= howManyFortifyAdvancements) {
      throw new BadRequestException('sem avanços de fortificação de magia suficientes para desfortificar uma magia!');
    }

    if (spell.modifier === 0) {
      throw new BadRequestException('Feitiço não fortificado.');
    }
    return this.repo.unfortifySpell(spellToWarbandSoldierId);
  }
  async promoteToHero(soldierId: string, skillsListSlugs: string[]) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const warband = await this.warbandRepo.resolveWarband(soldier.warbandId);
    const factionFigures = await this.queriesService.findAllBaseFigures({ factionSlug: warband.factionSlug });
    const factionSkillLists = factionFigures.flatMap(figure => figure.skillLists?.map(skillList => skillList.skillListSlug));
    if (skillsListSlugs.every(skillList => factionSkillLists.includes(skillList))) {
      await this.repo.promoteToHero(soldierId, skillsListSlugs);
    } else {
      throw new BadRequestException('Listas de habilidades inválida.');
    }
  }
  async promoteLeader(soldierId: string) {
    const soldier = await this.repo.findSoldierById(soldierId);
    const warband = await this.warbandRepo.resolveWarband(soldier.warbandId);

    const leader = warband.warbandSoldiers?.find(warbandSoldier => warbandSoldier.effectiveRole === `LENDA`);

    if (leader) {
      throw new BadRequestException('Já existe um líder no bando.');
    }

    await this.repo.promoteLeader(soldierId);

    
  }

  
}
