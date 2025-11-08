import { Type } from "class-transformer";
import { SuperNaturalAbility } from "src/entities/super-natural-ability.entity";

export class SuperNaturalAbilityToWarbandSoldier {
  id!: string;
  superNaturalAbilitySlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  @Type(() => SuperNaturalAbility)
  superNaturalAbility?: SuperNaturalAbility;
}


