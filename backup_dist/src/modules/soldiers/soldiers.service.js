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
        await this.warbandRepo.addEquipmentToVault(equipment.warbandSoldier?.warbandId, {
            equipmentSlug: equipment.equipmentSlug,
            modifierSlug: equipment.modifierSlug ?? undefined,
        }, true);
        await this.repo.removeEquipmentFromSoldier(warbandToSoldierItem);
    }
    async addEquipmentToSoldier(soldierId, warbandVaultItem) {
        const equipment = await this.queriesService.findEquipmentToVaultById(warbandVaultItem);
        return this.repo.addEquipmentToSoldier(soldierId, equipment);
    }
    async removeEquipmetFromSoldier(warbandToSoldierItemId) {
        return this.repo.removeEquipmentFromSoldier(warbandToSoldierItemId);
    }
    async addSpellToSoldier(soldierId, spellSlug) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
        const soldierSpells = soldier.spells?.map(spell => spell.spellSlug) ?? [];
        const soldierSpellLores = soldier.baseFigure?.[0]?.baseFigure?.spellLores?.map(spellLore => spellLore.spellLoreSlug) ?? [];
        await this.bussinessRulesService.validateSpell(spellSlug, soldierSpellLores, soldierSpells, soldierSkills);
        return this.repo.addSpellToSoldier(soldierId, spellSlug);
    }
    async addSkillToSoldier(soldierId, skillSlug) {
        const soldier = await this.repo.findSoldierById(soldierId);
        const soldierPromotedHeroSkillLists = soldier.promotedHeroSkillLists?.map(skillList => skillList.skillListSlug) ?? [];
        const soldierSkills = soldier.skills?.map(skill => skill.skillSlug) ?? [];
        const soldierSkillLists = soldier.baseFigure?.[0]?.baseFigure?.skillLists?.map(skillList => skillList.skillListSlug) ?? [];
        await this.bussinessRulesService.validateSkill(skillSlug, soldierSkills, [...soldierSkillLists, ...soldierPromotedHeroSkillLists]);
        return this.repo.addSkillToSoldier(soldierId, skillSlug);
    }
    async removeSpellFromSoldier(warbandSoldierSpellId) {
        return this.repo.removeSpellFromSoldier(warbandSoldierSpellId);
    }
    async removeSkillFromSoldier(warbandToSoldierItemId) {
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
        const soldierSuperNaturalAbilities = soldier.supernaturalAbilities?.map(superNaturalAbility => superNaturalAbility.superNaturalAbilitySlug) ?? [];
        const soldierMainHand = soldier.equipment?.find(equipment => equipment.mainHandEquiped === true);
        const soldierOffHand = soldier.equipment?.find(equipment => equipment.offHandEquiped === true);
        const soldierTwoHanded = soldier.equipment?.find(equipment => equipment.twoHandedEquiped === true);
        const soldierArmor = soldier.equipment?.find(equipment => equipment.armorEquiped === true);
        const soldierHelmet = soldier.equipment?.find(equipment => equipment.helmetEquiped === true);
        const isMainHandWeaponDebalanced = soldierMainHand ? this.bussinessRulesService.normalizeSpecialRules(soldierMainHand.equipment?.specialRules).some(specialRule => specialRule.label === `Desbalanceada`) : false;
        await this.bussinessRulesService.validateEquip(warbandSoldierEquipment, soldierEquipment ?? [], soldierSuperNaturalAbilities, soldierInjuries ?? [], slot);
        if (slot === `armorEquiped` && soldierArmor) {
            await this.repo.unequipGear(soldierArmor.id);
        }
        if (slot === `helmetEquiped` && soldierHelmet) {
            await this.repo.unequipGear(soldierHelmet.id);
        }
        if (slot === `twoHandedEquiped`) {
            await this.repo.unequipAllHandsFromSoldier(soldier.id);
        }
        if (slot === `offHandEquiped` && soldierOffHand) {
            await this.repo.unequipGear(soldierOffHand.id);
            if (soldierMainHand && isMainHandWeaponDebalanced) {
                await this.repo.unequipGear(soldierMainHand.id);
            }
        }
        if (slot === `mainHandEquiped` && soldierMainHand) {
            await this.repo.unequipGear(soldierMainHand.id);
            if (soldierOffHand && isMainHandWeaponDebalanced) {
                await this.repo.unequipGear(soldierOffHand.id);
            }
        }
        await this.repo.equipGear(equipmentToWarbandSoldierId, slot);
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