import type { Request } from 'express';
import { WarbandsService } from './warbands.service';
import { CreateWarbandDto } from './dto/create-warband.dto';
import { UpdateWarbandDto } from './dto/update-warband.dto';
import { QueryDto } from 'src/common/dtos/query.dto';
import { QueriesService } from '../queries/queries.service';
import { AddEquipmentToVaultDto } from './dto/add-equipment-to-vault.dto';
export declare class WarbandsController {
    private readonly warbandsService;
    private readonly queriesService;
    constructor(warbandsService: WarbandsService, queriesService: QueriesService);
    create(createWarbandDto: CreateWarbandDto, req: Request, factionSlug: string): Promise<import("./entities/warband.entity").Warband>;
    findAll(query: QueryDto): Promise<{
        page: number;
        perPage: number;
        totalPages: number;
        warbands: import("./entities/warband.entity").Warband[];
    }>;
    findOne(id: string, req: Request): Promise<{
        mercenaries: import("../../entities/base-figure.entity").BaseFigure[];
        legends: import("../../entities/base-figure.entity").BaseFigure[];
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
    update(id: string, updateWarbandDto: UpdateWarbandDto): Promise<import("./entities/warband.entity").Warband>;
    remove(id: string): Promise<void>;
    addFigure(id: string, figureSlug: string): Promise<import("./entities/warband.entity").Warband>;
    addEquipmentToVault(id: string, dto: AddEquipmentToVaultDto, loot: string): Promise<import("./entities/warband.entity").Warband>;
    undoEquipmentFromVault(warbandId: string, warbandToVaultItem: string, sell: string): Promise<import("./entities/warband.entity").Warband>;
    fireSoldierFromWarband(warbandId: string, warbandToSoldierId: string): Promise<import("./entities/warband.entity").Warband>;
    shareWarband(id: string): Promise<import("./entities/sharedLink.entity").SharedLink>;
    updateSharedLink(id: string): Promise<import("./entities/sharedLink.entity").SharedLink>;
    findSharedLinkById(id: string): Promise<import("./entities/sharedLink.entity").SharedLink>;
}
