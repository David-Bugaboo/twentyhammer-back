import { QueryDto } from "src/common/dtos/query.dto";

export class SkillQueryDto extends QueryDto {
  name?: string;
  skillListSlug?: string;
  description?: string;
}


