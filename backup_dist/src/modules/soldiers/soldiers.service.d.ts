import { SoldiersRepository } from './repositories/soldiers.repository';
import { WarbandsService } from '../warbands/warbands.service';
import { QueriesService } from '../queries/queries.service';
import { BussinessRulesService } from '../bussiness-rules/bussiness-rules.service';
export declare class SoldiersService {
    private readonly repo;
    private readonly warbandRepo;
    private readonly queriesService;
    private readonly bussinessRulesService;
    constructor(repo: SoldiersRepository, warbandRepo: WarbandsService, queriesService: QueriesService, bussinessRulesService: BussinessRulesService);
    findSoldierById(soldierId: string): Promise<import("./entities/warband-soldier.entity").WarbandSoldier>;
    removeEquipmentFromSoldier(soldierId: string, warbandToSoldierItem: string): Promise<void>;
    addEquipmentToSoldier(soldierId: string, warbandVaultItem: string): Promise<void>;
    removeEquipmetFromSoldier(warbandToSoldierItemId: string): Promise<void>;
    addSpellToSoldier(soldierId: string, spellSlug: string): Promise<void>;
    addSkillToSoldier(soldierId: string, skillSlug: string): Promise<void>;
    removeSpellFromSoldier(warbandSoldierSpellId: string): Promise<void>;
    removeSkillFromSoldier(warbandToSoldierItemId: string): Promise<void>;
    killSoldier(soldierId: string): Promise<void>;
    undoSoldier(soldierId: string): Promise<void>;
    addInjuryToSoldier(soldierId: string, injurySlug: string): Promise<void>;
    removeInjuryFromSoldier(injuryToWarbandSoldierId: string): Promise<void>;
    addAdvancementToSoldier(soldierId: string, advancementSlug: string): Promise<void>;
    removeAdvancementFromSoldier(advancementToWarbandSoldierId: string): Promise<void>;
    addSuperNaturalAbilityToSoldier(soldierId: string, superNaturalAbilitySlug: string): Promise<void>;
    removeSuperNaturalAbilityFromSoldier(superNaturalAbilityToWarbandSoldierId: string): Promise<void>;
    equipItemToSoldier(equipmentToWarbandSoldierId: string, slot: string): Promise<void>;
}
