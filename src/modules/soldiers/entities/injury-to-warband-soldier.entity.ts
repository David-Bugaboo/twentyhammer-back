import { Type } from "class-transformer";
import { Injury } from "src/entities/injury.entity";

export class InjuryToWarbandSoldier {
  id!: string;
  injurySlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  @Type(() => Injury)
  injury?: Injury;
}


