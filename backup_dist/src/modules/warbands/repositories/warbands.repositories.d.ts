import { QueryDto } from 'src/common/dtos/query.dto';
import { CreateWarbandDto } from '../dto/create-warband.dto';
import { Warband } from '../entities/warband.entity';
import { UpdateWarbandDto } from '../dto/update-warband.dto';
import { BaseFigure } from 'src/entities/base-figure.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { Modifier } from 'src/entities/modifier.entity';
export declare abstract class WarbandsRepository {
    abstract create(data: CreateWarbandDto, userId: string, factionSlug: string, leader: BaseFigure): Promise<Warband>;
    abstract findWarbandById(id: string): Promise<Warband>;
    abstract findAllWarbands(query: QueryDto): Promise<{
        page: number;
        perPage: number;
        totalPages: number;
        warbands: Warband[];
    }>;
    abstract updateWarband(id: string, data: UpdateWarbandDto): Promise<Warband>;
    abstract deleteWarband(id: string): Promise<void>;
    abstract addSoldierToWarband(warbandId: string, soldier: BaseFigure): Promise<Warband>;
    abstract removeSoldierFromWarband(warbandId: string, warbandToSoldierId: string): Promise<Warband>;
    abstract addEquipmentToWarbandVault(warbandId: string, equipment: Equipment, loot: boolean, modifier?: Modifier | null): Promise<Warband>;
    abstract undoEquipmentFromWarbandVault(warbandId: string, equipmentToVaultId: string, sell: boolean): Promise<Warband>;
}
