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
exports.WarbandsController = void 0;
const common_1 = require("@nestjs/common");
const warbands_service_1 = require("./warbands.service");
const create_warband_dto_1 = require("./dto/create-warband.dto");
const update_warband_dto_1 = require("./dto/update-warband.dto");
const query_dto_1 = require("../../common/dtos/query.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const queries_service_1 = require("../queries/queries.service");
const add_equipment_to_vault_dto_1 = require("./dto/add-equipment-to-vault.dto");
let WarbandsController = class WarbandsController {
    warbandsService;
    queriesService;
    constructor(warbandsService, queriesService) {
        this.warbandsService = warbandsService;
        this.queriesService = queriesService;
    }
    async create(createWarbandDto, req, factionSlug) {
        const leader = await this.queriesService.findAllBaseFigures({
            role: 'LIDER',
            factionSlug,
        });
        console.log(leader);
        return this.warbandsService.create(createWarbandDto, req.user.id, factionSlug);
    }
    findAll(query) {
        return this.warbandsService.findAll(query);
    }
    findOne(id, req) {
        return this.warbandsService.findOne(id, req.user.id);
    }
    update(id, updateWarbandDto) {
        return this.warbandsService.update(id, updateWarbandDto);
    }
    remove(id) {
        return this.warbandsService.remove(id);
    }
    addFigure(id, figureSlug) {
        return this.warbandsService.addSoldierToWarband(id, figureSlug);
    }
    addEquipmentToVault(id, dto, loot) {
        const boolLoot = loot === 'true' ? true : false;
        console.log(loot);
        return this.warbandsService.addEquipmentToVault(id, dto, boolLoot);
    }
    undoEquipmentFromVault(warbandId, warbandToVaultItem, sell) {
        const boolSell = sell === 'true' ? true : false;
        console.log(sell);
        return this.warbandsService.undoEquipmentFromVault(warbandId, warbandToVaultItem, boolSell);
    }
    fireSoldierFromWarband(warbandId, warbandToSoldierId) {
        return this.warbandsService.fireSoldierFromWarband(warbandId, warbandToSoldierId);
    }
    shareWarband(id) {
        return this.warbandsService.createSharedLink(id);
    }
    updateSharedLink(id) {
        return this.warbandsService.updateSharedLink(id);
    }
    findSharedLinkById(id) {
        return this.warbandsService.findSharedLinkById(id);
    }
};
exports.WarbandsController = WarbandsController;
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':factionSlug'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('factionSlug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_warband_dto_1.CreateWarbandDto, Object, String]),
    __metadata("design:returntype", Promise)
], WarbandsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.QueryDto]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_warband_dto_1.UpdateWarbandDto]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/add-figure/:figureSlug'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)(`figureSlug`)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "addFigure", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/vault'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)('loot')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_equipment_to_vault_dto_1.AddEquipmentToVaultDto, String]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "addEquipmentToVault", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':warbandId/undoFromVault/:warbandToVaultItem'),
    __param(0, (0, common_1.Param)('warbandId')),
    __param(1, (0, common_1.Param)('warbandToVaultItem')),
    __param(2, (0, common_1.Query)('sell')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "undoEquipmentFromVault", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':warbandId/fire/:warbandToSoldierId'),
    __param(0, (0, common_1.Param)('warbandId')),
    __param(1, (0, common_1.Param)('warbandToSoldierId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "fireSoldierFromWarband", null);
__decorate([
    (0, common_1.Post)(':id/share'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "shareWarband", null);
__decorate([
    (0, common_1.Patch)(':id/share'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "updateSharedLink", null);
__decorate([
    (0, common_1.Get)('shared-link/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WarbandsController.prototype, "findSharedLinkById", null);
exports.WarbandsController = WarbandsController = __decorate([
    (0, common_1.Controller)('warbands'),
    __metadata("design:paramtypes", [warbands_service_1.WarbandsService,
        queries_service_1.QueriesService])
], WarbandsController);
//# sourceMappingURL=warbands.controller.js.map