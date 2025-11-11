import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/services/prisma.service';
import { SpellLore } from 'src/entities/spell-lore.entity';
import { Spell } from 'src/entities/spell.entity';
import { Skill } from 'src/entities/skill.entity';
import { SkillList } from 'src/entities/skill-list.entity';
import { Advancement } from 'src/entities/advancement.entity';
import { Injury } from 'src/entities/injury.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { SuperNaturalAbility } from 'src/entities/super-natural-ability.entity';
import { Faction } from 'src/modules/warbands/entities/faction.entity';
import { BaseFigure } from 'src/entities/base-figure.entity';
import { Modifier } from 'src/entities/modifier.entity';
import { SpellLoresQueryDto } from '../../dto/spell-lores-query.dto';
import { SpellQueryDto } from '../../dto/spell-query.dto';
import { SkillQueryDto } from '../../dto/skill-query.dto';
import { SkillListsQueryDto } from '../../dto/skill-lists-query.dto';
import { AdvancementQueryDto } from '../../dto/advancement-query.dto';
import { InjuryQueryDto } from '../../dto/injury-query.dto';
import { EquipmentQueryDto } from '../../dto/equipment-query.dto';
import { SuperNaturalAbilityQueryDto } from '../../dto/super-natural-ability-query.dto';
import { FactionQueryDto } from '../../dto/faction-query.dto';
import { BaseFigureQueryDto } from '../../dto/base-figure-query.dto';
import { ModifierQueryDto } from '../../dto/modifier-query.dto';
import { QueriesRepository } from '../queries.repository';
import { EquipmentToWarbandSoldier } from 'src/modules/soldiers/entities/equipment-to-warband-soldier.entity';
import { EquipmentToVault } from 'src/modules/warbands/entities/equipment-to-vault.entity';
import { SkillToWarbandSoldier } from 'src/modules/soldiers/entities/skill-to-warband-soldier.entity';

