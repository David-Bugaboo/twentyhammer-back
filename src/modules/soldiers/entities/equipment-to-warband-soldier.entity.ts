import { Type } from 'class-transformer';
import { Equipment } from 'src/entities/equipment.entity';
import { Modifier } from 'src/entities/modifier.entity';
import { WarbandSoldier } from './warband-soldier.entity';

export class EquipmentToWarbandSoldier {
  id!: string;
  equipmentSlug!: string;
  warbandSoldierId!: string;
  customCost?: number | null;
  modifierSlug?: string | null;
  compatible: boolean;
  mainHandEquiped!: boolean;
  offHandEquiped!: boolean;
  helmetEquiped!: boolean;
  armorEquiped!: boolean;
  twoHandedEquiped!: boolean;
  createdAt!: Date;
  @Type(() => Equipment)
  equipment?: Equipment;
  @Type(() => Modifier)
  modifier?: Modifier | null;
  @Type(() => WarbandSoldier)
  warbandSoldier?: WarbandSoldier;
}
