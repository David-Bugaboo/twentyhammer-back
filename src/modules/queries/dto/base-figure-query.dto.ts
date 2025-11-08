import { QueryDto } from "src/common/dtos/query.dto";

export class BaseFigureQueryDto extends QueryDto{
  name?: string;
  role?: string;
  factionSlug?: string;
  race?: string;
  quality?: number;
}


