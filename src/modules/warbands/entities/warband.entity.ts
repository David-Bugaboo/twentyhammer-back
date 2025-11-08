import { Type } from 'class-transformer';
import { WarbandSoldier } from 'src/modules/soldiers/entities/warband-soldier.entity';
import { EquipmentToVault } from './equipment-to-vault.entity';
import { Faction } from './faction.entity';
import { User } from 'src/entities/user.entity';

export class Warband {
  id!: string;
  name!: string;
  crowns!: number;
  wyrdstone!: number;
  factionSlug!: string;
  userId!: string;
  @Type(() => EquipmentToVault)
  vault?: EquipmentToVault[];
  @Type(() => WarbandSoldier)
  warbandSoldiers?: WarbandSoldier[];
  @Type(() => Faction)
  faction?: Faction | null;
  @Type(() => User)
  user?: User | null;
  createdAt!: Date;
}
