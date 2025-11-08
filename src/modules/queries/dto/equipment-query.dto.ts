import { QueryDto } from "src/common/dtos/query.dto";

export class EquipmentQueryDto extends QueryDto {
  name?: string;
  category?: string;
  rarity?: number;
  avaiability?: string[];
  exclusions?: string[];
}


