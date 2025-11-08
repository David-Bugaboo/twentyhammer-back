import { Type } from 'class-transformer';
import { SkillList } from 'src/entities/skill-list.entity';

export class PromotedHeroSkillLists {
  id!: string;
  warbandSoldierId!: string;
  skillListSlug!: string;
  createdAt!: Date;
  @Type(() => SkillList)
  skillList?: SkillList;
}

