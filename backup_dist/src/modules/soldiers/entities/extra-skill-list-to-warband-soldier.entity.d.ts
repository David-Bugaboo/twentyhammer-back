import { SkillList } from "src/entities/skill-list.entity";
export declare class ExtraSkillListToWarbandSoldier {
    id: string;
    skillListSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    source: string;
    skillList?: SkillList;
}
