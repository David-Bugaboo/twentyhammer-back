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
exports.WarbandPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../../prisma/services/prisma.service");
const warband_entity_1 = require("../../entities/warband.entity");
const class_transformer_1 = require("class-transformer");
let WarbandPrismaRepository = class WarbandPrismaRepository {
    prisma;
    defaultWarbandInclude = {
        faction: true,
        user: true,
        vault: {
            include: {
                equipment: true,
                modifier: true,
            },
        },
        warbandSoldiers: {
            include: {
                equipment: {
                    include: {
                        equipment: true,
                        modifier: true,
                    },
                },
                baseFigure: {
                    include: {
                        baseFigure: true,
                    },
                },
            },
        },
    };
    fullWarbandInclude = {
        faction: true,
        user: true,
        vault: {
            include: {
                equipment: true,
                modifier: true,
            },
        },
        warbandSoldiers: {
            include: {
                advancements: {
                    include: {
                        advancement: true,
                    },
                },
                baseFigure: {
                    include: {
                        baseFigure: {
                            include: {
                                raceLimits: true,
                                avaiableEquipment: {
                                    include: {
                                        avaiableEquipment: true,
                                    },
                                },
                                skillLists: {
                                    include: {
                                        skillList: true,
                                    },
                                },
                                spellLores: {
                                    include: {
                                        spellLore: true,
                                    },
                                },
                                legendStartingEquipment: {
                                    include: {
                                        equipment: true,
                                    },
                                },
                                legendStartingSkills: {
                                    include: {
                                        skill: true,
                                    },
                                },
                                legendStartingSpells: {
                                    include: {
                                        spell: true,
                                    },
                                },
                                mercenaryStartingEquipment: {
                                    include: {
                                        equipment: true,
                                    },
                                },
                            },
                        },
                    },
                },
                equipment: {
                    include: {
                        equipment: true,
                        modifier: true,
                    },
                },
                injuries: {
                    include: {
                        injury: true,
                    },
                },
                skills: {
                    include: {
                        skill: {
                            include: {
                                skillList: true,
                            },
                        },
                    },
                },
                spells: {
                    include: {
                        spell: {
                            include: {
                                spellLore: true,
                            },
                        },
                    },
                },
                supernaturalAbilities: {
                    include: {
                        superNaturalAbility: true,
                    },
                },
                promotedHeroSkillLists: {
                    include: {
                        skillList: true,
                    },
                },
            },
        },
    };
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, userId, factionSlug, leader) {
        const warband = await this.prisma.warband.create({
            data: {
                ...data,
                userId,
                factionSlug,
                warbandSoldiers: {
                    create: {
                        effectiveRole: leader.role,
                        experience: leader.startingXp ?? 0,
                        baseFigure: {
                            create: {
                                baseFigureSlug: leader.slug,
                            },
                        },
                    },
                },
            },
            include: this.defaultWarbandInclude,
        });
        return (0, class_transformer_1.plainToInstance)(warband_entity_1.Warband, warband);
    }
    async findWarbandById(id) {
        const warband = await this.prisma.warband.findUniqueOrThrow({
            where: {
                id,
            },
            include: this.fullWarbandInclude,
        });
        return (0, class_transformer_1.plainToInstance)(warband_entity_1.Warband, warband);
    }
    async findAllWarbands(query) {
        var { page = 1, perPage = 10 } = query;
        const warbandsRaw = await this.prisma.warband.findMany({
            skip: (page - 1) * perPage,
            take: Number(perPage),
            include: this.defaultWarbandInclude,
        });
        const warbands = (0, class_transformer_1.plainToInstance)(warband_entity_1.Warband, warbandsRaw);
        const warbandCount = await this.prisma.warband.count();
        const totalPages = Math.ceil(warbandCount / perPage);
        return {
            page,
            perPage,
            totalPages,
            warbands,
        };
    }
    async updateWarband(id, data) {
        const warband = await this.prisma.warband.update({
            where: {
                id,
            },
            data,
            include: this.defaultWarbandInclude,
        });
        return (0, class_transformer_1.plainToInstance)(warband_entity_1.Warband, warband);
    }
    async deleteWarband(id) {
        await this.prisma.warband.delete({
            where: {
                id,
            },
        });
    }
    async addSoldierToWarband(warbandId, soldier) {
        const updated = await this.prisma.$transaction(async (tx) => {
            const warband = await tx.warband.findUniqueOrThrow({
                where: {
                    id: warbandId,
                },
                select: {
                    crowns: true,
                },
            });
            return tx.warband.update({
                where: {
                    id: warbandId,
                },
                data: {
                    warbandSoldiers: {
                        create: {
                            effectiveRole: soldier.role,
                            experience: soldier.startingXp ?? 0,
                            baseFigure: {
                                create: {
                                    baseFigureSlug: soldier.slug,
                                },
                            },
                        },
                    },
                    crowns: warband.crowns - soldier.cost,
                },
                include: this.defaultWarbandInclude,
            });
        });
        return (0, class_transformer_1.plainToInstance)(warband_entity_1.Warband, updated);
    }
    async removeSoldierFromWarband(warbandId, warbandToSoldierId) {
        const updated = await this.prisma.warband.update({
            where: {
                id: warbandId,
            },
            data: {
                warbandSoldiers: {
                    delete: {
                        id: warbandToSoldierId,
                    },
                },
            },
            include: this.defaultWarbandInclude,
        });
        return (0, class_transformer_1.plainToInstance)(warband_entity_1.Warband, updated);
    }
    async addEquipmentToWarbandVault(warbandId, equipment, loot, modifier) {
        const multiplier = modifier?.multiplier ?? 1;
        const equipmentCost = loot ? 0 : equipment.cost * multiplier;
        const updated = await this.prisma.warband.update({
            where: {
                id: warbandId,
            },
            data: {
                crowns: {
                    decrement: equipmentCost,
                },
                vault: {
                    create: {
                        equipmentSlug: equipment.slug,
                        ...(modifier ? { modifierSlug: modifier.slug } : {}),
                    },
                },
            },
            include: this.defaultWarbandInclude,
        });
        return (0, class_transformer_1.plainToInstance)(warband_entity_1.Warband, updated);
    }
    async undoEquipmentFromWarbandVault(warbandId, equipmentToVaultId, sell) {
        const updated = await this.prisma.$transaction(async (tx) => {
            const vaultEquipment = await tx.equipmentToVault.findUniqueOrThrow({
                where: {
                    id: equipmentToVaultId,
                    warbandId: warbandId,
                },
                include: {
                    equipment: true,
                    modifier: true,
                },
            });
            const multiplier = vaultEquipment.modifier?.multiplier ?? 1;
            const equipmentCost = sell
                ? Math.floor((vaultEquipment.equipment.cost * multiplier) / 2)
                : vaultEquipment.equipment.cost * multiplier;
            return tx.warband.update({
                where: {
                    id: warbandId,
                },
                data: {
                    crowns: {
                        increment: equipmentCost,
                    },
                    vault: {
                        delete: {
                            id: equipmentToVaultId,
                        },
                    },
                },
                include: this.defaultWarbandInclude,
            });
        });
        return (0, class_transformer_1.plainToInstance)(warband_entity_1.Warband, updated);
    }
};
exports.WarbandPrismaRepository = WarbandPrismaRepository;
exports.WarbandPrismaRepository = WarbandPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WarbandPrismaRepository);
//# sourceMappingURL=warband.prisma.repository.js.map