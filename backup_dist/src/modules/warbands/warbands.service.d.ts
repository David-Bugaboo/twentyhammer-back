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
    findOne(id: string, userId: string): Promise<{
        mercenaries: BaseFigure[];
        legends: BaseFigure[];
        id: string;
        name: string;
        crowns: number;
        wyrdstone: number;
        factionSlug: string;
        userId: string;
        vault?: import("./entities/equipment-to-vault.entity").EquipmentToVault[];
        warbandSoldiers?: import("../soldiers/entities/warband-soldier.entity").WarbandSoldier[];
        faction?: import("./entities/faction.entity").Faction | null;
        user?: import("../../entities/user.entity").User | null;
        createdAt: Date;
    }>;
    update(id: string, updateWarbandDto: UpdateWarbandDto): Promise<Warband>;
    remove(id: string): Promise<void>;
    addSoldierToWarband(warbandId: string, soldierSlug: string): Promise<Warband>;
    addEquipmentToVault(warbandId: string, dto: AddEquipmentToVaultDto, loot: boolean): Promise<Warband>;
    undoEquipmentFromVault(warbandId: string, equipmentToVaultId: string, sell: boolean): Promise<Warband>;
    fireSoldierFromWarband(warbandId: string, warbandToSoldierId: string): Promise<Warband>;
    resolveWarband(id: string): Promise<Warband>;
    validateFigureAddition(warband: Warband, soldier: BaseFigure): Promise<void>;
    findWarbandAvaiableHirings(factionName: string): Promise<BaseFigure[]>;
    createSharedLink(warbandId: string): Promise<import("./entities/sharedLink.entity").SharedLink>;
    updateSharedLink(id: string): Promise<import("./entities/sharedLink.entity").SharedLink>;
    findSharedLinkById(id: string): Promise<import("./entities/sharedLink.entity").SharedLink>;
}
