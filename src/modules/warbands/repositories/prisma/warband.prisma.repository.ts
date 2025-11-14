import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/services/prisma.service';
import { WarbandsRepository } from '../warbands.repositories';
import { QueryDto } from 'src/common/dtos/query.dto';
import { CreateWarbandDto } from '../../dto/create-warband.dto';
import { UpdateWarbandDto } from '../../dto/update-warband.dto';
import { Warband } from '../../entities/warband.entity';
import { BaseFigure } from 'src/entities/base-figure.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { Modifier } from 'src/entities/modifier.entity';
import { Role } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class WarbandPrismaRepository implements WarbandsRepository {
  private readonly defaultWarbandInclude = {
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
  private readonly fullWarbandInclude = {
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
  constructor(private readonly prisma: PrismaService) {}
  async create(
    data: CreateWarbandDto,
    userId: string,
    factionSlug: string,

  ): Promise<Warband> {
   
    const warband = await this.prisma.warband.create({
      data: {
        ...data,
        userId,
        factionSlug,
       
      },
      include: this.defaultWarbandInclude,
    });
    return plainToInstance(Warband, warband);
  }
  async findWarbandById(id: string): Promise<Warband> {
    const warband = await this.prisma.warband.findUniqueOrThrow({
      where: {
        id,
      },
      include: this.fullWarbandInclude,
    });
    return plainToInstance(Warband, warband);
  }
  async findAllWarbands(query: QueryDto): Promise<{
    page: number;
    perPage: number;
    totalPages: number;
    warbands: Warband[];
  }> {
    var { page = 1, perPage = 10 } = query;

    const warbandsRaw = await this.prisma.warband.findMany({
      skip: (page - 1) * perPage,
      take: Number(perPage),
      include: this.defaultWarbandInclude,
    });
    const warbands = plainToInstance(Warband, warbandsRaw);

    const warbandCount = await this.prisma.warband.count();

    const totalPages = Math.ceil(warbandCount / perPage);

    return {
      page,
      perPage,
      totalPages,
      warbands,
    };
  }
  async updateWarband(id: string, data: UpdateWarbandDto): Promise<Warband> {
    const warband = await this.prisma.warband.update({
      where: {
        id,
      },
      data,
      include: this.defaultWarbandInclude,
    });
    return plainToInstance(Warband, warband);
  }
  async deleteWarband(id: string): Promise<void> {
    await this.prisma.warband.delete({
      where: {
        id,
      },
    });
  }
  async addSoldierToWarband(
    warbandId: string,
    soldier: BaseFigure,
  ): Promise<Warband> {
    const isDaggerCompatible = soldier.avaiableEquipment?.find(equipment => equipment.avaiableEquipmentSlug === `adaga`)
    const startingEquipment = isDaggerCompatible ? [{
      compatible: true,
      equipmentSlug: `adaga`
    }] : []
    startingEquipment.push(...soldier.mercenaryStartingEquipment?.map(equipment => ({
                    compatible: true,
                    equipmentSlug: equipment.equipmentSlug,
    }))!)
    startingEquipment.push(...soldier.legendStartingEquipment?.map(equipment => ({
                    compatible: true,
                    equipmentSlug: equipment.equipmentSlug,
    }))!)
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
        data:  {
          warbandSoldiers: {
            create: {
              effectiveRole: soldier.role as Role,
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
                ]},
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

    return plainToInstance(Warband, updated);
  }
  async removeSoldierFromWarband(
    warbandId: string,
    warbandToSoldierId: string,
  ): Promise<Warband> {
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
    return plainToInstance(Warband, updated);
  }
  async fireSoldierFromWarband(
    warbandId: string,
    warbandToSoldierId: string,
  ): Promise<Warband> {
    
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

      if (soldier.equipment.length > 0 && soldier.effectiveRole !== `MERCENARIO` && soldier.effectiveRole !== `LENDA` ) {
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

    return plainToInstance(Warband, updated);
  }
  async addEquipmentToWarbandVault(
    warbandId: string,
    equipment: Equipment,
    loot: boolean,
    modifier?: Modifier | null,
  ): Promise<Warband> {
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
    return plainToInstance(Warband, updated);
  }
  async undoEquipmentFromWarbandVault(
    warbandId: string,
    equipmentToVaultId: string,
    sell: boolean,
  ): Promise<Warband> {
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

    return plainToInstance(Warband, updated);
  }
  async findWarbandAvaiableHirings(factionName:string): Promise<BaseFigure[]> {
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

    return plainToInstance(BaseFigure, figures);
  }
  
}
