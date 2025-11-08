import { JsonValue } from "generated/prisma/internal/prismaNamespace";

export class Equipment {
  id!: string;
  slug!: string;
  name!: string;
  cost!: number;
  category!: string;
  rarity!: number;
  avaiability!: string[];
  exclusions!: string[];
  damageBonus?: number | null;
  armourBonus?: number | null;
  movementPenalty?: number | null;
  range?: number | null;
  createdAt!: Date;
  specialRules?: JsonValue;
  slot?: number | null;
}


