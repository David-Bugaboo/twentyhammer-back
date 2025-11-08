import { QueryDto } from "src/common/dtos/query.dto";

export class SpellQueryDto extends QueryDto {
  name: string;
  difficultyClass: number;
  spellLoreSlug: string;
  description: string;
  keywords: string[];
}
