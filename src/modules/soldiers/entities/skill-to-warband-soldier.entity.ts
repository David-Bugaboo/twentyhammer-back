import { Type } from "class-transformer";
import { Skill } from "src/entities/skill.entity";

export class SkillToWarbandSoldier {
  id!: string;
  skillSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  @Type(() => Skill)
  skill?: Skill;
}


