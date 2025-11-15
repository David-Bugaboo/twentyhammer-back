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
const base_figure_entity_1 = require("../../../../entities/base-figure.entity");
const class_transformer_1 = require("class-transformer");
const sharedLink_entity_1 = require("../../entities/sharedLink.entity");
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
        sharedLinks: true,
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
        sharedLinks: true,
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
                extraSkillsLists: {
                    include: {
                        skillList: true,
                    },
                },
                extraSpellsLores: {
                    include: {
                        spellLore: true,
                    }
                },
            },
        },
    };
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, userId, factionSlug) {
        const warband = await this.prisma.warband.create({
            data: {
                ...data,
                userId,
                factionSlug,
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
        const isDaggerCompatible = soldier.avaiableEquipment?.find(equipment => equipment.avaiableEquipmentSlug === `adaga`);
        const startingEquipment = isDaggerCompatible ? [{
                compatible: true,
                equipmentSlug: `adaga`
            }] : [];
        startingEquipment.push(...soldier.mercenaryStartingEquipment?.map(equipment => ({
            compatible: true,
            equipmentSlug: equipment.equipmentSlug,
        })));
        startingEquipment.push(...soldier.legendStartingEquipment?.map(equipment => ({
            compatible: true,
            equipmentSlug: equipment.equipmentSlug,
        })));
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
                            miscModifiers: {
                                "move": 0,
                                "will": 0,
                                "fight": 0,
                                "shoot": 0,
                                "armour": 0,
                                "health": 0,
                                "strength": 0
                            },
                            baseFigure: {
                                create: {
                                    baseFigureSlug: soldier.slug,
                                },
                            },
                            equipment: {
                                createMany: {
                                    data: [
                                        ...startingEquipment
                                    ]
                                },
                            },
                            spells: {
                                createMany: {
                                    data: soldier.legendStartingSpells?.map(spell => ({
                                        spellSlug: spell.spellSlug,
                                    })) ?? [],
                                },
                            },
                            skills: {
                                createMany: {
                                    data: soldier.legendStartingSkills?.map(skill => ({
                                        skillSlug: skill.skillSlug,
                                    })) ?? [],
                                },
                            },
                        },
                    },
                    crowns: {
                        decrement: soldier.cost,
                    }
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
    async fireSoldierFromWarband(warbandId, warbandToSoldierId) {
        const updated = await this.prisma.$transaction(async (tx) => {
            const soldier = await tx.warbandSoldier.findFirstOrThrow({
                where: {
                    id: warbandToSoldierId,
                    warbandId,
                },
                include: {
                    equipment: true,
                },
            });
            if (soldier.equipment.length > 0 && soldier.effectiveRole !== `MERCENARIO` && soldier.effectiveRole !== `LENDA`) {
                const dagger = soldier.equipment.find(equipment => equipment.equipmentSlug === `adaga`);
                if (dagger) {
                    await tx.equipmentToWarbandSoldier.delete({
                        where: { id: dagger.id },
                    });
                }
                const equipmentToReturn = soldier.equipment.filter(equipment => equipment.id !== dagger?.id);
                await tx.equipmentToVault.createMany({
                    data: equipmentToReturn.map((equipment) => ({
                        warbandId,
                        equipmentSlug: equipment.equipmentSlug,
                        modifierSlug: equipment.modifierSlug ?? undefined,
                    })),
                });
            }
            await tx.warbandSoldier.delete({
                where: {
                    id: warbandToSoldierId,
                },
            });
            return tx.warband.findUniqueOrThrow({
                where: {
                    id: warbandId,
                },
                include: this.defaultWarbandInclude,
            });
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
    async findWarbandAvaiableHirings(factionName) {
        const figures = await this.prisma.baseFigure.findMany({
            where: {
                role: {
                    in: [`MERCENARIO`, `LENDA`],
                },
                OR: [
                    {
                        avaiability: {
                            has: factionName,
                        },
                    },
                    {
                        avaiability: {
                            has: `Todos`,
                        },
                    },
                ],
                NOT: {
                    exclusions: {
                        has: factionName,
                    },
                },
            },
            include: {
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
                legendStartingEquipment: true,
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
        });
        return (0, class_transformer_1.plainToInstance)(base_figure_entity_1.BaseFigure, figures);
    }
    async createSharedLink(warbandId, bandSnapShot) {
        const sharedLink = await this.prisma.sharedLink.create({
            data: {
                warbandId,
                bandSnapShot
            },
        });
        return (0, class_transformer_1.plainToInstance)(sharedLink_entity_1.SharedLink, sharedLink);
    }
    async updateSharedLink(id, bandSnapShot) {
        const sharedLink = await this.prisma.sharedLink.updateMany({
            where: { warbandId: id },
            data: {
                bandSnapShot
            },
        });
        return (0, class_transformer_1.plainToInstance)(sharedLink_entity_1.SharedLink, sharedLink);
    }
    async findSharedLinkById(id) {
        const sharedLink = await this.prisma.sharedLink.findUniqueOrThrow({
            where: { id },
        });
        return (0, class_transformer_1.plainToInstance)(sharedLink_entity_1.SharedLink, sharedLink);
    }
};
exports.WarbandPrismaRepository = WarbandPrismaRepository;
exports.WarbandPrismaRepository = WarbandPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WarbandPrismaRepository);
//# sourceMappingURL=warband.prisma.repository.js.map