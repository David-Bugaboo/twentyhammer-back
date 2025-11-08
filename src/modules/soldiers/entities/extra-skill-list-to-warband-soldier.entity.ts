import { Type } from "class-transformer";
import { SkillList } from "src/entities/skill-list.entity";

export class ExtraSkillListToWarbandSoldier {
  id!: string;
  skillListSlug!: string;
  warbandSoldierId!: string;
  createdAt!: Date;
  source!: string;
  @Type(() => SkillList)
  skillList?: SkillList;
}


