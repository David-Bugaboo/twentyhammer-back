import { Type } from "class-transformer";
import { SkillList } from "./skill-list.entity";
import { JsonValue } from "generated/prisma/internal/prismaNamespace";

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
  extraNaturalAttack?: string[] | null | JsonValue
  attributeModifiers?: any
}


