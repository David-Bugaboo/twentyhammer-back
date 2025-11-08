import { QueryDto } from "src/common/dtos/query.dto";

export class ModifierQueryDto extends QueryDto {
  name?: string;
  category?: string;
  effect?: string;
  multiplier?: number;
}


