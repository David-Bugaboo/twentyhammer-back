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
exports.QueriesService = void 0;
const common_1 = require("@nestjs/common");
const queries_repository_1 = require("./repositories/queries.repository");
let QueriesService = class QueriesService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAllSpellLores(dto) {
        return this.repo.findAllSpellLores(dto);
    }
    findAllSpells(dto) {
        return this.repo.findAllSpells(dto);
    }
    findSpellByslug(slug) {
        return this.repo.findSpellByslug(slug);
    }
    findSpellLoreByslug(slug) {
        return this.repo.findSpellLoreByslug(slug);
    }
    findAllSkills(dto) {
        return this.repo.findAllSkills(dto);
    }
    findSkillByslug(slug) {
        return this.repo.findSkillByslug(slug);
    }
    findAllSkillLists(dto) {
        return this.repo.findAllSkillLists(dto);
    }
    findSkillListByslug(slug) {
        return this.repo.findSkillListByslug(slug);
    }
    findAllAdvancements(dto) {
        return this.repo.findAllAdvancements(dto);
    }
    findAdvancementByslug(slug) {
        return this.repo.findAdvancementByslug(slug);
    }
    findAllInjuries(dto) {
        return this.repo.findAllInjuries(dto);
    }
    findInjuryByslug(slug) {
        return this.repo.findInjuryByslug(slug);
    }
    findAllEquipments(dto) {
        return this.repo.findAllEquipments(dto);
    }
    findEquipmentByslug(slug) {
        return this.repo.findEquipmentByslug(slug);
    }
    findAllSuperNaturalAbilities(dto) {
        return this.repo.findAllSuperNaturalAbilities(dto);
    }
    findSuperNaturalAbilityByslug(slug) {
        return this.repo.findSuperNaturalAbilityByslug(slug);
    }
    findAllModifiers(dto) {
        return this.repo.findAllModifiers(dto);
    }
    findModifierByslug(slug) {
        return this.repo.findModifierByslug(slug);
    }
    findAllFactions(dto) {
        return this.repo.findAllFactions(dto);
    }
    findFactionByslug(slug) {
        return this.repo.findFactionByslug(slug);
    }
    findAllBaseFigures(dto) {
        return this.repo.findAllBaseFigures(dto);
    }
    findBaseFigureByslug(slug) {
        return this.repo.findBaseFigureByslug(slug);
    }
    async findEquipmentToWarbandSoldierById(id) {
        try {
            return await this.repo.findEquipmentToWarbandSoldierById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Equipamento não encontrado no inventário.');
        }
    }
    async findEquipmentToVaultById(id) {
        try {
            return await this.repo.findEquipmentToVaultById(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Equipamento não encontrado no inventário.');
        }
    }
};
exports.QueriesService = QueriesService;
exports.QueriesService = QueriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [queries_repository_1.QueriesRepository])
], QueriesService);
//# sourceMappingURL=queries.service.js.map