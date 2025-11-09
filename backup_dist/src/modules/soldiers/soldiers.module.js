"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoldiersModule = void 0;
const common_1 = require("@nestjs/common");
const soldiers_service_1 = require("./soldiers.service");
const soldiers_controller_1 = require("./soldiers.controller");
const prisma_service_1 = require("../../../prisma/services/prisma.service");
const soldiers_repository_1 = require("./repositories/soldiers.repository");
const soldiers_prisma_repository_1 = require("./repositories/prisma/soldiers.prisma.repository");
const warband_prisma_repository_1 = require("../warbands/repositories/prisma/warband.prisma.repository");
const warbands_repositories_1 = require("../warbands/repositories/warbands.repositories");
const warbands_service_1 = require("../warbands/warbands.service");
const queries_service_1 = require("../queries/queries.service");
const queries_repository_1 = require("../queries/repositories/queries.repository");
const queries_prisma_repository_1 = require("../queries/repositories/prisma/queries.prisma.repository");
const bussiness_rules_service_1 = require("../bussiness-rules/bussiness-rules.service");
let SoldiersModule = class SoldiersModule {
};
exports.SoldiersModule = SoldiersModule;
exports.SoldiersModule = SoldiersModule = __decorate([
    (0, common_1.Module)({
        controllers: [soldiers_controller_1.SoldiersController],
        providers: [
            soldiers_service_1.SoldiersService,
            prisma_service_1.PrismaService,
            {
                provide: soldiers_repository_1.SoldiersRepository,
                useClass: soldiers_prisma_repository_1.SoldiersPrismaRepository,
            },
            warbands_service_1.WarbandsService,
            {
                provide: warbands_repositories_1.WarbandsRepository,
                useClass: warband_prisma_repository_1.WarbandPrismaRepository,
            },
            queries_service_1.QueriesService,
            {
                provide: queries_repository_1.QueriesRepository,
                useClass: queries_prisma_repository_1.QueriesPrismaRepository,
            },
            bussiness_rules_service_1.BussinessRulesService,
        ],
    })
], SoldiersModule);
//# sourceMappingURL=soldiers.module.js.map