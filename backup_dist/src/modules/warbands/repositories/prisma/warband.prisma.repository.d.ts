import { PrismaService } from 'prisma/services/prisma.service';
import { WarbandsRepository } from '../warbands.repositories';
import { QueryDto } from 'src/common/dtos/query.dto';
import { CreateWarbandDto } from '../../dto/create-warband.dto';
import { UpdateWarbandDto } from '../../dto/update-warband.dto';
import { Warband } from '../../entities/warband.entity';
import { BaseFigure } from 'src/entities/base-figure.entity';
import { Equipment } from 'src/entities/equipment.entity';
import { Modifier } from 'src/entities/modifier.entity';
export declare class WarbandPrismaRepository implements WarbandsRepository {
    private readonly prisma;
    private readonly defaultWarbandInclude;
    private readonly fullWarbandInclude;
    constructor(prisma: PrismaService);
    create(data: CreateWarbandDto, userId: string, factionSlug: string, leader: BaseFigure): Promise<Warband>;
    findWarbandById(id: string): Promise<Warband>;
    findAllWarbands(query: QueryDto): Promise<{
        page: number;
        perPage: number;
        totalPages: number;
        warbands: Warband[];
    }>;
    updateWarband(id: string, data: UpdateWarbandDto): Promise<Warband>;
    deleteWarband(id: string): Promise<void>;
    addSoldierToWarband(warbandId: string, soldier: BaseFigure): Promise<Warband>;
    removeSoldierFromWarband(warbandId: string, warbandToSoldierId: string): Promise<Warband>;
    fireSoldierFromWarband(warbandId: string, warbandToSoldierId: string): Promise<Warband>;
    addEquipmentToWarbandVault(warbandId: string, equipment: Equipment, loot: boolean, modifier?: Modifier | null): Promise<Warband>;
    undoEquipmentFromWarbandVault(warbandId: string, equipmentToVaultId: string, sell: boolean): Promise<Warband>;
}
