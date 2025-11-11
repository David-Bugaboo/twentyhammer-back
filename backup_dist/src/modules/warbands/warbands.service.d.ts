import { CreateWarbandDto } from './dto/create-warband.dto';
import { UpdateWarbandDto } from './dto/update-warband.dto';
import { WarbandsRepository } from './repositories/warbands.repositories';
import { QueryDto } from 'src/common/dtos/query.dto';
import { QueriesService } from '../queries/queries.service';
import { BaseFigure } from 'src/entities/base-figure.entity';
import { Warband } from './entities/warband.entity';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';
import { AddEquipmentToVaultDto } from './dto/add-equipment-to-vault.dto';
export declare class WarbandsService {
    private readonly repo;
    private readonly queriesService;
    private readonly bussinessRulesService;
    constructor(repo: WarbandsRepository, queriesService: QueriesService, bussinessRulesService: BussinessRulesService);
    create(createWarbandDto: CreateWarbandDto, userId: string, factionSlug: string): Promise<Warband>;
    findAll(query: QueryDto): Promise<{
        page: number;
        perPage: number;
        totalPages: number;
        warbands: Warband[];
    }>;
    findOne(id: string, userId: string): Promise<Warband>;
    update(id: string, updateWarbandDto: UpdateWarbandDto): Promise<Warband>;
    remove(id: string): Promise<void>;
    addSoldierToWarband(warbandId: string, soldierSlug: string): Promise<Warband>;
    addEquipmentToVault(warbandId: string, dto: AddEquipmentToVaultDto, loot: boolean): Promise<Warband>;
    undoEquipmentFromVault(warbandId: string, equipmentToVaultId: string, sell: boolean): Promise<Warband>;
    fireSoldierFromWarband(warbandId: string, warbandToSoldierId: string): Promise<Warband>;
    resolveWarband(id: string): Promise<Warband>;
    validateFigureAddition(warband: Warband, soldier: BaseFigure): Promise<void>;
}
