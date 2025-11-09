import { Skill } from "src/entities/skill.entity";
export declare class SkillToWarbandSoldier {
    id: string;
    skillSlug: string;
    warbandSoldierId: string;
    createdAt: Date;
    skill?: Skill;
}
