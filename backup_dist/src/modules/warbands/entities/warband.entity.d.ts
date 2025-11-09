import { WarbandSoldier } from 'src/modules/soldiers/entities/warband-soldier.entity';
import { EquipmentToVault } from './equipment-to-vault.entity';
import { Faction } from './faction.entity';
import { User } from 'src/entities/user.entity';
export declare class Warband {
    id: string;
    name: string;
    crowns: number;
    wyrdstone: number;
    factionSlug: string;
    userId: string;
    vault?: EquipmentToVault[];
    warbandSoldiers?: WarbandSoldier[];
    faction?: Faction | null;
    user?: User | null;
    createdAt: Date;
}
