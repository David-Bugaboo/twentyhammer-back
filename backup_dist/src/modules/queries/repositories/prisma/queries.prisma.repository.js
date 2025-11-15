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
exports.QueriesPrismaRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../../prisma/services/prisma.service");
let QueriesPrismaRepository = class QueriesPrismaRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAllSpellLores(spellLoresQueryDto) {
        return this.prisma.spellLore.findMany({
            where: {
                name: {
                    contains: spellLoresQueryDto.name
                        ? spellLoresQueryDto.name
                        : undefined,
                },
            },
            include: {
                spells: true,
            },
        });
    }
    async findAllSpells(spellQueryDto) {
        return this.prisma.spell.findMany({
            where: {
                name: {
                    contains: spellQueryDto.name ? spellQueryDto.name : undefined,
                },
                difficultyClass: {
                    equals: spellQueryDto.difficultyClass
                        ? spellQueryDto.difficultyClass
                        : undefined,
                },
                spellLoreSlug: {
                    equals: spellQueryDto.spellLoreSlug
                        ? spellQueryDto.spellLoreSlug
                        : undefined,
                },
            },
            include: {
                spellLore: true,
            },
        });
    }
    async findSpellByslug(slug) {
        return this.prisma.spell.findUniqueOrThrow({
            where: {
                slug: slug,
            },
            include: {
                spellLore: true,
            },
        });
    }
    async findSpellLoreByslug(slug) {
        return this.prisma.spellLore.findUniqueOrThrow({
            where: {
                slug: slug,
            },
            include: {
                spells: true,
            },
        });
    }
    async findAllSkills(dto) {
        return this.prisma.skill.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
                skillListSlug: dto.skillListSlug
                    ? { equals: dto.skillListSlug }
                    : undefined,
                description: dto.description
                    ? { contains: dto.description }
                    : undefined,
            },
            include: {
                skillList: true,
            },
        });
    }
    async findSkillByslug(slug) {
        return this.prisma.skill.findUniqueOrThrow({
            where: { slug },
            include: { skillList: true },
        });
    }
    async findAllSkillLists(dto) {
        return this.prisma.skillList.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
            },
            include: {
                skills: true,
            },
        });
    }
    async findSkillListByslug(slug) {
        return this.prisma.skillList.findUniqueOrThrow({
            where: { slug },
            include: { skills: true },
        });
    }
    async findAllAdvancements(dto) {
        return this.prisma.advancement.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
                description: dto.description
                    ? { contains: dto.description }
                    : undefined,
            },
        });
    }
    async findAdvancementByslug(slug) {
        return this.prisma.advancement.findUniqueOrThrow({ where: { slug } });
    }
    async findAllInjuries(dto) {
        return this.prisma.injury.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
                description: dto.description
                    ? { contains: dto.description }
                    : undefined,
            },
        });
    }
    async findInjuryByslug(slug) {
        return this.prisma.injury.findUniqueOrThrow({ where: { slug } });
    }
    async findAllEquipments(dto) {
        return this.prisma.equipment.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
                category: dto.category ? { equals: dto.category } : undefined,
                rarity: dto.rarity ? { equals: dto.rarity } : undefined,
                avaiability: dto.avaiability && dto.avaiability.length
                    ? { hasSome: dto.avaiability }
                    : undefined,
                exclusions: dto.exclusions && dto.exclusions.length
                    ? { hasSome: dto.exclusions }
                    : undefined,
            },
        });
    }
    async findEquipmentByslug(slug) {
        return this.prisma.equipment.findUniqueOrThrow({ where: { slug } });
    }
    async findAllSuperNaturalAbilities(dto) {
        return this.prisma.superNaturalAbility.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
                category: dto.category ? { equals: dto.category } : undefined,
                description: dto.description
                    ? { contains: dto.description }
                    : undefined,
            },
        });
    }
    async findSuperNaturalAbilityByslug(slug) {
        return this.prisma.superNaturalAbility.findUniqueOrThrow({
            where: { slug },
        });
    }
    async findAllModifiers(dto) {
        return this.prisma.modifier.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
                category: dto.category ? { equals: dto.category } : undefined,
                effect: dto.effect ? { contains: dto.effect } : undefined,
                multiplier: dto.multiplier ? { equals: Number(dto.multiplier) } : undefined,
            },
        });
    }
    async findModifierByslug(slug) {
        return this.prisma.modifier.findUniqueOrThrow({ where: { slug } });
    }
    async findAllFactions(dto) {
        return this.prisma.faction.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
                slug: dto.slug ? { equals: dto.slug } : undefined,
            },
        });
    }
    async findFactionByslug(slug) {
        return this.prisma.faction.findUniqueOrThrow({
            where: { slug },
            include: {
                figures: {
                    include: {
                        avaiableEquipment: {
                            include: {
                                avaiableEquipment: true,
                            },
                        },
                        raceLimits: true,
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
                    }
                }
            }
        });
    }
    async findAllBaseFigures(dto) {
        const rows = await this.prisma.baseFigure.findMany({
            where: {
                name: dto.name ? { contains: dto.name } : undefined,
                role: dto.role ? { equals: dto.role } : undefined,
                factionSlug: dto.factionSlug ? { equals: dto.factionSlug } : undefined,
                race: dto.race ? { equals: dto.race } : undefined,
                quality: dto.quality ? { equals: dto.quality } : undefined,
            },
            include: {
                avaiableEquipment: true,
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
                legendStartingSpells: {
                    include: {
                        spell: true,
                    },
                },
                legendStartingSkills: {
                    include: {
                        skill: true,
                    },
                },
                mercenaryStartingEquipment: {
                    include: {
                        equipment: true,
                    },
                },
                faction: true,
                raceLimits: true,
            },
        });
        return rows;
    }
    async findBaseFigureByslug(slug) {
        const row = await this.prisma.baseFigure.findUniqueOrThrow({
            where: { slug },
            include: {
                avaiableEquipment: true,
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
                legendStartingSpells: {
                    include: {
                        spell: true,
                    },
                },
                legendStartingSkills: {
                    include: {
                        skill: true,
                    },
                },
                legendStartingEquipment: {
                    include: {
                        equipment: true
                    }
                },
                mercenaryStartingEquipment: {
                    include: {
                        equipment: true,
                    },
                },
                faction: true,
                raceLimits: true,
            },
        });
        return row;
    }
    async findEquipmentToWarbandSoldierById(id) {
        return this.prisma.equipmentToWarbandSoldier.findUniqueOrThrow({
            where: { id },
            include: {
                equipment: true,
                modifier: true,
                warbandSoldier: true,
            },
        });
    }
    async findEquipmentToVaultById(id) {
        return this.prisma.equipmentToVault.findUniqueOrThrow({
            where: { id },
            include: { equipment: true, modifier: true, warband: true },
        });
    }
    async findSkillToWarbandSoldierById(id) {
        return this.prisma.skillToWarbandSoldier.findUniqueOrThrow({
            where: { id },
            include: { skill: true, warbandSoldier: true },
        });
    }
    async findSpellToWarbandSoldierById(id) {
        return this.prisma.spellToWarbandSoldier.findUniqueOrThrow({
            where: { id },
            include: { spell: true, warbandSoldier: true },
        });
    }
};
exports.QueriesPrismaRepository = QueriesPrismaRepository;
exports.QueriesPrismaRepository = QueriesPrismaRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QueriesPrismaRepository);
//# sourceMappingURL=queries.prisma.repository.js.map