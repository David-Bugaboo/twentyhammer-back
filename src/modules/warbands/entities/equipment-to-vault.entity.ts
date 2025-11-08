import { Type } from "class-transformer";
import { Equipment } from "src/entities/equipment.entity";
import { Modifier } from "src/entities/modifier.entity";

export class EquipmentToVault {
  id!: string;
  warbandId!: string;
  equipmentSlug!: string;
  createdAt!: Date;
  customPrice?: number | null;
  modifierSlug?: string | null;
  @Type(() => Equipment)
  equipment?: Equipment;
  @Type(() => Modifier)
  modifier?: Modifier | null;
}


