import { Type } from "class-transformer";
import { Advancement } from "src/entities/advancement.entity";

export class AdvancementToWarbandSoldier {
  id!: string;
  advancementSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  @Type(() => Advancement)
  advancement?: Advancement;
}


