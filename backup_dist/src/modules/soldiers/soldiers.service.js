"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldiersService = void 0;
const common_1 = require("@nestjs/common");
const soldiers_repository_1 = require("./repositories/soldiers.repository");
const warbands_service_1 = require("../warbands/warbands.service");
const queries_service_1 = require("../queries/queries.service");
const bussiness_rules_service_1 = require("../bussiness-rules/bussiness-rules.service");
let SoldiersService = class SoldiersService {
    repo;
    warbandRepo;
    queriesService;
    bussinessRulesService;
    constructor(repo, warbandRepo, queriesService, bussinessRulesService) {
        this.repo = repo;
        this.warbandRepo = warbandRepo;
        this.queriesService = queriesService;
        this.bussinessRulesService = bussinessRulesService;
    }
    async updateSoldier(soldierId, updateSoldierDto) {
        return this.repo.updateSoldier(soldierId, updateSoldierDto);
    }
    async findSoldierById(soldierId) {
        try {
            return await this.repo.findSoldierById(soldierId);
        }
        catch (error) {
            throw new common_1.NotFoundException('Soldado não encontrado.');
        }
    }
    async removeEquipmentFromSoldier(soldierId, warbandToSoldierItem) {
        const equipment = await this.queriesService.findEquipmentToWarbandSoldierById(warbandToSoldierItem);
        await this.repo.removeEquipmentFromSoldier(warbandToSoldierItem);
    }
    async addEquipmentToSoldier(soldierId, warbandVaultItem) {
        const equipmentToVault = await this.queriesService.findEquipmentToVaultById(warbandVaultItem);
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierCompatibility = soldier.baseFigure?.[0]?.baseFigure?.avaiableEquipment?.map(avaiableEquipment => avaiableEquipment.avaiableEquipmentSlug) ?? [];
        const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
        await this.bussinessRulesService.checkForCompatibility(equipmentToVault.equipmentSlug, soldierCompatibility, soldierSkills, equipmentToVault.equipment.category);
        await this.bussinessRulesService.validateInventorySpace(soldier.equipment, equipmentToVault.equipment.category);
        return this.repo.addEquipmentToSoldier(soldierId, equipmentToVault);
    }
    async removeEquipmetFromSoldier(warbandToSoldierItemId) {
        return this.repo.removeEquipmentFromSoldier(warbandToSoldierItemId);
    }
    async addSpellToSoldier(soldierId, spellSlug) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
        const soldierSpells = soldier.spells?.map(spell => spell.spellSlug) ?? [];
        const soldierSpellLores = soldier.baseFigure?.[0]?.baseFigure?.spellLores?.map(spellLore => spellLore.spellLoreSlug) ?? [];
        const soldierAdvancements = soldier.advancements?.map(advancement => advancement.advancementSlug) ?? [];
        await this.bussinessRulesService.validateSpell(spellSlug, soldierSpellLores, soldierSpells, soldierSkills, soldierAdvancements);
        return this.repo.addSpellToSoldier(soldierId, spellSlug);
    }
    async addSkillToSoldier(soldierId, skillSlug) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierExtraSkillLists = soldier.extraSkillLists?.map(skillList => skillList.skillListSlug) ?? [];
        const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
        const soldierSkillLists = soldier.baseFigure?.[0]?.baseFigure?.skillLists?.map(skillList => skillList.skillListSlug) ?? [];
        const soldierAdvancements = soldier.advancements?.map(advancement => advancement.advancementSlug) ?? [];
        await this.bussinessRulesService.validateSkill(skillSlug, soldierSkills, [...soldierSkillLists, ...soldierExtraSkillLists], soldierAdvancements);
        return this.repo.addSkillToSoldier(soldierId, skillSlug);
    }
    async removeSpellFromSoldier(warbandSoldierSpellId) {
        return this.repo.removeSpellFromSoldier(warbandSoldierSpellId);
    }
    async removeSkillFromSoldier(warbandToSoldierItemId) {
        const skill = await this.queriesService.findSkillToWarbandSoldierById(warbandToSoldierItemId);
        if (skill.skillSlug === 'corpo-treinado') {
            await this.repo.removeExtraSkillListFromSoldier(skill.warbandSoldierId, 'forca');
        }
        if (skill.skillSlug === 'aprendizado-arcano') {
            await this.repo.removeExtraSpellLoreFromSoldier(skill.warbandSoldierId, 'magia-inferior');
        }
        return this.repo.removeSkillFromSoldier(warbandToSoldierItemId);
    }
    async killSoldier(soldierId) {
        return this.repo.killSoldier(soldierId);
    }
    async undoSoldier(soldierId) {
        return this.repo.undoSoldier(soldierId);
    }
    async addInjuryToSoldier(soldierId, injurySlug) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierInjuries = soldier.injuries?.map(injury => injury.injurySlug) ?? [];
        await this.bussinessRulesService.validateInjury(injurySlug, soldierInjuries, soldier.effectiveRole);
        return this.repo.addInjuryToSoldier(soldierId, injurySlug);
    }
    async removeInjuryFromSoldier(injuryToWarbandSoldierId) {
        return this.repo.removeInjuryFromSoldier(injuryToWarbandSoldierId);
    }
    async addAdvancementToSoldier(soldierId, advancementSlug) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierAdvancements = soldier.advancements?.map(advancement => advancement.advancementSlug) ?? [];
        await this.bussinessRulesService.validateAdvancement(advancementSlug, soldierAdvancements, soldier.effectiveRole);
        return this.repo.addAdvancementToSoldier(soldierId, advancementSlug);
    }
    async removeAdvancementFromSoldier(advancementToWarbandSoldierId) {
        return this.repo.removeAdvancementFromSoldier(advancementToWarbandSoldierId);
    }
    async addSuperNaturalAbilityToSoldier(soldierId, superNaturalAbilitySlug) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierSuperNaturalAbilities = soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [];
        const soldierBaseFigure = soldier.baseFigure?.[0]?.baseFigure;
        const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
        const warbandCrowns = soldier.warband?.crowns;
        await this.bussinessRulesService.validateSuperNaturalAbility(superNaturalAbilitySlug, soldierSuperNaturalAbilities, soldierBaseFigure, soldierSkills, warbandCrowns);
        return this.repo.addSuperNaturalAbilityToSoldier(soldierId, superNaturalAbilitySlug);
    }
    async removeSuperNaturalAbilityFromSoldier(superNaturalAbilityToWarbandSoldierId) {
        return this.repo.removeSuperNaturalAbilityFromSoldier(superNaturalAbilityToWarbandSoldierId);
    }
    async equipItemToSoldier(equipmentToWarbandSoldierId, slot) {
        const warbandSoldierEquipment = await this.queriesService.findEquipmentToWarbandSoldierById(equipmentToWarbandSoldierId);
        const soldier = await this.repo.findSoldierById(warbandSoldierEquipment.warbandSoldierId);
        const soldierEquipment = soldier.equipment;
        const soldierInjuries = soldier.injuries?.map(injury => injury.injurySlug);
        const soldierArmor = soldier.equipment?.find(equipment => equipment.armorEquiped === true);
        const soldierHelmet = soldier.equipment?.find(equipment => equipment.helmetEquiped === true);
        const equipmentSpecialRules = this.bussinessRulesService.normalizeSpecialRules(warbandSoldierEquipment?.equipment?.specialRules);
        if (slot === `armorEquiped` && soldierArmor) {
            await this.bussinessRulesService.validateArmor(warbandSoldierEquipment.equipment, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
        }
        if (slot === `helmetEquiped` && soldierHelmet) {
            await this.bussinessRulesService.validateHelmet(warbandSoldierEquipment.equipment, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
        }
        if (slot === `twoHandedEquiped`) {
            await this.bussinessRulesService.validateEquipTwoHanded(warbandSoldierEquipment.equipment, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
        }
        if (slot === `offHandEquiped`) {
            await this.bussinessRulesService.validateOffhand(warbandSoldierEquipment.equipment, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
        }
        if (slot === `mainHandEquiped`) {
            await this.bussinessRulesService.validateMainHand(warbandSoldierEquipment.equipment, soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [], soldierInjuries ?? [], soldierEquipment ?? []);
        }
        if (equipmentSpecialRules.some(rule => rule.label === `Par`)) {
            slot = `Par`;
        }
        await this.repo.equipGear(equipmentToWarbandSoldierId, slot);
        const twoWeaponFighting = await this.defineIfTwoWeaponFighting(soldier.id);
        await this.repo.updateSoldier(soldier.id, { twoWeaponFighting });
    }
    async unequipItemFromSoldier(equipmentToWarbandSoldierId) {
        const warbandSoldierEquipment = await this.queriesService.findEquipmentToWarbandSoldierById(equipmentToWarbandSoldierId);
        const soldier = await this.repo.findSoldierById(warbandSoldierEquipment.warbandSoldierId);
        await this.repo.unequipGear(equipmentToWarbandSoldierId);
        const twoWeaponFighting = await this.defineIfTwoWeaponFighting(soldier.id);
        await this.repo.updateSoldier(soldier.id, { twoWeaponFighting });
    }
    async defineIfTwoWeaponFighting(soldierId) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierEquipment = soldier.equipment ?? [];
        const soldierInjuries = soldier.injuries ?? [];
        const soldierSkills = soldier.skills ?? [];
        const soldierSuperNaturalAbilities = soldier.supernaturalAbilities ?? [];
        return await this.bussinessRulesService.checkIfTwoWeaponFighting(soldierEquipment ?? [], soldierSkills ?? [], soldierInjuries ?? [], soldierSuperNaturalAbilities ?? []);
    }
    async unequipSlotFromSoldier(soldierId, slot) {
        const allowedSlots = [
            'mainHandEquiped',
            'offHandEquiped',
            'twoHandedEquiped',
            'armorEquiped',
            'helmetEquiped',
        ];
        if (!allowedSlots.includes(slot)) {
            throw new common_1.BadRequestException('Slot inválido para desequipar.');
        }
        await this.repo.unequipSlotFromSoldier(soldierId, slot);
        const twoWeaponFighting = await this.defineIfTwoWeaponFighting(soldierId);
        await this.repo.updateSoldier(soldierId, { twoWeaponFighting });
    }
    async fortifySpell(spellToWarbandSoldierId) {
        const spell = await this.queriesService.findSpellToWarbandSoldierById(spellToWarbandSoldierId);
        if (spell.spell?.difficultyClass - spell.modifier <= 6) {
            throw new common_1.BadRequestException('Feitiço chegou ao limite de forticação.');
        }
        return this.repo.fortifySpell(spellToWarbandSoldierId);
    }
    async unfortifySpell(spellToWarbandSoldierId) {
        const spell = await this.queriesService.findSpellToWarbandSoldierById(spellToWarbandSoldierId);
        const soldier = await this.repo.findSoldierById(spell.warbandSoldierId);
        const soldierAdvancements = soldier.advancements?.map(advancement => advancement.advancementSlug) ?? [];
        const soldierSpells = soldier.spells;
        const howManySpellFortifies = soldierSpells?.reduce((acc, spell) => acc + spell.modifier, 0) ?? 0;
        const howManyFortifyAdvancements = soldierAdvancements.filter(advancement => advancement === `fortalecer-magia`).length;
        if (howManySpellFortifies >= howManyFortifyAdvancements) {
            throw new common_1.BadRequestException('sem avanços de fortificação de magia suficientes para desfortificar uma magia!');
        }
        if (spell.modifier === 0) {
            throw new common_1.BadRequestException('Feitiço não fortificado.');
        }
        return this.repo.unfortifySpell(spellToWarbandSoldierId);
    }
    async promoteToHero(soldierId, skillsListSlugs) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const warband = await this.warbandRepo.resolveWarband(soldier.warbandId);
        const factionFigures = await this.queriesService.findAllBaseFigures({ factionSlug: warband.factionSlug });
        const factionSkillLists = factionFigures.flatMap(figure => figure.skillLists?.map(skillList => skillList.skillListSlug));
        if (skillsListSlugs.every(skillList => factionSkillLists.includes(skillList))) {
            await this.repo.promoteToHero(soldierId, skillsListSlugs);
        }
        else {
            throw new common_1.BadRequestException('Listas de habilidades inválida.');
        }
    }
    async promoteLeader(soldierId) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const warband = await this.warbandRepo.resolveWarband(soldier.warbandId);
        const leader = warband.warbandSoldiers?.find(warbandSoldier => warbandSoldier.effectiveRole === `LENDA`);
        if (leader) {
            throw new common_1.BadRequestException('Já existe um líder no bando.');
        }
        await this.repo.promoteLeader(soldierId);
    }
    async toggleSoldierActive(soldierId) {
        return this.repo.toggleSoldierActive(soldierId);
    }
};
exports.SoldiersService = SoldiersService;
exports.SoldiersService = SoldiersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [soldiers_repository_1.SoldiersRepository,
        warbands_service_1.WarbandsService,
        queries_service_1.QueriesService,
        bussiness_rules_service_1.BussinessRulesService])
], SoldiersService);
//# sourceMappingURL=soldiers.service.js.map