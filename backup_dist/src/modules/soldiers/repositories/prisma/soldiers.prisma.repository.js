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
exports.SoldiersPrismaRepository = void 0;
const prisma_service_1 = require("../../../../../prisma/services/prisma.service");
const common_1 = require("@nestjs/common");
let SoldiersPrismaRepository = class SoldiersPrismaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    removeSoldierFromWarband(soldierId, kill) {
        throw new Error('Method not implemented.');
    }
    async addEquipmentToSoldier(soldierId, warbandVaultItem) {
        return await this.prisma.$transaction(async (tx) => {
            await tx.equipmentToVault.delete({
                where: {
                    id: warbandVaultItem.id,
                },
            });
            await tx.equipmentToWarbandSoldier.create({
                data: {
                    warbandSoldierId: soldierId,
                    equipmentSlug: warbandVaultItem.equipmentSlug,
                    modifierSlug: warbandVaultItem.modifierSlug,
                    compatible: false,
                },
            });
        });
    }
    async removeEquipmentFromSoldier(warbandToSoldierItemId) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const warbandToSoldierItem = await tx.equipmentToWarbandSoldier.findUniqueOrThrow({
                    where: {
                        id: warbandToSoldierItemId,
                    },
                    include: {
                        warbandSoldier: true,
                        equipment: true,
                        modifier: true,
                    },
                });
                await tx.equipmentToVault.create({
                    data: {
                        warbandId: warbandToSoldierItem.warbandSoldier.warbandId,
                        equipmentSlug: warbandToSoldierItem.equipment.slug,
                        modifierSlug: warbandToSoldierItem.modifier?.slug,
                    },
                });
                await tx.equipmentToWarbandSoldier.delete({
                    where: {
                        id: warbandToSoldierItemId,
                    },
                });
            });
        }
        catch (error) {
            throw new Error('Item não encontrado no inventário do bando.');
        }
    }
    findSoldierById(soldierId) {
        return this.prisma.warbandSoldier.findUniqueOrThrow({
            where: { id: soldierId },
            include: {
                baseFigure: {
                    include: {
                        baseFigure: {
                            include: {
                                spellLores: true,
                                skillLists: true,
                                avaiableEquipment: true,
                            },
                        },
                    },
                },
                skills: true,
                spells: true,
                advancements: true,
                injuries: true,
                supernaturalAbilities: true,
                equipment: {
                    include: {
                        equipment: true,
                        modifier: true,
                    },
                },
                warband: true,
            },
        });
    }
    async addSkillToSoldier(soldierId, skillSlug) {
        await this.prisma.warbandSoldier.update({
            where: { id: soldierId },
            data: {
                skills: {
                    create: { skillSlug: skillSlug },
                },
            },
        });
    }
    async addSpellToSoldier(soldierId, spellSlug) {
        await this.prisma.warbandSoldier.update({
            where: { id: soldierId },
            data: {
                spells: {
                    create: { spellSlug: spellSlug },
                },
            },
        });
    }
    async removeSpellFromSoldier(SpellToWarbandSoldierId) {
        await this.prisma.spellToWarbandSoldier.delete({
            where: { id: SpellToWarbandSoldierId },
        });
    }
    async addAdvancementToSoldier(soldierId, advancementSlug) {
        await this.prisma.warbandSoldier.update({
            where: { id: soldierId },
            data: {
                advancements: {
                    create: { advancementSlug: advancementSlug },
                },
            },
        });
    }
    async addInjuryToSoldier(soldierId, injurySlug) {
        await this.prisma.warbandSoldier.update({
            where: { id: soldierId },
            data: {
                injuries: {
                    create: { injurySlug: injurySlug },
                },
            },
        });
    }
    async addSuperNaturalAbilityToSoldier(soldierId, superNaturalAbilitySlug) {
        await this.prisma.$transaction(async (tx) => {
            const superNaturalAbility = await tx.superNaturalAbility.findUniqueOrThrow({
                where: { slug: superNaturalAbilitySlug },
            });
            const warband = await tx.warbandSoldier.findUniqueOrThrow({
                where: { id: soldierId },
                select: {
                    warbandId: true,
                },
            });
            await tx.warband.update({
                where: { id: warband.warbandId },
                data: {
                    crowns: {
                        decrement: superNaturalAbility.cost,
                    },
                },
            });
            await tx.warbandSoldier.update({
                where: { id: soldierId },
                data: {
                    supernaturalAbilities: {
                        create: { superNaturalAbilitySlug: superNaturalAbilitySlug },
                    },
                },
            });
        });
    }
    async removeSkillFromSoldier(SkillToWarbandSoldierId) {
        await this.prisma.skillToWarbandSoldier.delete({
            where: { id: SkillToWarbandSoldierId },
        });
    }
    async killSoldier(soldierId) {
        await this.prisma.warbandSoldier.delete({
            where: { id: soldierId },
        });
    }
    async undoSoldier(soldierId) {
        await this.prisma.$transaction(async (tx) => {
            const soldier = await tx.warbandSoldier.findUniqueOrThrow({
                where: { id: soldierId },
                select: {
                    warbandId: true,
                    baseFigure: {
                        select: {
                            baseFigure: {
                                select: {
                                    cost: true,
                                },
                            }
                        }
                    },
                    equipment: {
                        select: {
                            equipmentSlug: true,
                            modifierSlug: true,
                        },
                    },
                },
            });
            await this.prisma.warband.update({
                where: { id: soldier.warbandId },
                data: {
                    crowns: {
                        increment: soldier.baseFigure[0].baseFigure.cost,
                    },
                },
            });
            for (const equipment of soldier.equipment) {
                await tx.equipmentToVault.create({
                    data: {
                        warbandId: soldier.warbandId,
                        equipmentSlug: equipment.equipmentSlug,
                        modifierSlug: equipment.modifierSlug,
                    },
                });
            }
            await tx.warbandSoldier.delete({
                where: {
                    id: soldierId,
                },
            });
        });
    }
    async removeInjuryFromSoldier(injuryToWarbandSoldierId) {
        await this.prisma.injuryToWarbandSoldier.delete({
            where: { id: injuryToWarbandSoldierId },
        });
    }
    async removeAdvancementFromSoldier(AdvancementToWarbandSoldierId) {
        await this.prisma.advancementToWarbandSoldier.delete({
            where: { id: AdvancementToWarbandSoldierId },
        });
    }
    async removeSuperNaturalAbilityFromSoldier(SuperNaturalAbilityToWarbandSoldierId) {
        await this.prisma.superNaturalAbilityToWarbandSoldier.delete({
            where: { id: SuperNaturalAbilityToWarbandSoldierId },
        });
    }
    async unequipAllHandsFromSoldier(soldierId) {
        await this.prisma.equipmentToWarbandSoldier.updateMany({
            where: { warbandSoldierId: soldierId },
            data: {
                mainHandEquiped: false,
                offHandEquiped: false,
                twoHandedEquiped: false,
            },
        });
    }
    async unequipGear(equipmentToWarbandSoldierId) {
        await this.prisma.equipmentToWarbandSoldier.update({
            where: { id: equipmentToWarbandSoldierId },
            data: {
                mainHandEquiped: false,
                offHandEquiped: false,
                twoHandedEquiped: false,
            },
        });
    }
    async unequipSlotFromSoldier(soldierId, slot) {
        await this.prisma.equipmentToWarbandSoldier.updateMany({
            where: {
                warbandSoldierId: soldierId,
                [slot]: true,
            },
            data: {
                [slot]: false,
            },
        });
    }
    async equipGear(equipmentToWarbandSoldierId, slot) {
        await this.prisma.equipmentToWarbandSoldier.update({
            where: { id: equipmentToWarbandSoldierId },
            data: {
                [slot]: true,
            },
        });
    }
};
exports.SoldiersPrismaRepository = SoldiersPrismaRepository;
exports.SoldiersPrismaRepository = SoldiersPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SoldiersPrismaRepository);
//# sourceMappingURL=soldiers.prisma.repository.js.map