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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldiersController = void 0;
const common_1 = require("@nestjs/common");
const soldiers_service_1 = require("./soldiers.service");
let SoldiersController = class SoldiersController {
    soldiersService;
    constructor(soldiersService) {
        this.soldiersService = soldiersService;
    }
    async findOne(id) {
        return this.soldiersService.findSoldierById(id);
    }
    async addEquipmentToSoldier(soldierId, warbandVaultItemId) {
        return this.soldiersService.addEquipmentToSoldier(soldierId, warbandVaultItemId);
    }
    async removeEquipmentFromSoldier(soldierId, warbandToSoldierItemId) {
        await this.soldiersService.removeEquipmentFromSoldier(soldierId, warbandToSoldierItemId);
    }
    async equipItemToSoldier(equipmentToWarbandSoldierId, slot) {
        await this.soldiersService.equipItemToSoldier(equipmentToWarbandSoldierId, slot);
    }
    async addSpellToSoldier(soldierId, spellSlug) {
        return this.soldiersService.addSpellToSoldier(soldierId, spellSlug);
    }
    async removeSpellFromSoldier(warbandSoldierSpellId) {
        return this.soldiersService.removeSpellFromSoldier(warbandSoldierSpellId);
    }
    async addSkillToSoldier(soldierId, skillSlug) {
        return this.soldiersService.addSkillToSoldier(soldierId, skillSlug);
    }
    async removeSkillFromSoldier(skillToWarbandSoldierId) {
        await this.soldiersService.removeSkillFromSoldier(skillToWarbandSoldierId);
    }
    async killSoldier(soldierId) {
        await this.soldiersService.killSoldier(soldierId);
    }
    async undoSoldier(soldierId) {
        await this.soldiersService.undoSoldier(soldierId);
    }
    async addInjuryToSoldier(soldierId, injurySlug) {
        return this.soldiersService.addInjuryToSoldier(soldierId, injurySlug);
    }
    async removeInjuryFromSoldier(injuryToWarbandSoldierId) {
        await this.soldiersService.removeInjuryFromSoldier(injuryToWarbandSoldierId);
    }
    async addAdvancementToSoldier(soldierId, advancementSlug) {
        return this.soldiersService.addAdvancementToSoldier(soldierId, advancementSlug);
    }
    async removeAdvancementFromSoldier(advancementToWarbandSoldierId) {
        await this.soldiersService.removeAdvancementFromSoldier(advancementToWarbandSoldierId);
    }
    async addSuperNaturalAbilityToSoldier(soldierId, superNaturalAbilitySlug) {
        return this.soldiersService.addSuperNaturalAbilityToSoldier(soldierId, superNaturalAbilitySlug);
    }
    async removeSuperNaturalAbilityFromSoldier(superNaturalAbilityToWarbandSoldierId) {
        await this.soldiersService.removeSuperNaturalAbilityFromSoldier(superNaturalAbilityToWarbandSoldierId);
    }
};
exports.SoldiersController = SoldiersController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':soldierId/equipment/:warbandVaultItemId'),
    __param(0, (0, common_1.Param)('soldierId')),
    __param(1, (0, common_1.Param)('warbandVaultItemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "addEquipmentToSoldier", null);
__decorate([
    (0, common_1.Delete)(':soldierId/equipment/:warbandToSoldierItemId'),
    __param(0, (0, common_1.Param)('soldierId')),
    __param(1, (0, common_1.Param)('warbandToSoldierItemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "removeEquipmentFromSoldier", null);
__decorate([
    (0, common_1.Post)('equipment/:equipmentToWarbandSoldierId/equip/:slot'),
    __param(0, (0, common_1.Param)('equipmentToWarbandSoldierId')),
    __param(1, (0, common_1.Param)('slot')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "equipItemToSoldier", null);
__decorate([
    (0, common_1.Post)(':soldierId/spells/:spellSlug'),
    __param(0, (0, common_1.Param)('soldierId')),
    __param(1, (0, common_1.Param)('spellSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "addSpellToSoldier", null);
__decorate([
    (0, common_1.Delete)(':soldierId/spells/:warbandSoldierSpellId'),
    __param(0, (0, common_1.Param)('warbandSoldierSpellId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "removeSpellFromSoldier", null);
__decorate([
    (0, common_1.Post)(':soldierId/skills/:skillSlug'),
    __param(0, (0, common_1.Param)('soldierId')),
    __param(1, (0, common_1.Param)('skillSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "addSkillToSoldier", null);
__decorate([
    (0, common_1.Delete)(':soldierId/skills/:skillToWarbandSoldierId'),
    __param(0, (0, common_1.Param)('skillToWarbandSoldierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "removeSkillFromSoldier", null);
__decorate([
    (0, common_1.Delete)('kill/:soldierId'),
    __param(0, (0, common_1.Param)('soldierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "killSoldier", null);
__decorate([
    (0, common_1.Delete)('undo/:soldierId'),
    __param(0, (0, common_1.Param)('soldierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "undoSoldier", null);
__decorate([
    (0, common_1.Post)(':soldierId/injuries/:injurySlug'),
    __param(0, (0, common_1.Param)('soldierId')),
    __param(1, (0, common_1.Param)('injurySlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "addInjuryToSoldier", null);
__decorate([
    (0, common_1.Delete)(':soldierId/injuries/:injuryToWarbandSoldierId'),
    __param(0, (0, common_1.Param)('injuryToWarbandSoldierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "removeInjuryFromSoldier", null);
__decorate([
    (0, common_1.Post)(':soldierId/advancements/:advancementSlug'),
    __param(0, (0, common_1.Param)('soldierId')),
    __param(1, (0, common_1.Param)('advancementSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "addAdvancementToSoldier", null);
__decorate([
    (0, common_1.Delete)(':soldierId/advancements/:advancementToWarbandSoldierId'),
    __param(0, (0, common_1.Param)('advancementToWarbandSoldierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "removeAdvancementFromSoldier", null);
__decorate([
    (0, common_1.Post)(':soldierId/supernatural-abilities/:superNaturalAbilitySlug'),
    __param(0, (0, common_1.Param)('soldierId')),
    __param(1, (0, common_1.Param)('superNaturalAbilitySlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "addSuperNaturalAbilityToSoldier", null);
__decorate([
    (0, common_1.Delete)(':soldierId/supernatural-abilities/:superNaturalAbilityToWarbandSoldierId'),
    __param(0, (0, common_1.Param)('superNaturalAbilityToWarbandSoldierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoldiersController.prototype, "removeSuperNaturalAbilityFromSoldier", null);
exports.SoldiersController = SoldiersController = __decorate([
    (0, common_1.Controller)('soldiers'),
    __metadata("design:paramtypes", [soldiers_service_1.SoldiersService])
], SoldiersController);
//# sourceMappingURL=soldiers.controller.js.map