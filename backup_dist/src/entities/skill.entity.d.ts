import { SkillList } from "./skill-list.entity";
export declare class Skill {
    id: string;
    slug: string;
    name: string;
    skillListSlug: string;
    description: string;
    createdAt: Date;
    skillList?: SkillList;
    extraSkillLists?: string[];
    extraSpellLores?: string[];
    extraNaturalAttack?: any | null;
    attributeModifiers?: any;
}
