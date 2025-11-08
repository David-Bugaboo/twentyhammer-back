import { Type } from "class-transformer";
import { SkillList } from "./skill-list.entity";

export class Skill {
  id!: string;
  slug!: string;
  name!: string;
  skillListSlug!: string;
  description!: string;
  createdAt!: Date;
  @Type(() => SkillList)
  skillList?: SkillList;
}


