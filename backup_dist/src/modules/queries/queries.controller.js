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
exports.QueriesController = void 0;
const common_1 = require("@nestjs/common");
const queries_service_1 = require("./queries.service");
const spell_query_dto_1 = require("./dto/spell-query.dto");
const spell_lores_query_dto_1 = require("./dto/spell-lores-query.dto");
const skill_query_dto_1 = require("./dto/skill-query.dto");
const skill_lists_query_dto_1 = require("./dto/skill-lists-query.dto");
const advancement_query_dto_1 = require("./dto/advancement-query.dto");
const injury_query_dto_1 = require("./dto/injury-query.dto");
const equipment_query_dto_1 = require("./dto/equipment-query.dto");
const super_natural_ability_query_dto_1 = require("./dto/super-natural-ability-query.dto");
const modifier_query_dto_1 = require("./dto/modifier-query.dto");
const faction_query_dto_1 = require("./dto/faction-query.dto");
const base_figure_query_dto_1 = require("./dto/base-figure-query.dto");
let QueriesController = class QueriesController {
    queriesService;
    constructor(queriesService) {
        this.queriesService = queriesService;
    }
    findAllSpellLores(dto) {
        return this.queriesService.findAllSpellLores(dto);
    }
    findAllSpells(dto) {
        return this.queriesService.findAllSpells(dto);
    }
    findSpellByslug(slug) {
        return this.queriesService.findSpellByslug(slug);
    }
    findSpellLoreByslug(slug) {
        return this.queriesService.findSpellLoreByslug(slug);
    }
    findAllSkills(dto) {
        return this.queriesService.findAllSkills(dto);
    }
    findSkillByslug(slug) {
        return this.queriesService.findSkillByslug(slug);
    }
    findAllSkillLists(dto) {
        return this.queriesService.findAllSkillLists(dto);
    }
    findSkillListByslug(slug) {
        return this.queriesService.findSkillListByslug(slug);
    }
    findAllAdvancements(dto) {
        return this.queriesService.findAllAdvancements(dto);
    }
    findAdvancementByslug(slug) {
        return this.queriesService.findAdvancementByslug(slug);
    }
    findAllInjuries(dto) {
        return this.queriesService.findAllInjuries(dto);
    }
    findInjuryByslug(slug) {
        return this.queriesService.findInjuryByslug(slug);
    }
    findAllEquipments(dto) {
        return this.queriesService.findAllEquipments(dto);
    }
    findEquipmentByslug(slug) {
        return this.queriesService.findEquipmentByslug(slug);
    }
    findAllSuperNaturalAbilities(dto) {
        return this.queriesService.findAllSuperNaturalAbilities(dto);
    }
    findSuperNaturalAbilityByslug(slug) {
        return this.queriesService.findSuperNaturalAbilityByslug(slug);
    }
    findAllModifiers(dto) {
        return this.queriesService.findAllModifiers(dto);
    }
    findModifierByslug(slug) {
        return this.queriesService.findModifierByslug(slug);
    }
    findAllFactions(dto) {
        return this.queriesService.findAllFactions(dto);
    }
    findFactionByslug(slug) {
        return this.queriesService.findFactionByslug(slug);
    }
    findAllBaseFigures(dto) {
        return this.queriesService.findAllBaseFigures(dto);
    }
    findBaseFigureByslug(slug) {
        return this.queriesService.findBaseFigureByslug(slug);
    }
};
exports.QueriesController = QueriesController;
__decorate([
    (0, common_1.Get)('spell-lores'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [spell_lores_query_dto_1.SpellLoresQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllSpellLores", null);
__decorate([
    (0, common_1.Get)('spells'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [spell_query_dto_1.SpellQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllSpells", null);
__decorate([
    (0, common_1.Get)('spells/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findSpellByslug", null);
__decorate([
    (0, common_1.Get)('spell-lores/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findSpellLoreByslug", null);
__decorate([
    (0, common_1.Get)('skills'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [skill_query_dto_1.SkillQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllSkills", null);
__decorate([
    (0, common_1.Get)('skills/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findSkillByslug", null);
__decorate([
    (0, common_1.Get)('skill-lists'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [skill_lists_query_dto_1.SkillListsQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllSkillLists", null);
__decorate([
    (0, common_1.Get)('skill-lists/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findSkillListByslug", null);
__decorate([
    (0, common_1.Get)('advancements'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [advancement_query_dto_1.AdvancementQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllAdvancements", null);
__decorate([
    (0, common_1.Get)('advancements/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAdvancementByslug", null);
__decorate([
    (0, common_1.Get)('injuries'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [injury_query_dto_1.InjuryQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllInjuries", null);
__decorate([
    (0, common_1.Get)('injuries/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findInjuryByslug", null);
__decorate([
    (0, common_1.Get)('equipments'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equipment_query_dto_1.EquipmentQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllEquipments", null);
__decorate([
    (0, common_1.Get)('equipments/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findEquipmentByslug", null);
__decorate([
    (0, common_1.Get)('supernatural-abilities'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [super_natural_ability_query_dto_1.SuperNaturalAbilityQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllSuperNaturalAbilities", null);
__decorate([
    (0, common_1.Get)('supernatural-abilities/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findSuperNaturalAbilityByslug", null);
__decorate([
    (0, common_1.Get)('modifiers'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [modifier_query_dto_1.ModifierQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllModifiers", null);
__decorate([
    (0, common_1.Get)('modifiers/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findModifierByslug", null);
__decorate([
    (0, common_1.Get)('factions'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faction_query_dto_1.FactionQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllFactions", null);
__decorate([
    (0, common_1.Get)('factions/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findFactionByslug", null);
__decorate([
    (0, common_1.Get)('base-figures'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_figure_query_dto_1.BaseFigureQueryDto]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findAllBaseFigures", null);
__decorate([
    (0, common_1.Get)('base-figures/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QueriesController.prototype, "findBaseFigureByslug", null);
exports.QueriesController = QueriesController = __decorate([
    (0, common_1.Controller)('queries'),
    __metadata("design:paramtypes", [queries_service_1.QueriesService])
], QueriesController);
//# sourceMappingURL=queries.controller.js.map