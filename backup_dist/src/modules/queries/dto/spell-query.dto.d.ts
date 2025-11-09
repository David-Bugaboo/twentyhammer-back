import { QueryDto } from "src/common/dtos/query.dto";
export declare class SpellQueryDto extends QueryDto {
    name: string;
    difficultyClass: number;
    spellLoreSlug: string;
    description: string;
    keywords: string[];
}
