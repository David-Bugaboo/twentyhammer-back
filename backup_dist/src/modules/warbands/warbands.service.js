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
exports.WarbandsService = void 0;
const common_1 = require("@nestjs/common");
const warbands_repositories_1 = require("./repositories/warbands.repositories");
const queries_service_1 = require("../queries/queries.service");
const bussiness_rules_service_1 = require("../bussiness-rules/bussiness-rules.service");
let WarbandsService = class WarbandsService {
    repo;
    queriesService;
    bussinessRulesService;
    constructor(repo, queriesService, bussinessRulesService) {
        this.repo = repo;
        this.queriesService = queriesService;
        this.bussinessRulesService = bussinessRulesService;
    }
    async create(createWarbandDto, userId, factionSlug) {
        const leader = await this.bussinessRulesService.getLeader(factionSlug);
        await this.bussinessRulesService.validateFaction(factionSlug);
        return this.repo.create(createWarbandDto, userId, factionSlug, leader);
    }
    findAll(query) {
        return this.repo.findAllWarbands(query);
    }
    findOne(id) {
        return this.repo.findWarbandById(id);
    }
    update(id, updateWarbandDto) {
        return this.repo.updateWarband(id, updateWarbandDto);
    }
    remove(id) {
        return this.repo.deleteWarband(id);
    }
    async addSoldierToWarband(warbandId, soldierSlug) {
        const soldier = await this.bussinessRulesService.resolveFigure(soldierSlug);
        const warband = await this.resolveWarband(warbandId);
        await this.validateFigureAddition(warband, soldier);
        return this.repo.addSoldierToWarband(warbandId, soldier);
    }
    async addEquipmentToVault(warbandId, dto, loot) {
        const warband = await this.resolveWarband(warbandId);
        const equipment = await this.bussinessRulesService.resolveEquipment(dto.equipmentSlug);
        const modifier = dto.modifierSlug
            ? await this.bussinessRulesService.resolveModifier(dto.modifierSlug)
            : null;
        if (modifier) {
            await this.bussinessRulesService.ValidateModifier(modifier, equipment);
        }
        await this.bussinessRulesService.validateIfBuyIsValid(warband, equipment, loot, modifier);
        return this.repo.addEquipmentToWarbandVault(warbandId, equipment, loot, modifier);
    }
    async undoEquipmentFromVault(warbandId, equipmentToVaultId, sell) {
        await this.resolveWarband(warbandId);
        return this.repo.undoEquipmentFromWarbandVault(warbandId, equipmentToVaultId, sell);
    }
    async resolveWarband(id) {
        try {
            const warband = await this.repo.findWarbandById(id);
            return warband;
        }
        catch (error) {
            throw new common_1.NotFoundException('Bando não encontrada!');
        }
    }
    async validateFigureAddition(warband, soldier) {
        if (warband.crowns < soldier.cost) {
            throw new common_1.BadRequestException(`Coroas insuficientes para comorar ${soldier.name}!`);
        }
        if (warband.factionSlug !== soldier.factionSlug) {
            throw new common_1.BadRequestException(`${soldier.name} não pertence à facção ${warband.factionSlug}!`);
        }
    }
};
exports.WarbandsService = WarbandsService;
exports.WarbandsService = WarbandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(warbands_repositories_1.WarbandsRepository)),
    __metadata("design:paramtypes", [warbands_repositories_1.WarbandsRepository,
        queries_service_1.QueriesService,
        bussiness_rules_service_1.BussinessRulesService])
], WarbandsService);
//# sourceMappingURL=warbands.service.js.map