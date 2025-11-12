import { Type } from "class-transformer";
import { SkillList } from "./skill-list.entity";
import  JsonValue  from "@prisma/client";

export class Skill {
  id!: string;
  slug!: string;
  name!: string;
  skillListSlug!: string;
  description!: string;
  createdAt!: Date;
  @Type(() => SkillList)
  skillList?: SkillList;
  extraSkillLists?: string[];
  extraSpellLores?: string[];
  extraNaturalAttack?: any | null  
  attributeModifiers?: any
}


