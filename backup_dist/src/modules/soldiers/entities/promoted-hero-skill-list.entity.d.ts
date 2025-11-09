import { SkillList } from 'src/entities/skill-list.entity';
export declare class PromotedHeroSkillLists {
    id: string;
    warbandSoldierId: string;
    skillListSlug: string;
    createdAt: Date;
    skillList?: SkillList;
}
