import { Type } from 'class-transformer';
import type { Role as PrismaRole } from '@prisma/client';
import { FigureToAvaiableEquipment } from './figure-to-avaiable-equipment.entity';
import { FigureToSkillList } from './figure-to-skill-list.entity';
import { FigureToSpellLore } from './figure-to-spell-lore.entity';

export type Role = PrismaRole;

export class BaseFigure {
  id!: string;
  name!: string;
  role!: Role;
  slug!: string;
  lore!: string;
  avaiability!: string[];
  exclusions!: string[];
  quality!: number;
  canGetMutations!: boolean;
  canGetSacredMarks!: boolean;
  canGetBlessings!: boolean;
  race?: string | null;
  factionSlug?: string | null;
  cost!: number;
  movement!: number;
  fight!: number;
  shoot!: number;
  armour!: number;
  will!: number;
  health!: number;
  strength!: number;
  equipmentSlots!: number;
  startingXp?: number | null;
  createdAt!: Date;
  specialRules!: unknown;
  naturalAttacks?: unknown;
  @Type(() => FigureToAvaiableEquipment)
  avaiableEquipment?: FigureToAvaiableEquipment[];
  @Type(() => FigureToSkillList)
  skillLists?: FigureToSkillList[];
  @Type(() => FigureToSpellLore)
  spellLores?: FigureToSpellLore[];
}


