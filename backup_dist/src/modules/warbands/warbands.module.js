"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarbandsModule = void 0;
const common_1 = require("@nestjs/common");
const warbands_service_1 = require("./warbands.service");
const warbands_controller_1 = require("./warbands.controller");
const prisma_service_1 = require("../../../prisma/services/prisma.service");
const warbands_repositories_1 = require("./repositories/warbands.repositories");
const warband_prisma_repository_1 = require("./repositories/prisma/warband.prisma.repository");
const queries_service_1 = require("../queries/queries.service");
const queries_repository_1 = require("../queries/repositories/queries.repository");
const queries_prisma_repository_1 = require("../queries/repositories/prisma/queries.prisma.repository");
const bussiness_rules_service_1 = require("../bussiness-rules/bussiness-rules.service");
let WarbandsModule = class WarbandsModule {
};
exports.WarbandsModule = WarbandsModule;
exports.WarbandsModule = WarbandsModule = __decorate([
    (0, common_1.Module)({
        controllers: [warbands_controller_1.WarbandsController],
        providers: [
            prisma_service_1.PrismaService,
            warbands_service_1.WarbandsService,
            { provide: warbands_repositories_1.WarbandsRepository, useClass: warband_prisma_repository_1.WarbandPrismaRepository },
            queries_service_1.QueriesService,
            { provide: queries_repository_1.QueriesRepository, useClass: queries_prisma_repository_1.QueriesPrismaRepository },
            bussiness_rules_service_1.BussinessRulesService,
        ],
    })
], WarbandsModule);
//# sourceMappingURL=warbands.module.js.map