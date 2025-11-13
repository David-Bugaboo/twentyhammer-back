import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/services/prisma.service';
import { SoldiersRepository } from '../soldiers.repository';
import { Injectable } from '@nestjs/common';
import { WarbandSoldier } from '../../entities/warband-soldier.entity';
import { EquipmentToVault } from 'src/modules/warbands/entities/equipment-to-vault.entity';
import { EquipmentToWarbandSoldier } from '../../entities/equipment-to-warband-soldier.entity';
import { PromotedHeroSkillLists } from '../../entities/promoted-hero-skill-list.entity';
import { UpdateSoldierDto } from '../../dto/update-soldier.dto';

@Injectable()
export class SoldiersPrismaRepository implements SoldiersRepository {
  constructor(private readonly prisma: PrismaService) {}

  removeSoldierFromWarband(soldierId: string, kill: boolean) {
    throw new Error('Method not implemented.');
  }
  async addEquipmentToSoldier(
    soldierId: string,
    warbandVaultItem: EquipmentToVault,
  ): Promise<void> {
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
  async removeEquipmentFromSoldier(
    warbandToSoldierItemId: string,
  ): Promise<void> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const warbandToSoldierItem =
          await tx.equipmentToWarbandSoldier.findUniqueOrThrow({
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
    } catch (error) {
      throw new Error('Item não encontrado no inventário do bando.');
    }
  }
  findSoldierById(soldierId: string): Promise<WarbandSoldier> {
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
  async addSkillToSoldier(soldierId: string, skillSlug: string): Promise<void> {
    const skill = await this.prisma.skill.findUniqueOrThrow({
      where: { slug: skillSlug },
    });
     await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        skills: {
          create: { skillSlug: skillSlug },
        },
        extraSkillsLists: {
          createMany: {
            data: skill.extraSkillLists?.map(skillList => ({ skillListSlug: skillList, source:skill.name })) ?? [],
          }
        },
        extraSpellsLores: {
          createMany: {
            data: skill.extraSpellLores?.map(spellLore => ({ spellLoreSlug: spellLore, source:skill.name })) ?? [],
          }
        },  
      },
    });
  }
  async addSpellToSoldier(soldierId:string, spellSlug:string): Promise<void> {
    await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        spells: {
          create: { spellSlug: spellSlug },
        },
      },
    });
  }
  async removeSpellFromSoldier(SpellToWarbandSoldierId: string): Promise<void> {
    await this.prisma.spellToWarbandSoldier.delete({
      where: { id: SpellToWarbandSoldierId },
    });
  }
  async addAdvancementToSoldier(soldierId:string, advancementSlug:string): Promise<void> {
    await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        advancements: {
          create: { advancementSlug: advancementSlug },
        },
      },
    });
  }
  async addInjuryToSoldier(soldierId:string, injurySlug:string): Promise<void> {
    await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        injuries: {
          create: { injurySlug: injurySlug },
        },
      },
    });
  }
  async addSuperNaturalAbilityToSoldier(soldierId: string, superNaturalAbilitySlug: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const superNaturalAbility =
        await tx.superNaturalAbility.findUniqueOrThrow({
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
  async removeSkillFromSoldier(SkillToWarbandSoldierId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const skillToWarbandSoldier = await tx.skillToWarbandSoldier.findUniqueOrThrow({
        where: { id: SkillToWarbandSoldierId },
      });
      const skill = await tx.skill.findUniqueOrThrow({
        where: { slug: skillToWarbandSoldier.skillSlug },
      });
      await tx.warbandSoldier.update({
        where: { id: skillToWarbandSoldier.warbandSoldierId },
        data: {
          skills: { delete: { id: SkillToWarbandSoldierId } },  
          extraSkillsLists: { deleteMany: skill.extraSkillLists?.map(skillList => ({ skillListSlug: skillList })) ?? [] },
          extraSpellsLores: { deleteMany: skill.extraSpellLores?.map(spellLore => ({ spellLoreSlug: spellLore })) ?? [] },
        },
      });
      await tx.skillToWarbandSoldier.delete({
          where: { id: SkillToWarbandSoldierId },
        });
    });
  }
  async killSoldier(soldierId: string): Promise<void> {
    await this.prisma.warbandSoldier.delete({
      where: { id: soldierId },
    });
  }
  async undoSoldier(soldierId: string): Promise<void> { 
    await this.prisma.$transaction(async (tx) => {
      const soldier = await tx.warbandSoldier.findUniqueOrThrow({
        where: { id: soldierId },
        select: {
          warbandId: true,
          effectiveRole: true,
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
              id: true,
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

      if (soldier.effectiveRole !== `MERCENARIO` && soldier.effectiveRole !== `LENDA`) {
        const dagger = soldier.equipment.find(equipment => equipment.equipmentSlug === `adaga`);
        if (dagger) {
          await tx.equipmentToWarbandSoldier.delete({
            where: { id: dagger.id },
          });
        }
        const equipmentToReturn = soldier.equipment.filter(equipment => equipment.id !== dagger?.id);
        for (const equipment of equipmentToReturn) {
          await tx.equipmentToVault.create({
            data: {
              warbandId: soldier.warbandId,
              equipmentSlug: equipment.equipmentSlug,
              modifierSlug: equipment.modifierSlug,
            },
          });
        }
      }



      await tx.warbandSoldier.delete({
        where: {
          id: soldierId,
        },
      });
    });
  }  
  async removeInjuryFromSoldier(injuryToWarbandSoldierId: string): Promise<void> {
    await this.prisma.injuryToWarbandSoldier.delete({
      where: { id: injuryToWarbandSoldierId },
    });
  }
  async removeAdvancementFromSoldier(AdvancementToWarbandSoldierId: string): Promise<void> {
    await this.prisma.advancementToWarbandSoldier.delete({
      where: { id: AdvancementToWarbandSoldierId },
    });
  }
  async removeSuperNaturalAbilityFromSoldier(SuperNaturalAbilityToWarbandSoldierId: string): Promise<void> {
    await this.prisma.superNaturalAbilityToWarbandSoldier.delete({
      where: { id: SuperNaturalAbilityToWarbandSoldierId },
    });
  }
  async unequipAllHandsFromSoldier(soldierId: string): Promise<void> {
    await this.prisma.equipmentToWarbandSoldier.updateMany({
      where: { warbandSoldierId: soldierId },
      data: {
        mainHandEquiped: false,
        offHandEquiped: false,
        twoHandedEquiped: false,
        armorEquiped:false,
        helmetEquiped:false
      },
    });
  }
  async unequipGear(equipmentToWarbandSoldierId: string): Promise<void> {
    await this.prisma.equipmentToWarbandSoldier.update({
      where: { id: equipmentToWarbandSoldierId },
      data: {
        mainHandEquiped: false,
        offHandEquiped: false,
        twoHandedEquiped: false,
        armorEquiped:false,
        helmetEquiped:false
      },
    });
  }
  async unequipSlotFromSoldier(
    soldierId: string,
    slot: string,
  ): Promise<void> {
    await this.prisma.equipmentToWarbandSoldier.updateMany({
      where: {
        warbandSoldierId: soldierId,
        [slot]: true,
      },
      data: {
        [slot]: false,
      } as Record<string, boolean>,
    });
  }
  async equipGear(equipmentToWarbandSoldierId: string, slot: string): Promise<void> { 
    await this.prisma.equipmentToWarbandSoldier.update({
      where: { id: equipmentToWarbandSoldierId },
      data: {
        [slot]: true,
      },
    });
  }
  async addExtraSkillListToSoldier(soldierId: string, skillListSlug: string, source: string): Promise<void> {
    await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        extraSkillsLists: { create: { skillListSlug: skillListSlug, source:source } },
      },
    });
  }
  async removeExtraSkillListFromSoldier(soldierId: string, skillListSlug: string): Promise<void> {
    await this.prisma.warbanSoldierToSKillLists.deleteMany({
      where: { warbandSoldierId: soldierId, skillListSlug: skillListSlug },
      
    });
  }
  async addExtraSpellLoreToSoldier(soldierId: string, spellLoreSlug: string, source: string): Promise<void> {
    await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        extraSpellsLores: { create: { spellLoreSlug: spellLoreSlug, source:source } },
      },
    });
  }
  async removeExtraSpellLoreFromSoldier(soldierId: string, spellLoreSlug: string): Promise<void> {
    await this.prisma.warbandSoldierToSpellsLores.deleteMany({
      where: { warbandSoldierId: soldierId, spellLoreSlug: spellLoreSlug },
    });
  }
  async updateSoldier(soldierId: string, updateSoldierDto: UpdateSoldierDto): Promise<void> {
    const { miscModifiers, ...rest } = updateSoldierDto;
    await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        ...rest,
        miscModifiers:{
          "fight": miscModifiers?.fight ?? 0,
          "shoot": miscModifiers?.shoot ?? 0,
          "armour": miscModifiers?.armour ?? 0,
          "will": miscModifiers?.will ?? 0,
          "health": miscModifiers?.health ?? 0,
          "strength": miscModifiers?.strength ?? 0,
        }
      },
    });
  }
  async fortifySpell(spellToWarbandSoldierId: string): Promise<void> {
    await this.prisma.spellToWarbandSoldier.update({
      where: { id: spellToWarbandSoldierId },
      data: {
        modifier: {
          increment: 1,
        },
      },
    });
  }
  async unfortifySpell(spellToWarbandSoldierId: string): Promise<void> {
    await this.prisma.spellToWarbandSoldier.update({
      where: { id: spellToWarbandSoldierId },
      data: {
        modifier: {
          decrement: 1,
        },
      },
    });
  }
  async promoteToHero (soldierId: string, skillsListSlugs:string[]): Promise<void> {
    await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        effectiveRole: `HEROI`,
        extraSkillsLists: {
          createMany: {
            data: skillsListSlugs.map(skillListSlug => ({ skillListSlug: skillListSlug, source: `Promoção a héroi` })),
          }
        }
      },
    });
  }
  async promoteLeader(soldierId: string): Promise<void> {
    await this.prisma.warbandSoldier.update({
      where: { id: soldierId },
      data: {
        effectiveRole: `LENDA`,
      },
    });
  }
}