@Injectable()
export class QueriesPrismaRepository implements QueriesRepository {
  constructor(private readonly prisma: PrismaService) {}
  //spell stuff
  async findAllSpellLores(
    spellLoresQueryDto: SpellLoresQueryDto,
  ): Promise<SpellLore[]> {
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
  async findAllSpells(spellQueryDto: SpellQueryDto): Promise<Spell[]> {
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
  async findSpellByslug(slug: string): Promise<Spell> {
    return this.prisma.spell.findUniqueOrThrow({
      where: {
        slug: slug,
      },
      include: {
        spellLore: true,
      },
    });
  }
  async findSpellLoreByslug(slug: string): Promise<SpellLore> {
    return this.prisma.spellLore.findUniqueOrThrow({
      where: {
        slug: slug,
      },
      include: {
        spells: true,
      },
    });
  }
  // skills
  async findAllSkills(dto: SkillQueryDto): Promise<Skill[]> {
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
  async findSkillByslug(slug: string): Promise<Skill> {
    return this.prisma.skill.findUniqueOrThrow({
      where: { slug },
      include: { skillList: true },
    });
  }
  async findAllSkillLists(dto: SkillListsQueryDto): Promise<SkillList[]> {
    return this.prisma.skillList.findMany({
      where: {
        name: dto.name ? { contains: dto.name } : undefined,
      },
      include: {
        skills: true,
      },
    });
  }
  async findSkillListByslug(slug: string): Promise<SkillList> {
    return this.prisma.skillList.findUniqueOrThrow({
      where: { slug },
      include: { skills: true },
    });
  }
  // advancements
  async findAllAdvancements(dto: AdvancementQueryDto): Promise<Advancement[]> {
    return this.prisma.advancement.findMany({
      where: {
        name: dto.name ? { contains: dto.name } : undefined,
        description: dto.description
          ? { contains: dto.description }
          : undefined,
      },
    });
  }
  async findAdvancementByslug(slug: string): Promise<Advancement> {
    return this.prisma.advancement.findUniqueOrThrow({ where: { slug } });
  }
  // injuries
  async findAllInjuries(dto: InjuryQueryDto): Promise<Injury[]> {
    return this.prisma.injury.findMany({
      where: {
        name: dto.name ? { contains: dto.name } : undefined,
        description: dto.description
          ? { contains: dto.description }
          : undefined,
      },
    });
  }
  async findInjuryByslug(slug: string): Promise<Injury> {
    return this.prisma.injury.findUniqueOrThrow({ where: { slug } });
  }
  // equipments
  async findAllEquipments(dto: EquipmentQueryDto): Promise<Equipment[]> {
    return this.prisma.equipment.findMany({
      where: {
        name: dto.name ? { contains: dto.name } : undefined,
        category: dto.category ? { equals: dto.category } : undefined,
        rarity: dto.rarity ? { equals: dto.rarity } : undefined,
        avaiability:
          dto.avaiability && dto.avaiability.length
            ? { hasSome: dto.avaiability }
            : undefined,
        exclusions:
          dto.exclusions && dto.exclusions.length
            ? { hasSome: dto.exclusions }
            : undefined,
      },
    });
  }
  async findEquipmentByslug(slug: string): Promise<Equipment> {
    return this.prisma.equipment.findUniqueOrThrow({ where: { slug } });
  }
  // supernatural abilities
  async findAllSuperNaturalAbilities(
    dto: SuperNaturalAbilityQueryDto,
  ): Promise<SuperNaturalAbility[]> {
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
  async findSuperNaturalAbilityByslug(
    slug: string,
  ): Promise<SuperNaturalAbility> {
    return this.prisma.superNaturalAbility.findUniqueOrThrow({
      where: { slug },
    });
  }
  // modifiers
  async findAllModifiers(dto: ModifierQueryDto): Promise<Modifier[]> {
    return this.prisma.modifier.findMany({
      where: {
        name: dto.name ? { contains: dto.name } : undefined,
        category: dto.category ? { equals: dto.category } : undefined,
        effect: dto.effect ? { contains: dto.effect } : undefined,
        multiplier:
          dto.multiplier !== undefined ? { equals: dto.multiplier } : undefined,
      },
    });
  }
  async findModifierByslug(slug: string): Promise<Modifier> {
    return this.prisma.modifier.findUniqueOrThrow({ where: { slug } });
  }
  // factions
  async findAllFactions(dto: FactionQueryDto): Promise<Faction[]> {
    return this.prisma.faction.findMany({
      where: {
        name: dto.name ? { contains: dto.name } : undefined,
        slug: dto.slug ? { equals: dto.slug } : undefined,
      },
    });
  }
  async findFactionByslug(slug: string): Promise<Faction> {
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
  // base figures
  async findAllBaseFigures(dto: BaseFigureQueryDto): Promise<BaseFigure[]> {
    const rows = await this.prisma.baseFigure.findMany({
      where: {
        name: dto.name ? { contains: dto.name } : undefined,
        role: dto.role ? { equals: dto.role as any } : undefined,
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
    return rows as unknown as BaseFigure[];
  }
  async findBaseFigureByslug(slug: string): Promise<BaseFigure> {
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
        mercenaryStartingEquipment: {
          include: {
            equipment: true,
          },
        },
        faction: true,
        raceLimits: true,
      },
    });
    return row as unknown as BaseFigure;
  }
  async findEquipmentToWarbandSoldierById(
    id: string,
  ): Promise<EquipmentToWarbandSoldier> {
    return this.prisma.equipmentToWarbandSoldier.findUniqueOrThrow({
      where: { id },
      include: {
        equipment: true,
        modifier: true,
        warbandSoldier: true,
      },
    });
  }
  async findEquipmentToVaultById(id: string): Promise<EquipmentToVault> {
    return this.prisma.equipmentToVault.findUniqueOrThrow({
      where: { id },
      include: { equipment: true, modifier: true, warband: true },
    });
  }
  async findSkillToWarbandSoldierById(id: string): Promise<SkillToWarbandSoldier> {
    return this.prisma.skillToWarbandSoldier.findUniqueOrThrow({
      where: { id },
      include: { skill: true, warbandSoldier: true },
    });
  }
}
